-- Updated to get created_by from existing admin profiles
-- Seed data for emergency hotlines
-- This creates essential emergency contact numbers

DO $$
DECLARE
  admin_id UUID;
BEGIN
  -- Get the first admin user ID
  SELECT id INTO admin_id FROM public.profiles WHERE role = 'admin' LIMIT 1;
  
  -- Insert hotlines
  -- Fixed type values to match CHECK constraint: 'emergency', 'medical', 'fire', 'police', 'rescue', 'utility', 'government'
  INSERT INTO public.hotlines (agency, type, phone_number, alternate_number, contact_person, description, availability, is_primary, status, created_by, created_at, updated_at) VALUES
  ('MDRRMO Pio Duran', 'emergency', '(052) 483-1234', '+63 917 123 4567', 'Engr. Roberto Martinez', 'Municipal Disaster Risk Reduction and Management Office - Main Hotline', '24/7', true, 'active', admin_id, NOW(), NOW()),
  ('Philippine National Police', 'police', '(052) 483-2345', '911', 'PSInsp. Maria Santos', 'PNP Pio Duran Station - Emergency Response', '24/7', true, 'active', admin_id, NOW(), NOW()),
  ('Bureau of Fire Protection', 'fire', '(052) 483-3456', '(02) 8426-0219', 'SFO3 Juan Dela Cruz', 'BFP Pio Duran Station - Fire Emergency', '24/7', true, 'active', admin_id, NOW(), NOW()),
  ('Municipal Health Office', 'medical', '(052) 483-4567', '+63 918 234 5678', 'Dr. Elena Villanueva', 'Municipal Health Office - Medical Emergencies', '24/7', true, 'active', admin_id, NOW(), NOW()),
  ('Philippine Red Cross', 'medical', '(052) 421-1111', '143', 'Red Cross Albay', 'Red Cross Albay Chapter - Medical Assistance', '24/7', false, 'active', admin_id, NOW(), NOW()),
  ('PAGASA Weather Bureau', 'government', '(02) 8927-1335', '(02) 8927-2877', 'PAGASA Legazpi', 'Weather updates and typhoon warnings', 'Office Hours', false, 'active', admin_id, NOW(), NOW()),
  ('NDRRMC', 'emergency', '(02) 8911-1406', '(02) 8912-2665', 'NDRRMC Operations', 'National Disaster Risk Reduction and Management Council', '24/7', false, 'active', admin_id, NOW(), NOW()),
  ('Coast Guard', 'rescue', '(052) 480-3456', '(02) 8527-8481', 'PCG Albay', 'Philippine Coast Guard - Maritime Emergency', '24/7', false, 'active', admin_id, NOW(), NOW()),
  ('DSWD', 'government', '(052) 820-8888', '(02) 8931-8101', 'DSWD Albay', 'Department of Social Welfare and Development - Disaster Assistance', 'Office Hours', false, 'active', admin_id, NOW(), NOW()),
  ('Municipal Engineering Office', 'utility', '(052) 483-5678', '+63 919 333 4444', 'Engr. Antonio Reyes', 'Infrastructure damage reports and road clearing', 'Office Hours', false, 'active', admin_id, NOW(), NOW());
END $$;

-- Display inserted hotlines
SELECT id, agency, type, phone_number, is_primary, availability, status FROM public.hotlines ORDER BY is_primary DESC, agency;
