-- Seed quick_links table
-- This creates sample quick link records for the homepage

INSERT INTO quick_links (title, description, url, icon, category, order_index, status, created_by, created_at, updated_at)
VALUES
  ('Report Emergency', 'Report an emergency incident or disaster', '/report-incident', 'alert-triangle', 'emergency', 1, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW()),
  ('Weather Updates', 'Latest weather forecasts and warnings', '/weather', 'cloud-rain', 'information', 2, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW()),
  ('Evacuation Centers', 'Find nearest evacuation centers', '/evacuation-centers', 'map-pin', 'emergency', 3, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW()),
  ('Emergency Hotlines', 'Important emergency contact numbers', '/hotlines', 'phone', 'emergency', 4, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW()),
  ('Disaster Preparedness', 'Learn how to prepare for disasters', '/preparedness', 'shield', 'information', 5, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW()),
  ('Training Programs', 'View upcoming training and drills', '/activities', 'calendar', 'services', 6, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW())
ON CONFLICT DO NOTHING;
