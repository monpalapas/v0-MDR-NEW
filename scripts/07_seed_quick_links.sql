-- Updated to get created_by from existing admin profiles
-- Seed data for quick links on homepage
-- This creates quick access links for common actions

DO $$
DECLARE
  admin_id UUID;
BEGIN
  -- Get the first admin user ID
  SELECT id INTO admin_id FROM public.profiles WHERE role = 'admin' LIMIT 1;
  
  -- Insert quick links
  -- Fixed category values to match CHECK constraint: 'general', 'emergency', 'services', 'resources', 'external'
  INSERT INTO public.quick_links (title, description, url, icon, category, order_index, status, created_by, created_at, updated_at) VALUES
  ('Report Emergency', 'Report disasters, accidents, or emergencies in your area', '/report', 'AlertTriangle', 'emergency', 1, 'active', admin_id, NOW(), NOW()),
  ('Weather Updates', 'Get real-time weather forecasts and typhoon warnings', '/weather', 'Cloud', 'resources', 2, 'active', admin_id, NOW(), NOW()),
  ('Evacuation Centers', 'Find nearest evacuation centers and their current capacity', '/evacuation-centers', 'MapPin', 'emergency', 3, 'active', admin_id, NOW(), NOW()),
  ('Emergency Hotlines', 'Access emergency contact numbers and hotlines', '/hotlines', 'Phone', 'emergency', 4, 'active', admin_id, NOW(), NOW()),
  ('Safety Tips', 'Learn disaster preparedness and safety guidelines', '/resources/safety-tips', 'BookOpen', 'resources', 5, 'active', admin_id, NOW(), NOW()),
  ('Training Programs', 'View and register for disaster preparedness training', '/activities', 'GraduationCap', 'services', 6, 'active', admin_id, NOW(), NOW());
END $$;

-- Display inserted quick links
SELECT id, title, category, url, order_index, status FROM public.quick_links ORDER BY order_index;
