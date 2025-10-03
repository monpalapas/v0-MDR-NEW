-- ============================================
-- ADVANCED ROW LEVEL SECURITY POLICIES
-- ============================================
-- NOTE: This script must be run AFTER script 003_functions_and_triggers.sql
-- which creates the helper functions: is_admin(), is_moderator_or_admin(), etc.
-- ============================================

-- ============================================
-- PROFILES TABLE - Enhanced RLS
-- ============================================

-- Drop existing policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Anyone can view public profile info" ON profiles;
DROP POLICY IF EXISTS "Users can create their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Only admins can delete profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update any profile" ON profiles;

-- Public can view basic profile info (name, avatar, role)
CREATE POLICY "Anyone can view public profile info" ON profiles
  FOR SELECT USING (true);

-- Users can insert their own profile during signup
CREATE POLICY "Users can create their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Users can update their own profile (except role)
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id 
    AND (
      -- Users cannot change their own role
      role = (SELECT role FROM profiles WHERE id = auth.uid())
      OR public.is_admin() -- Unless they are admin
    )
  );

-- Only admins can delete profiles
CREATE POLICY "Only admins can delete profiles" ON profiles
  FOR DELETE USING (public.is_admin());

-- Admins can update any profile including roles
CREATE POLICY "Admins can update any profile" ON profiles
  FOR UPDATE USING (public.is_admin());

-- ============================================
-- DRRM COUNCIL - Enhanced RLS
-- ============================================

DROP POLICY IF EXISTS "DRRM Council members are viewable by everyone" ON drrm_council;
DROP POLICY IF EXISTS "Only admins can insert DRRM Council members" ON drrm_council;
DROP POLICY IF EXISTS "Only admins can update DRRM Council members" ON drrm_council;
DROP POLICY IF EXISTS "Only admins can delete DRRM Council members" ON drrm_council;
DROP POLICY IF EXISTS "Public can view active council members" ON drrm_council;
DROP POLICY IF EXISTS "Moderators can add council members" ON drrm_council;
DROP POLICY IF EXISTS "Moderators can update council members" ON drrm_council;
DROP POLICY IF EXISTS "Only admins can delete council members" ON drrm_council;

-- Everyone can view active council members
CREATE POLICY "Public can view active council members" ON drrm_council
  FOR SELECT USING (
    status = 'active' 
    OR public.is_moderator_or_admin()
  );

-- Moderators and admins can insert
CREATE POLICY "Moderators can add council members" ON drrm_council
  FOR INSERT WITH CHECK (public.is_moderator_or_admin());

-- Moderators and admins can update
CREATE POLICY "Moderators can update council members" ON drrm_council
  FOR UPDATE USING (public.is_moderator_or_admin());

-- Only admins can delete
CREATE POLICY "Only admins can delete council members" ON drrm_council
  FOR DELETE USING (public.is_admin());

-- ============================================
-- PERSONNEL - Enhanced RLS
-- ============================================

DROP POLICY IF EXISTS "Personnel are viewable by everyone" ON personnel;
DROP POLICY IF EXISTS "Only admins can manage personnel" ON personnel;
DROP POLICY IF EXISTS "Public can view active personnel" ON personnel;
DROP POLICY IF EXISTS "Moderators can add personnel" ON personnel;
DROP POLICY IF EXISTS "Moderators can update personnel" ON personnel;
DROP POLICY IF EXISTS "Only admins can delete personnel" ON personnel;

-- Everyone can view active personnel
CREATE POLICY "Public can view active personnel" ON personnel
  FOR SELECT USING (
    status = 'active' 
    OR public.is_moderator_or_admin()
  );

-- Moderators and admins can manage personnel
CREATE POLICY "Moderators can add personnel" ON personnel
  FOR INSERT WITH CHECK (public.is_moderator_or_admin());

CREATE POLICY "Moderators can update personnel" ON personnel
  FOR UPDATE USING (public.is_moderator_or_admin());

CREATE POLICY "Only admins can delete personnel" ON personnel
  FOR DELETE USING (public.is_admin());

