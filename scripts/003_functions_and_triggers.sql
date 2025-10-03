-- ============================================
-- AUTOMATIC PROFILE CREATION
-- ============================================

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
EXCEPTION
  WHEN unique_violation THEN
    -- Profile already exists, skip
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- HELPER FUNCTIONS FOR RLS
-- ============================================

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Function to check if user is moderator or admin
CREATE OR REPLACE FUNCTION public.is_moderator_or_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('admin', 'moderator')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS TEXT AS $$
BEGIN
  RETURN (
    SELECT role FROM public.profiles
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- ============================================
-- AUTOMATIC ALERT EXPIRATION
-- ============================================

-- Function to automatically expire alerts
CREATE OR REPLACE FUNCTION public.expire_old_alerts()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.expires_at IS NOT NULL AND NEW.expires_at < NOW() THEN
    NEW.status = 'expired';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS check_alert_expiration ON public.alerts;
CREATE TRIGGER check_alert_expiration
  BEFORE INSERT OR UPDATE ON public.alerts
  FOR EACH ROW EXECUTE FUNCTION public.expire_old_alerts();

-- ============================================
-- RESOURCE DOWNLOAD COUNTER
-- ============================================

-- Function to increment download count
CREATE OR REPLACE FUNCTION public.increment_download_count(resource_id INTEGER)
RETURNS VOID AS $$
BEGIN
  UPDATE public.resources
  SET download_count = download_count + 1
  WHERE id = resource_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- ACTIVITY PARTICIPANT MANAGEMENT
-- ============================================

-- Function to update participant count
CREATE OR REPLACE FUNCTION public.update_activity_participants()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.activities
    SET current_participants = current_participants + 1
    WHERE id = NEW.activity_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.activities
    SET current_participants = GREATEST(0, current_participants - 1)
    WHERE id = OLD.activity_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- AUDIT LOGGING SYSTEM
-- ============================================

-- Create audit logs table if not exists
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id SERIAL PRIMARY KEY,
  table_name TEXT NOT NULL,
  record_id TEXT NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('insert', 'update', 'delete')),
  old_data JSONB,
  new_data JSONB,
  performed_by UUID REFERENCES profiles(id),
  performed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on audit logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Only admins can view audit logs" ON public.audit_logs
  FOR SELECT USING (public.is_admin());

-- Create index for audit logs
CREATE INDEX IF NOT EXISTS audit_logs_table_name_idx ON public.audit_logs(table_name);
CREATE INDEX IF NOT EXISTS audit_logs_performed_by_idx ON public.audit_logs(performed_by);
CREATE INDEX IF NOT EXISTS audit_logs_performed_at_idx ON public.audit_logs(performed_at);

-- Generic audit logging function
CREATE OR REPLACE FUNCTION public.audit_log()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'DELETE') THEN
    INSERT INTO public.audit_logs (table_name, record_id, action, old_data, performed_by)
    VALUES (TG_TABLE_NAME, OLD.id::TEXT, 'delete', row_to_json(OLD)::JSONB, auth.uid());
    RETURN OLD;
  ELSIF (TG_OP = 'UPDATE') THEN
    INSERT INTO public.audit_logs (table_name, record_id, action, old_data, new_data, performed_by)
    VALUES (TG_TABLE_NAME, NEW.id::TEXT, 'update', row_to_json(OLD)::JSONB, row_to_json(NEW)::JSONB, auth.uid());
    RETURN NEW;
  ELSIF (TG_OP = 'INSERT') THEN
    INSERT INTO public.audit_logs (table_name, record_id, action, new_data, performed_by)
    VALUES (TG_TABLE_NAME, NEW.id::TEXT, 'insert', row_to_json(NEW)::JSONB, auth.uid());
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply audit logging to critical tables
DROP TRIGGER IF EXISTS audit_profiles ON public.profiles;
CREATE TRIGGER audit_profiles
  AFTER INSERT OR UPDATE OR DELETE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.audit_log();

DROP TRIGGER IF EXISTS audit_drrm_council ON public.drrm_council;
CREATE TRIGGER audit_drrm_council
  AFTER INSERT OR UPDATE OR DELETE ON public.drrm_council
  FOR EACH ROW EXECUTE FUNCTION public.audit_log();

