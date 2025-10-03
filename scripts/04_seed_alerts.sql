-- Updated to get created_by from existing admin profiles
-- Seed data for alerts
-- This creates sample emergency alerts

DO $$
DECLARE
  admin_id UUID;
BEGIN
  -- Get the first admin user ID
  SELECT id INTO admin_id FROM public.profiles WHERE role = 'admin' LIMIT 1;
  
  -- Updated type values to match CHECK constraint: only 'emergency', 'warning', or 'info' are allowed
  INSERT INTO public.alerts (title, type, priority, message, status, affected_areas, created_by, expires_at, created_at, updated_at) VALUES
  ('Typhoon Warning Signal #2', 'emergency', 'high', 'Typhoon "Kristine" is expected to affect the area within 24 hours. Residents in low-lying areas are advised to prepare for possible evacuation.', 'active', ARRAY['Basicao Coastal', 'Malobago', 'Napo'], admin_id, NOW() + INTERVAL '48 hours', NOW(), NOW()),
  ('Flood Advisory', 'warning', 'medium', 'Heavy rainfall may cause flooding in low-lying areas. Monitor water levels and be ready to evacuate if necessary.', 'active', ARRAY['Bagumbayan', 'Poblacion', 'San Jose'], admin_id, NOW() + INTERVAL '24 hours', NOW(), NOW()),
  ('Community Assembly', 'info', 'low', 'Disaster preparedness seminar will be held at the Municipal Hall on Saturday, 9:00 AM. All barangay officials are encouraged to attend.', 'active', ARRAY['All Barangays'], admin_id, NOW() + INTERVAL '72 hours', NOW(), NOW()),
  ('Earthquake Drill Reminder', 'info', 'medium', 'Quarterly earthquake drill scheduled for next week. All schools and offices must participate. Detailed schedule to follow.', 'active', ARRAY['All Barangays'], admin_id, NOW() + INTERVAL '168 hours', NOW(), NOW());
END $$;

-- Display inserted alerts
SELECT id, title, type, priority, status, affected_areas FROM public.alerts ORDER BY priority DESC, created_at DESC;
