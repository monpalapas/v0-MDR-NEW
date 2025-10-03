-- Seed hotlines table
-- This creates sample emergency hotline records

INSERT INTO hotlines (agency, description, phone_number, alternate_number, contact_person, type, availability, is_primary, status, created_by, created_at, updated_at)
VALUES
  ('MDRRMO Pio Duran', 'Municipal Disaster Risk Reduction and Management Office - Emergency Operations Center', '(052) 483-1234', '+639171234567', 'Dr. Roberto Martinez', 'emergency', '24/7', true, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW()),
  ('Philippine National Police', 'Pio Duran Police Station - Emergency Response', '(052) 483-2345', '+639181234567', 'Chief Insp. Fernando Cruz', 'emergency', '24/7', true, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW()),
  ('Bureau of Fire Protection', 'Pio Duran Fire Station - Fire Emergency', '(052) 483-3456', '+639191234567', 'SFO3 Gabriel Santos', 'emergency', '24/7', true, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW()),
  ('Rural Health Unit', 'Pio Duran Rural Health Unit - Medical Emergency', '(052) 483-4567', '+639201234567', 'Dr. Carmen Lopez', 'medical', '24/7', true, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW()),
  ('Philippine Red Cross', 'Albay Chapter - Disaster Response', '(052) 820-1234', '+639211234567', 'Ms. Patricia Mendoza', 'emergency', '24/7', false, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW()),
  ('PAGASA Legazpi', 'Weather Monitoring and Forecast', '(052) 480-1234', '+639221234567', 'Weather Officer', 'information', 'Office Hours', false, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW()),
  ('PHIVOLCS Legazpi', 'Volcano and Earthquake Monitoring', '(052) 480-2345', '+639231234567', 'Science Officer', 'information', 'Office Hours', false, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW()),
  ('Municipal Social Welfare Office', 'Social Services and Assistance', '(052) 483-5678', '+639241234567', 'Ms. Patricia Mendoza', 'support', 'Office Hours', false, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW()),
  ('Coast Guard Station', 'Maritime Emergency and Rescue', '(052) 480-3456', '+639251234567', 'Station Commander', 'emergency', '24/7', false, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW()),
  ('NDRRMC Hotline', 'National Disaster Risk Reduction and Management Council', '(02) 8911-1406', '+639171234568', 'Operations Center', 'emergency', '24/7', false, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW())
ON CONFLICT DO NOTHING;
