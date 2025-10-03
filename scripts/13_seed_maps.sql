-- Seed maps table
-- This creates sample hazard map records

INSERT INTO maps (name, description, category, location, file_url, thumbnail_url, latitude, longitude, zoom_level, tags, status, uploaded_by, created_at, updated_at)
VALUES
  ('Flood Hazard Map - Pio Duran', 'Comprehensive flood hazard map showing flood-prone areas and risk levels', 'hazard', 'Pio Duran, Albay', '/maps/flood-hazard-map.pdf', 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400', 13.0567, 123.4678, 13, 'flood, hazard, risk assessment', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW()),
  ('Evacuation Routes Map', 'Map showing designated evacuation routes and assembly points for all barangays', 'evacuation', 'Pio Duran, Albay', '/maps/evacuation-routes.pdf', 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=400', 13.0567, 123.4678, 12, 'evacuation, routes, assembly points', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW()),
  ('Landslide Susceptibility Map', 'Map indicating areas susceptible to landslides and recommended precautions', 'hazard', 'Pio Duran, Albay', '/maps/landslide-map.pdf', 'https://images.unsplash.com/photo-1589519160732-57fc498494f8?w=400', 13.0567, 123.4678, 13, 'landslide, hazard, susceptibility', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW()),
  ('Emergency Facilities Map', 'Location of emergency facilities including hospitals, fire stations, and police stations', 'facilities', 'Pio Duran, Albay', '/maps/emergency-facilities.pdf', 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=400', 13.0567, 123.4678, 14, 'facilities, emergency, hospitals', 'active', '00000000-0000-0000-0000-000000000002', NOW(), NOW())
ON CONFLICT DO NOTHING;
