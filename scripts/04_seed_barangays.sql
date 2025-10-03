-- Seed barangays table
-- This creates sample barangay records for Pio Duran

INSERT INTO barangays (name, code, captain, contact_number, email, address, latitude, longitude, population, households, area_sqkm, status, created_at, updated_at)
VALUES
  ('Alabang', 'PD-001', 'Brgy. Capt. Juan Dela Cruz', '+639171234501', 'alabang@pioduran.gov.ph', 'Alabang, Pio Duran, Albay', 13.0456, 123.4567, 2500, 500, 5.2, 'active', NOW(), NOW()),
  ('Bagumbayan', 'PD-002', 'Brgy. Capt. Maria Santos', '+639171234502', 'bagumbayan@pioduran.gov.ph', 'Bagumbayan, Pio Duran, Albay', 13.0478, 123.4589, 3200, 640, 6.8, 'active', NOW(), NOW()),
  ('Caguscos', 'PD-003', 'Brgy. Capt. Pedro Reyes', '+639171234503', 'caguscos@pioduran.gov.ph', 'Caguscos, Pio Duran, Albay', 13.0501, 123.4612, 1800, 360, 4.5, 'active', NOW(), NOW()),
  ('Casiguran', 'PD-004', 'Brgy. Capt. Ana Bautista', '+639171234504', 'casiguran@pioduran.gov.ph', 'Casiguran, Pio Duran, Albay', 13.0523, 123.4634, 2100, 420, 5.0, 'active', NOW(), NOW()),
  ('Hacienda (San Miguel)', 'PD-005', 'Brgy. Capt. Carlos Ramos', '+639171234505', 'hacienda@pioduran.gov.ph', 'Hacienda, Pio Duran, Albay', 13.0545, 123.4656, 2800, 560, 7.2, 'active', NOW(), NOW()),
  ('Macabugos', 'PD-006', 'Brgy. Capt. Linda Cruz', '+639171234506', 'macabugos@pioduran.gov.ph', 'Macabugos, Pio Duran, Albay', 13.0567, 123.4678, 3500, 700, 8.5, 'active', NOW(), NOW()),
  ('Malobago', 'PD-007', 'Brgy. Capt. Miguel Torres', '+639171234507', 'malobago@pioduran.gov.ph', 'Malobago, Pio Duran, Albay', 13.0589, 123.4701, 1500, 300, 3.8, 'active', NOW(), NOW()),
  ('Matnog', 'PD-008', 'Brgy. Capt. Elena Garcia', '+639171234508', 'matnog@pioduran.gov.ph', 'Matnog, Pio Duran, Albay', 13.0612, 123.4723, 2200, 440, 5.5, 'active', NOW(), NOW()),
  ('Napo', 'PD-009', 'Brgy. Capt. Ramon Santos', '+639171234509', 'napo@pioduran.gov.ph', 'Napo, Pio Duran, Albay', 13.0634, 123.4745, 2900, 580, 6.3, 'active', NOW(), NOW()),
  ('Poblacion', 'PD-010', 'Brgy. Capt. Teresa Flores', '+639171234510', 'poblacion@pioduran.gov.ph', 'Poblacion, Pio Duran, Albay', 13.0656, 123.4767, 4500, 900, 3.2, 'active', NOW(), NOW()),
  ('San Jose', 'PD-011', 'Brgy. Capt. Roberto Cruz', '+639171234511', 'sanjose@pioduran.gov.ph', 'San Jose, Pio Duran, Albay', 13.0678, 123.4789, 3100, 620, 7.0, 'active', NOW(), NOW()),
  ('San Juan', 'PD-012', 'Brgy. Capt. Sofia Mendez', '+639171234512', 'sanjuan@pioduran.gov.ph', 'San Juan, Pio Duran, Albay', 13.0701, 123.4812, 2600, 520, 5.8, 'active', NOW(), NOW())
ON CONFLICT DO NOTHING;