-- ============================================
-- ACTIVITIES - Enhanced RLS
-- ============================================

DROP POLICY IF EXISTS "Activities are viewable by everyone" ON activities;
DROP POLICY IF EXISTS "Only admins can manage activities" ON activities;
DROP POLICY IF EXISTS "Public can view activities" ON activities;
DROP POLICY IF EXISTS "Moderators can create activities" ON activities;
DROP POLICY IF EXISTS "Moderators can update own activities" ON activities;
DROP POLICY IF EXISTS "Only admins can delete activities" ON activities;

-- Everyone can view non-cancelled activities
CREATE POLICY "Public can view activities" ON activities
  FOR SELECT USING (
    status != 'cancelled' 
    OR public.is_moderator_or_admin()
  );

-- Moderators can create activities
CREATE POLICY "Moderators can create activities" ON activities
  FOR INSERT WITH CHECK (
    public.is_moderator_or_admin()
    AND created_by = auth.uid()
  );

-- Moderators can update their own activities, admins can update all
CREATE POLICY "Moderators can update own activities" ON activities
  FOR UPDATE USING (
    public.is_admin() 
    OR (public.is_moderator_or_admin() AND created_by = auth.uid())
  );

-- Only admins can delete activities
CREATE POLICY "Only admins can delete activities" ON activities
  FOR DELETE USING (public.is_admin());

-- ============================================
-- VIDEOS - Enhanced RLS
-- ============================================

DROP POLICY IF EXISTS "Published videos are viewable by everyone" ON videos;
DROP POLICY IF EXISTS "Only admins can manage videos" ON videos;
DROP POLICY IF EXISTS "Public can view published videos" ON videos;
DROP POLICY IF EXISTS "Moderators can upload videos" ON videos;
DROP POLICY IF EXISTS "Moderators can update own videos" ON videos;
DROP POLICY IF EXISTS "Only admins can delete videos" ON videos;

-- Everyone can view published videos
CREATE POLICY "Public can view published videos" ON videos
  FOR SELECT USING (
    status = 'published' 
    OR public.is_moderator_or_admin()
  );

-- Moderators can upload videos
CREATE POLICY "Moderators can upload videos" ON videos
  FOR INSERT WITH CHECK (
    public.is_moderator_or_admin()
    AND uploaded_by = auth.uid()
  );

-- Moderators can update their own videos, admins can update all
CREATE POLICY "Moderators can update own videos" ON videos
  FOR UPDATE USING (
    public.is_admin() 
    OR (public.is_moderator_or_admin() AND uploaded_by = auth.uid())
  );

-- Only admins can delete videos
CREATE POLICY "Only admins can delete videos" ON videos
  FOR DELETE USING (public.is_admin());

-- ============================================
-- GALLERY IMAGES - Enhanced RLS
-- ============================================

DROP POLICY IF EXISTS "Gallery images are viewable by everyone" ON gallery_images;
DROP POLICY IF EXISTS "Only admins can manage gallery images" ON gallery_images;
DROP POLICY IF EXISTS "Public can view all gallery images" ON gallery_images;
DROP POLICY IF EXISTS "Moderators can upload images" ON gallery_images;
DROP POLICY IF EXISTS "Moderators can update own images" ON gallery_images;
DROP POLICY IF EXISTS "Only admins can delete images" ON gallery_images;

-- Everyone can view all gallery images
CREATE POLICY "Public can view all gallery images" ON gallery_images
  FOR SELECT USING (true);

-- Moderators can upload images
CREATE POLICY "Moderators can upload images" ON gallery_images
  FOR INSERT WITH CHECK (
    public.is_moderator_or_admin()
    AND uploaded_by = auth.uid()
  );

-- Moderators can update their own images, admins can update all
CREATE POLICY "Moderators can update own images" ON gallery_images
  FOR UPDATE USING (
    public.is_admin() 
    OR (public.is_moderator_or_admin() AND uploaded_by = auth.uid())
  );

-- Only admins can delete images
CREATE POLICY "Only admins can delete images" ON gallery_images
  FOR DELETE USING (public.is_admin());

-- ============================================
-- PUBLIC MESSAGES - Enhanced RLS
-- ============================================

