-- Updated to get uploaded_by from existing admin profiles
-- Seed data for gallery images
-- This creates sample photos from MDRRMO activities

DO $$
DECLARE
  admin_id UUID;
BEGIN
  -- Get the first admin user ID
  SELECT id INTO admin_id FROM public.profiles WHERE role = 'admin' LIMIT 1;
  
  -- Insert gallery images
  INSERT INTO public.gallery_images (title, description, image_url, category, tags, uploaded_by, created_at, updated_at) VALUES
  ('Earthquake Drill 2024', 'Municipality-wide earthquake drill conducted at all schools and government offices', '/placeholder.svg?height=400&width=600', 'training', 'drill, earthquake, training', admin_id, NOW() - INTERVAL '30 days', NOW() - INTERVAL '30 days'),
  ('Flood Rescue Operations', 'MDRRMO rescue team conducting flood rescue operations in Barangay Basicao', '/placeholder.svg?height=400&width=600', 'operations', 'rescue, flood, operations', admin_id, NOW() - INTERVAL '45 days', NOW() - INTERVAL '45 days'),
  ('First Aid Training Seminar', 'Basic life support and first aid training for barangay health workers', '/placeholder.svg?height=400&width=600', 'training', 'first aid, training, seminar', admin_id, NOW() - INTERVAL '20 days', NOW() - INTERVAL '20 days'),
  ('Relief Distribution', 'Distribution of relief goods to affected families after Typhoon Kristine', '/placeholder.svg?height=400&width=600', 'operations', 'relief, distribution, assistance', admin_id, NOW() - INTERVAL '60 days', NOW() - INTERVAL '60 days'),
  ('Fire Safety Demonstration', 'Fire safety and prevention demonstration by BFP Pio Duran', '/placeholder.svg?height=400&width=600', 'training', 'fire, safety, demonstration', admin_id, NOW() - INTERVAL '15 days', NOW() - INTERVAL '15 days'),
  ('Search and Rescue Training', 'Advanced search and rescue training for emergency responders', '/placeholder.svg?height=400&width=600', 'training', 'search and rescue, training', admin_id, NOW() - INTERVAL '25 days', NOW() - INTERVAL '25 days'),
  ('Community Preparedness Meeting', 'Disaster preparedness orientation for barangay officials', '/placeholder.svg?height=400&width=600', 'events', 'community, preparedness, meeting', admin_id, NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days'),
  ('Equipment Inspection', 'Annual inspection and maintenance of emergency response equipment', '/placeholder.svg?height=400&width=600', 'operations', 'equipment, inspection, maintenance', admin_id, NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days');
END $$;

-- Display inserted gallery images
SELECT id, title, category, tags, created_at FROM public.gallery_images ORDER BY created_at DESC;
