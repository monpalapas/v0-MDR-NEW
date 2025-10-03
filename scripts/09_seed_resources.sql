-- Updated to get uploaded_by from existing admin profiles
-- Seed data for downloadable resources
-- This creates sample documents and guides

DO $$
DECLARE
  admin_id UUID;
BEGIN
  -- Get the first admin user ID
  SELECT id INTO admin_id FROM public.profiles WHERE role = 'admin' LIMIT 1;
  
  -- Insert resources
  INSERT INTO public.resources (title, description, category, file_name, file_type, file_size, file_url, tags, download_count, status, uploaded_by, created_at, updated_at) VALUES
  ('Disaster Preparedness Guide', 'Comprehensive guide on disaster preparedness for families and communities', 'guide', 'disaster-preparedness-guide.pdf', 'PDF', '2.5 MB', '/files/disaster-preparedness-guide.pdf', ARRAY['preparedness', 'guide', 'family'], 145, 'active', admin_id, NOW(), NOW()),
  ('Evacuation Procedures Manual', 'Step-by-step procedures for safe evacuation during emergencies', 'manual', 'evacuation-procedures.pdf', 'PDF', '1.8 MB', '/files/evacuation-procedures.pdf', ARRAY['evacuation', 'procedures', 'safety'], 98, 'active', admin_id, NOW(), NOW()),
  ('First Aid Quick Reference', 'Quick reference guide for basic first aid and emergency medical response', 'guide', 'first-aid-reference.pdf', 'PDF', '1.2 MB', '/files/first-aid-reference.pdf', ARRAY['first aid', 'medical', 'emergency'], 203, 'active', admin_id, NOW(), NOW()),
  ('Typhoon Safety Tips', 'Essential safety tips and preparations before, during, and after a typhoon', 'guide', 'typhoon-safety-tips.pdf', 'PDF', '950 KB', '/files/typhoon-safety-tips.pdf', ARRAY['typhoon', 'weather', 'safety'], 167, 'active', admin_id, NOW(), NOW()),
  ('Earthquake Response Protocol', 'Official protocol for earthquake response and recovery operations', 'protocol', 'earthquake-response-protocol.pdf', 'PDF', '3.1 MB', '/files/earthquake-response-protocol.pdf', ARRAY['earthquake', 'protocol', 'response'], 76, 'active', admin_id, NOW(), NOW()),
  ('Fire Safety Checklist', 'Comprehensive checklist for fire prevention and safety in homes and buildings', 'checklist', 'fire-safety-checklist.pdf', 'PDF', '680 KB', '/files/fire-safety-checklist.pdf', ARRAY['fire', 'safety', 'prevention'], 134, 'active', admin_id, NOW(), NOW()),
  ('Emergency Contact Directory', 'Complete directory of emergency contacts and hotlines in Pio Duran', 'directory', 'emergency-contacts.pdf', 'PDF', '450 KB', '/files/emergency-contacts.pdf', ARRAY['contacts', 'hotlines', 'directory'], 289, 'active', admin_id, NOW(), NOW()),
  ('Community Disaster Plan Template', 'Template for creating barangay-level disaster preparedness plans', 'template', 'community-disaster-plan.docx', 'DOCX', '1.5 MB', '/files/community-disaster-plan.docx', ARRAY['planning', 'template', 'community'], 52, 'active', admin_id, NOW(), NOW());
END $$;

-- Display inserted resources
SELECT id, title, category, file_type, file_size, download_count, status FROM public.resources ORDER BY download_count DESC;