DROP POLICY IF EXISTS "Anyone can send public messages" ON public_messages;
DROP POLICY IF EXISTS "Only admins can view public messages" ON public_messages;
DROP POLICY IF EXISTS "Only admins can update public messages" ON public_messages;
DROP POLICY IF EXISTS "Moderators can view messages" ON public_messages;
DROP POLICY IF EXISTS "Moderators can update messages" ON public_messages;

-- Anyone can send messages (contact form)
CREATE POLICY "Anyone can send public messages" ON public_messages
  FOR INSERT WITH CHECK (true);

-- Moderators and admins can view messages
CREATE POLICY "Moderators can view messages" ON public_messages
  FOR SELECT USING (public.is_moderator_or_admin());

-- Moderators and admins can update message status
CREATE POLICY "Moderators can update messages" ON public_messages
  FOR UPDATE USING (public.is_moderator_or_admin());

-- Only admins can delete messages
CREATE POLICY "Only admins can delete messages" ON public_messages
  FOR DELETE USING (public.is_admin());

-- ============================================
-- QUICK LINKS - Enhanced RLS
-- ============================================

DROP POLICY IF EXISTS "Active quick links are viewable by everyone" ON quick_links;
DROP POLICY IF EXISTS "Only admins can manage quick links" ON quick_links;
DROP POLICY IF EXISTS "Public can view active quick links" ON quick_links;
DROP POLICY IF EXISTS "Moderators can create quick links" ON quick_links;
DROP POLICY IF EXISTS "Moderators can update own quick links" ON quick_links;
DROP POLICY IF EXISTS "Only admins can delete quick links" ON quick_links;

-- Everyone can view active quick links
CREATE POLICY "Public can view active quick links" ON quick_links
  FOR SELECT USING (
    status = 'active' 
    OR public.is_moderator_or_admin()
  );

-- Moderators can create quick links
CREATE POLICY "Moderators can create quick links" ON quick_links
  FOR INSERT WITH CHECK (
    public.is_moderator_or_admin()
    AND created_by = auth.uid()
  );

-- Moderators can update their own quick links, admins can update all
CREATE POLICY "Moderators can update own quick links" ON quick_links
  FOR UPDATE USING (
    public.is_admin() 
    OR (public.is_moderator_or_admin() AND created_by = auth.uid())
  );

-- Only admins can delete quick links
CREATE POLICY "Only admins can delete quick links" ON quick_links
  FOR DELETE USING (public.is_admin());

-- ============================================
-- ALERTS - Enhanced RLS with Priority
-- ============================================

DROP POLICY IF EXISTS "Active alerts are viewable by everyone" ON alerts;
DROP POLICY IF EXISTS "Only admins can manage alerts" ON alerts;
DROP POLICY IF EXISTS "Public can view active alerts" ON alerts;
DROP POLICY IF EXISTS "Moderators can create alerts" ON alerts;
DROP POLICY IF EXISTS "Moderators can update own alerts" ON alerts;
DROP POLICY IF EXISTS "Only admins can delete alerts" ON alerts;

-- Everyone can view active alerts
CREATE POLICY "Public can view active alerts" ON alerts
  FOR SELECT USING (
    (status = 'active' AND (expires_at IS NULL OR expires_at > NOW()))
    OR public.is_moderator_or_admin()
  );

-- Moderators can create alerts
CREATE POLICY "Moderators can create alerts" ON alerts
  FOR INSERT WITH CHECK (
    public.is_moderator_or_admin()
    AND created_by = auth.uid()
  );

-- Moderators can update their own alerts, admins can update all
CREATE POLICY "Moderators can update own alerts" ON alerts
  FOR UPDATE USING (
    public.is_admin() 
    OR (public.is_moderator_or_admin() AND created_by = auth.uid())
  );

-- Only admins can delete alerts
CREATE POLICY "Only admins can delete alerts" ON alerts
  FOR DELETE USING (public.is_admin());

-- ============================================
-- HOTLINES - Enhanced RLS
-- ============================================

