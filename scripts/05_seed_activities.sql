-- Updated to get created_by from existing admin profiles
-- Seed data for activities
-- This creates sample training events and activities

DO $$
DECLARE
  admin_id UUID;
BEGIN
  -- Get the first admin user ID
  SELECT id INTO admin_id FROM public.profiles WHERE role = 'admin' LIMIT 1;
  
  -- Insert activities
  -- Fixed status values to match CHECK constraint: 'planned', 'ongoing', 'completed', 'cancelled'
  -- Fixed category values to match CHECK constraint: 'training', 'drill', 'meeting', 'community', 'emergency'
  INSERT INTO public.activities (title, description, category, date, time, venue, organizer, max_participants, current_participants, status, created_by, created_at, updated_at) VALUES
  ('Basic Life Support Training', 'Learn essential life-saving techniques including CPR, first aid, and emergency response procedures.', 'training', CURRENT_DATE + 7, '09:00:00', 'MDRRMO Training Center', 'MDRRMO Health Services', 50, 32, 'planned', admin_id, NOW(), NOW()),
  ('Earthquake Preparedness Drill', 'Municipality-wide earthquake drill to test emergency response protocols and evacuation procedures.', 'drill', CURRENT_DATE + 14, '10:00:00', 'All Barangays', 'MDRRMO Operations', 1000, 0, 'planned', admin_id, NOW(), NOW()),
  ('Fire Safety Seminar', 'Fire prevention and safety awareness seminar for barangay officials and community leaders.', 'meeting', CURRENT_DATE + 21, '13:00:00', 'Municipal Hall Conference Room', 'Bureau of Fire Protection', 80, 45, 'planned', admin_id, NOW(), NOW()),
  ('Search and Rescue Workshop', 'Advanced search and rescue techniques for emergency responders and volunteers.', 'training', CURRENT_DATE + 28, '08:00:00', 'MDRRMO Training Grounds', 'MDRRMO Rescue Team', 30, 28, 'planned', admin_id, NOW(), NOW()),
  ('Community Disaster Preparedness', 'Community-based disaster risk reduction and management orientation for residents.', 'community', CURRENT_DATE - 7, '14:00:00', 'Barangay Poblacion Hall', 'MDRRMO Community Affairs', 100, 87, 'completed', admin_id, NOW(), NOW()),
  ('Flood Response Training', 'Specialized training on flood rescue operations and water safety for rescue personnel.', 'training', CURRENT_DATE - 14, '09:00:00', 'MDRRMO Training Center', 'MDRRMO Rescue Team', 25, 25, 'completed', admin_id, NOW(), NOW()),
  ('Medical Emergency Response', 'Emergency medical response training for first responders and barangay health workers.', 'training', CURRENT_DATE - 21, '10:00:00', 'Municipal Health Office', 'Municipal Health Office', 40, 38, 'completed', admin_id, NOW(), NOW());
END $$;

-- Display inserted activities
SELECT id, title, category, date, status, current_participants, max_participants FROM public.activities ORDER BY date DESC;
