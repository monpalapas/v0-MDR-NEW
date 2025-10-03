-- Seed activities table
-- This creates sample activity/event records

INSERT INTO activities (title, description, category, date, time, venue, organizer, max_participants, current_participants, status, created_by, created_at, updated_at)
VALUES
  ('Basic Life Support Training', 'Comprehensive training on CPR, first aid, and emergency response procedures for community volunteers.', 'training', '2025-03-15', '09:00:00', 'MDRRMO Training Center', 'MDRRMO Training Division', 50, 32, 'upcoming', '00000000-0000-0000-0000-000000000001', NOW(), NOW()),
  ('Earthquake Preparedness Drill', 'Municipality-wide earthquake drill to test emergency response protocols and evacuation procedures.', 'drill', '2025-03-20', '10:00:00', 'All Barangays', 'MDRRMO Operations', 1000, 0, 'scheduled', '00000000-0000-0000-0000-000000000001', NOW(), NOW()),
  ('Fire Safety Seminar', 'Educational seminar on fire prevention, safety measures, and proper use of fire extinguishers.', 'seminar', '2025-03-25', '14:00:00', 'Municipal Hall Conference Room', 'Bureau of Fire Protection', 100, 45, 'upcoming', '00000000-0000-0000-0000-000000000002', NOW(), NOW()),
  ('Flood Response Training', 'Specialized training for rescue teams on flood response, water rescue techniques, and evacuation procedures.', 'training', '2025-04-05', '08:00:00', 'MDRRMO Headquarters', 'MDRRMO Emergency Response', 30, 28, 'upcoming', '00000000-0000-0000-0000-000000000001', NOW(), NOW()),
  ('Community Disaster Awareness Campaign', 'Information campaign to educate residents about disaster preparedness and risk reduction.', 'campaign', '2025-04-10', '13:00:00', 'Poblacion Public Plaza', 'MDRRMO Public Affairs', 500, 0, 'scheduled', '00000000-0000-0000-0000-000000000002', NOW(), NOW()),
  ('Search and Rescue Workshop', 'Advanced workshop on search and rescue operations, including use of specialized equipment.', 'workshop', '2025-02-28', '09:00:00', 'MDRRMO Training Facility', 'MDRRMO Operations', 25, 25, 'completed', '00000000-0000-0000-0000-000000000001', NOW() - INTERVAL '5 days', NOW()),
  ('Medical Emergency Response Training', 'Training for first responders on handling medical emergencies and trauma care.', 'training', '2025-02-20', '08:30:00', 'Rural Health Unit', 'Municipal Health Office', 40, 38, 'completed', '00000000-0000-0000-0000-000000000002', NOW() - INTERVAL '13 days', NOW())
ON CONFLICT DO NOTHING;