DROP POLICY IF EXISTS "Active hotlines are viewable by everyone" ON hotlines;
DROP POLICY IF EXISTS "Only admins can manage hotlines" ON hotlines;
DROP POLICY IF EXISTS "Public can view active hotlines" ON hotlines;
DROP POLICY IF EXISTS "Moderators can create hotlines" ON hotlines;
DROP POLICY IF EXISTS "Moderators can update own hotlines" ON hotlines;
DROP POLICY IF EXISTS "Only admins can delete hotlines" ON hotlines;

-- Everyone can view active hotlines
CREATE POLICY "Public can view active hotlines" ON hotlines
  FOR SELECT USING (
    status = 'active' 
    OR public.is_moderator_or_admin()
  );

-- Moderators can create hotlines
CREATE POLICY "Moderators can create hotlines" ON hotlines
  FOR INSERT WITH CHECK (
    public.is_moderator_or_admin()
    AND created_by = auth.uid()
  );

-- Moderators can update their own hotlines, admins can update all
CREATE POLICY "Moderators can update own hotlines" ON hotlines
  FOR UPDATE USING (
    public.is_admin() 
    OR (public.is_moderator_or_admin() AND created_by = auth.uid())
  );

-- Only admins can delete hotlines
CREATE POLICY "Only admins can delete hotlines" ON hotlines
  FOR DELETE USING (public.is_admin());

-- ============================================
-- BARANGAYS - Enhanced RLS
-- ============================================

DROP POLICY IF EXISTS "Barangays are viewable by everyone" ON barangays;
DROP POLICY IF EXISTS "Only admins can manage barangays" ON barangays;
DROP POLICY IF EXISTS "Public can view all barangays" ON barangays;
DROP POLICY IF EXISTS "Moderators can create barangays" ON barangays;
DROP POLICY IF EXISTS "Moderators can update barangays" ON barangays;
DROP POLICY IF EXISTS "Only admins can delete barangays" ON barangays;

-- Everyone can view all barangays
CREATE POLICY "Public can view all barangays" ON barangays
  FOR SELECT USING (true);

-- Moderators can create barangays
CREATE POLICY "Moderators can create barangays" ON barangays
  FOR INSERT WITH CHECK (public.is_moderator_or_admin());

-- Moderators can update barangays
CREATE POLICY "Moderators can update barangays" ON barangays
  FOR UPDATE USING (public.is_moderator_or_admin());

-- Only admins can delete barangays
CREATE POLICY "Only admins can delete barangays" ON barangays
  FOR DELETE USING (public.is_admin());

-- ============================================
-- RESOURCES - Enhanced RLS with Categories
-- ============================================

DROP POLICY IF EXISTS "Active resources are viewable by everyone" ON resources;
DROP POLICY IF EXISTS "Only admins can manage resources" ON resources;
DROP POLICY IF EXISTS "Public can view active resources" ON resources;
DROP POLICY IF EXISTS "Moderators can upload resources" ON resources;
DROP POLICY IF EXISTS "Moderators can update own resources" ON resources;
DROP POLICY IF EXISTS "Only admins can delete resources" ON resources;

-- Everyone can view active resources
CREATE POLICY "Public can view active resources" ON resources
  FOR SELECT USING (
    status = 'active' 
    OR public.is_moderator_or_admin()
  );

-- Moderators can upload resources
CREATE POLICY "Moderators can upload resources" ON resources
  FOR INSERT WITH CHECK (
    public.is_moderator_or_admin()
    AND uploaded_by = auth.uid()
  );

-- Moderators can update their own resources, admins can update all
CREATE POLICY "Moderators can update own resources" ON resources
  FOR UPDATE USING (
    public.is_admin() 
    OR (public.is_moderator_or_admin() AND uploaded_by = auth.uid())
  );

-- Only admins can delete resources
CREATE POLICY "Only admins can delete resources" ON resources
  FOR DELETE USING (public.is_admin());

-- ============================================
-- MAPS - Enhanced RLS with Status
-- ============================================

