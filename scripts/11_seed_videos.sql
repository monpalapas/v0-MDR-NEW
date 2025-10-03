-- Updated to get uploaded_by from existing admin profiles
-- Seed data for educational videos
-- This creates sample video resources

DO $$
DECLARE
  admin_id UUID;
BEGIN
  -- Get the first admin user ID
  SELECT id INTO admin_id FROM public.profiles WHERE role = 'admin' LIMIT 1;
  
  -- Insert videos
  INSERT INTO public.videos (title, description, video_url, thumbnail_url, category, duration, tags, views, status, uploaded_by, created_at, updated_at) VALUES
  ('What to Do During an Earthquake', 'Step-by-step guide on proper actions during an earthquake emergency', '/videos/earthquake-guide.mp4', '/placeholder.svg?height=360&width=640', 'tutorial', '5:32', 'earthquake, safety, tutorial', 1247, 'published', admin_id, NOW() - INTERVAL '60 days', NOW()),
  ('Typhoon Preparedness 101', 'Essential preparations before a typhoon hits your area', '/videos/typhoon-prep.mp4', '/placeholder.svg?height=360&width=640', 'tutorial', '8:15', 'typhoon, preparedness, weather', 892, 'published', admin_id, NOW() - INTERVAL '50 days', NOW()),
  ('Basic First Aid Techniques', 'Learn essential first aid skills for common emergencies', '/videos/first-aid-basics.mp4', '/placeholder.svg?height=360&width=640', 'training', '12:45', 'first aid, medical, training', 1534, 'published', admin_id, NOW() - INTERVAL '40 days', NOW()),
  ('Fire Safety at Home', 'Fire prevention tips and what to do in case of fire', '/videos/fire-safety.mp4', '/placeholder.svg?height=360&width=640', 'tutorial', '6:20', 'fire, safety, prevention', 678, 'published', admin_id, NOW() - INTERVAL '30 days', NOW()),
  ('Flood Safety and Survival', 'How to stay safe during floods and flash floods', '/videos/flood-safety.mp4', '/placeholder.svg?height=360&width=640', 'tutorial', '7:50', 'flood, safety, survival', 945, 'published', admin_id, NOW() - INTERVAL '20 days', NOW()),
  ('Emergency Evacuation Procedures', 'Proper evacuation procedures for different types of disasters', '/videos/evacuation-guide.mp4', '/placeholder.svg?height=360&width=640', 'training', '10:30', 'evacuation, procedures, safety', 1123, 'published', admin_id, NOW() - INTERVAL '10 days', NOW());
END $$;

-- Display inserted videos
SELECT id, title, category, duration, views, status FROM public.videos ORDER BY views DESC;
