-- Seed alerts table
-- This creates sample alert records

INSERT INTO alerts (title, message, type, priority, status, affected_areas, created_by, expires_at, created_at, updated_at)
VALUES
  ('Typhoon Warning Signal #2', 'Typhoon "Pepito" is expected to make landfall within 24 hours. Residents in low-lying areas are advised to evacuate immediately.', 'weather', 'critical', 'active', ARRAY['Poblacion', 'San Jose', 'Napo', 'Bagumbayan'], '00000000-0000-0000-0000-000000000001', NOW() + INTERVAL '48 hours', NOW() - INTERVAL '2 hours', NOW()),
  ('Flood Advisory', 'Heavy rainfall may cause flooding in low-lying areas. Monitor water levels and be prepared to evacuate if necessary.', 'flood', 'high', 'active', ARRAY['Malobago', 'Casiguran', 'Matnog'], '00000000-0000-0000-0000-000000000001', NOW() + INTERVAL '24 hours', NOW() - INTERVAL '5 hours', NOW()),
  ('Fire Prevention Reminder', 'With the dry season approaching, please be extra cautious with fire hazards. Check electrical wiring and avoid open flames.', 'fire', 'medium', 'active', ARRAY['All Barangays'], '00000000-0000-0000-0000-000000000002', NOW() + INTERVAL '7 days', NOW() - INTERVAL '1 day', NOW()),
  ('Earthquake Drill Announcement', 'Quarterly earthquake drill will be conducted on March 15, 2025 at 10:00 AM. All residents are encouraged to participate.', 'earthquake', 'low', 'scheduled', ARRAY['All Barangays'], '00000000-0000-0000-0000-000000000002', NOW() + INTERVAL '30 days', NOW() - INTERVAL '3 days', NOW())
ON CONFLICT DO NOTHING;
