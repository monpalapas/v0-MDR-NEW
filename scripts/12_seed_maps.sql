-- Updated to get uploaded_by from existing admin profiles
-- Seed data for hazard and facility maps
-- This creates sample maps for disaster management

DO $$
DECLARE
  admin_id UUID;
BEGIN
  -- Get the first admin user ID
  SELECT id INTO admin_id FROM public.profiles WHERE role = 'admin' LIMIT 1;
  
  -- Insert maps
  -- Fixed status values to match CHECK constraint: 'draft', 'published', 'archived'
  INSERT INTO public.maps (name, description, category, location, file_url, thumbnail_url, latitude, longitude, zoom_level, tags, status, uploaded_by, created_at, updated_at) VALUES
  ('Flood Hazard Map', 'Flood-prone areas and risk zones in Pio Duran', 'hazard', 'Pio Duran, Albay', '/maps/flood-hazard-map.pdf', '/placeholder.svg?height=300&width=400', 13.0289, 123.4623, 13, 'flood, hazard, risk', 'published', admin_id, NOW(), NOW()),
  ('Evacuation Centers Map', 'Locations of all evacuation centers in the municipality', 'facility', 'Pio Duran, Albay', '/maps/evacuation-centers.pdf', '/placeholder.svg?height=300&width=400', 13.0267, 123.4623, 12, 'evacuation, facilities, centers', 'published', admin_id, NOW(), NOW()),
  ('Landslide Susceptibility Map', 'Areas susceptible to landslides and soil erosion', 'hazard', 'Pio Duran, Albay', '/maps/landslide-map.pdf', '/placeholder.svg?height=300&width=400', 13.0312, 123.4701, 13, 'landslide, hazard, risk', 'published', admin_id, NOW(), NOW()),
  ('Emergency Response Routes', 'Primary and alternate routes for emergency response vehicles', 'route', 'Pio Duran, Albay', '/maps/emergency-routes.pdf', '/placeholder.svg?height=300&width=400', 13.0289, 123.4623, 12, 'routes, emergency, access', 'published', admin_id, NOW(), NOW());
END $$;

-- Display inserted maps
SELECT id, name, category, location, tags, status FROM public.maps ORDER BY category, name;