DROP TRIGGER IF EXISTS audit_personnel ON public.personnel;
CREATE TRIGGER audit_personnel
  AFTER INSERT OR UPDATE OR DELETE ON public.personnel
  FOR EACH ROW EXECUTE FUNCTION public.audit_log();

DROP TRIGGER IF EXISTS audit_activities ON public.activities;
CREATE TRIGGER audit_activities
  AFTER INSERT OR UPDATE OR DELETE ON public.activities
  FOR EACH ROW EXECUTE FUNCTION public.audit_log();

DROP TRIGGER IF EXISTS audit_alerts ON public.alerts;
CREATE TRIGGER audit_alerts
  AFTER INSERT OR UPDATE OR DELETE ON public.alerts
  FOR EACH ROW EXECUTE FUNCTION public.audit_log();

DROP TRIGGER IF EXISTS audit_resources ON public.resources;
CREATE TRIGGER audit_resources
  AFTER INSERT OR UPDATE OR DELETE ON public.resources
  FOR EACH ROW EXECUTE FUNCTION public.audit_log();

DROP TRIGGER IF EXISTS audit_maps ON public.maps;
CREATE TRIGGER audit_maps
  AFTER INSERT OR UPDATE OR DELETE ON public.maps
  FOR EACH ROW EXECUTE FUNCTION public.audit_log();

-- ============================================
-- TIMESTAMP MANAGEMENT
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- DATA VALIDATION FUNCTIONS
-- ============================================

-- Function to validate email format
CREATE OR REPLACE FUNCTION public.is_valid_email(email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to validate phone number format
CREATE OR REPLACE FUNCTION public.is_valid_phone(phone TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN phone ~* '^\+?[0-9]{10,15}$';
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- ============================================
-- NOTIFICATION SYSTEM
-- ============================================

-- Create notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info' CHECK (type IN ('info', 'warning', 'success', 'error')),
  read BOOLEAN DEFAULT FALSE,
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Users can only see their own notifications
CREATE POLICY "Users can view their own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

-- Users can update their own notifications (mark as read)
CREATE POLICY "Users can update their own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Only admins can create notifications
CREATE POLICY "Admins can create notifications" ON public.notifications
  FOR INSERT WITH CHECK (public.is_admin());

-- Create index for notifications
CREATE INDEX IF NOT EXISTS notifications_user_id_idx ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS notifications_read_idx ON public.notifications(read);
CREATE INDEX IF NOT EXISTS notifications_created_at_idx ON public.notifications(created_at);

-- Function to create notification
CREATE OR REPLACE FUNCTION public.create_notification(
  p_user_id UUID,
  p_title TEXT,
  p_message TEXT,
  p_type TEXT DEFAULT 'info',
  p_link TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.notifications (user_id, title, message, type, link)
  VALUES (p_user_id, p_title, p_message, p_type, p_link);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to notify all admins
CREATE OR REPLACE FUNCTION public.notify_admins(
  p_title TEXT,
  p_message TEXT,
  p_type TEXT DEFAULT 'info',
  p_link TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.notifications (user_id, title, message, type, link)
  SELECT id, p_title, p_message, p_type, p_link
  FROM public.profiles
  WHERE role = 'admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- SEARCH FUNCTIONS
-- ============================================

-- Function to search resources
CREATE OR REPLACE FUNCTION public.search_resources(search_query TEXT)
RETURNS SETOF public.resources AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM public.resources
  WHERE status = 'active'
    AND (
      title ILIKE '%' || search_query || '%'
      OR description ILIKE '%' || search_query || '%'
      OR search_query = ANY(tags)
    )
  ORDER BY created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Function to search activities
CREATE OR REPLACE FUNCTION public.search_activities(search_query TEXT)
RETURNS SETOF public.activities AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM public.activities
  WHERE title ILIKE '%' || search_query || '%'
    OR description ILIKE '%' || search_query || '%'
    OR venue ILIKE '%' || search_query || '%'
  ORDER BY date DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;