DROP POLICY IF EXISTS "Published maps are viewable by everyone" ON maps;
DROP POLICY IF EXISTS "Only admins can manage maps" ON maps;
DROP POLICY IF EXISTS "Public can view published maps" ON maps;
DROP POLICY IF EXISTS "Moderators can upload maps" ON maps;
DROP POLICY IF EXISTS "Moderators can update own maps" ON maps;
DROP POLICY IF EXISTS "Only admins can delete maps" ON maps;

-- Everyone can view published maps
CREATE POLICY "Public can view published maps" ON maps
  FOR SELECT USING (
    status = 'published' 
    OR public.is_moderator_or_admin()
  );

-- Moderators can upload maps
CREATE POLICY "Moderators can upload maps" ON maps
  FOR INSERT WITH CHECK (
    public.is_moderator_or_admin()
    AND uploaded_by = auth.uid()
  );

-- Moderators can update their own maps, admins can update all
CREATE POLICY "Moderators can update own maps" ON maps
  FOR UPDATE USING (
    public.is_admin() 
    OR (public.is_moderator_or_admin() AND uploaded_by = auth.uid())
  );

-- Only admins can delete maps
CREATE POLICY "Only admins can delete maps" ON maps
  FOR DELETE USING (public.is_admin());

-- ============================================
-- PERFORMANCE INDEXES
-- ============================================

-- Create indexes for commonly queried columns
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

CREATE INDEX IF NOT EXISTS idx_activities_status ON activities(status);
CREATE INDEX IF NOT EXISTS idx_activities_date ON activities(date);
CREATE INDEX IF NOT EXISTS idx_activities_created_by ON activities(created_by);

CREATE INDEX IF NOT EXISTS idx_alerts_status ON alerts(status);
CREATE INDEX IF NOT EXISTS idx_alerts_severity ON alerts(severity);
CREATE INDEX IF NOT EXISTS idx_alerts_expires_at ON alerts(expires_at);
CREATE INDEX IF NOT EXISTS idx_alerts_created_by ON alerts(created_by);

CREATE INDEX IF NOT EXISTS idx_resources_status ON resources(status);
CREATE INDEX IF NOT EXISTS idx_resources_category ON resources(category);
CREATE INDEX IF NOT EXISTS idx_resources_uploaded_by ON resources(uploaded_by);

CREATE INDEX IF NOT EXISTS idx_maps_status ON maps(status);
CREATE INDEX IF NOT EXISTS idx_maps_uploaded_by ON maps(uploaded_by);

CREATE INDEX IF NOT EXISTS idx_videos_status ON videos(status);
CREATE INDEX IF NOT EXISTS idx_videos_uploaded_by ON videos(uploaded_by);

CREATE INDEX IF NOT EXISTS idx_gallery_images_uploaded_by ON gallery_images(uploaded_by);

CREATE INDEX IF NOT EXISTS idx_public_messages_status ON public_messages(status);
CREATE INDEX IF NOT EXISTS idx_public_messages_priority ON public_messages(priority);

CREATE INDEX IF NOT EXISTS idx_quick_links_status ON quick_links(status);
CREATE INDEX IF NOT EXISTS idx_quick_links_created_by ON quick_links(created_by);

CREATE INDEX IF NOT EXISTS idx_hotlines_status ON hotlines(status);
CREATE INDEX IF NOT EXISTS idx_hotlines_created_by ON hotlines(created_by);

-- ============================================
-- FULL-TEXT SEARCH INDEXES
-- ============================================

-- Create GIN indexes for full-text search
CREATE INDEX IF NOT EXISTS idx_activities_search ON activities USING GIN (to_tsvector('english', title || ' ' || COALESCE(description, '')));
CREATE INDEX IF NOT EXISTS idx_resources_search ON resources USING GIN (to_tsvector('english', title || ' ' || COALESCE(description, '')));
CREATE INDEX IF NOT EXISTS idx_personnel_search ON personnel USING GIN (to_tsvector('english', name || ' ' || COALESCE(position, '')));

-- ============================================
-- GRANT PERMISSIONS
-- ============================================

-- Grant usage on sequences
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Grant select on all tables to anon (public read access)
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;

-- Grant full access to authenticated users (controlled by RLS)
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
