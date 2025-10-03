-- Seed gallery_images table
-- This creates sample gallery image records

INSERT INTO gallery_images (title, description, image_url, category, tags, uploaded_by, created_at, updated_at)
VALUES
  ('Emergency Response Training 2025', 'MDRRMO personnel conducting emergency response training at the municipal training center', 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800', 'training', 'training, emergency response, 2025', '00000000-0000-0000-0000-000000000001', NOW() - INTERVAL '10 days', NOW()),
  ('Flood Rescue Operations', 'Rescue team conducting flood rescue operations in Barangay San Jose', 'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800', 'operations', 'flood, rescue, operations', '00000000-0000-0000-0000-000000000001', NOW() - INTERVAL '15 days', NOW()),
  ('Fire Safety Seminar', 'Community members attending fire safety seminar at the municipal hall', 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800', 'events', 'fire safety, seminar, community', '00000000-0000-0000-0000-000000000002', NOW() - INTERVAL '20 days', NOW()),
  ('Medical Response Team', 'MDRRMO medical response team providing first aid during a community event', 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800', 'operations', 'medical, first aid, response team', '00000000-0000-0000-0000-000000000001', NOW() - INTERVAL '25 days', NOW()),
  ('Earthquake Drill 2024', 'Municipality-wide earthquake drill with participation from all barangays', 'https://images.unsplash.com/photo-1534237710431-e2fc698436d0?w=800', 'drills', 'earthquake, drill, 2024', '00000000-0000-0000-0000-000000000002', NOW() - INTERVAL '30 days', NOW()),
  ('Equipment Inspection', 'Regular inspection and maintenance of emergency response equipment', 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800', 'equipment', 'equipment, inspection, maintenance', '00000000-0000-0000-0000-000000000001', NOW() - INTERVAL '35 days', NOW()),
  ('Community Outreach Program', 'MDRRMO conducting disaster awareness campaign in rural barangays', 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800', 'outreach', 'outreach, awareness, community', '00000000-0000-0000-0000-000000000002', NOW() - INTERVAL '40 days', NOW()),
  ('Search and Rescue Training', 'Advanced search and rescue training for emergency response team', 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800', 'training', 'search and rescue, training, advanced', '00000000-0000-0000-0000-000000000001', NOW() - INTERVAL '45 days', NOW())
ON CONFLICT DO NOTHING;
