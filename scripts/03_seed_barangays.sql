-- Removed created_by references since barangays don't need that field
-- Seed data for barangays
-- This creates the 12 barangays of Pio Duran with realistic data

INSERT INTO public.barangays (name, code, captain, contact_number, email, address, population, households, area_sqkm, latitude, longitude, status, created_at, updated_at) VALUES
('Agol', 'PDN-001', 'Brgy. Capt. Jose Santos', '+63 917 100 0001', 'agol@pioduran.gov.ph', 'Barangay Agol, Pio Duran, Albay', 1250, 280, 3.5, 13.0345, 123.4567, 'active', NOW(), NOW()),
('Alabao', 'PDN-002', 'Brgy. Capt. Maria Reyes', '+63 917 100 0002', 'alabao@pioduran.gov.ph', 'Barangay Alabao, Pio Duran, Albay', 980, 220, 2.8, 13.0412, 123.4623, 'active', NOW(), NOW()),
('Bagumbayan', 'PDN-003', 'Brgy. Capt. Ramon Cruz', '+63 917 100 0003', 'bagumbayan@pioduran.gov.ph', 'Barangay Bagumbayan, Pio Duran, Albay', 1450, 320, 4.2, 13.0289, 123.4701, 'active', NOW(), NOW()),
('Basicao Coastal', 'PDN-004', 'Brgy. Capt. Ana Garcia', '+63 917 100 0004', 'basicao.coastal@pioduran.gov.ph', 'Barangay Basicao Coastal, Pio Duran, Albay', 1680, 380, 3.9, 13.0156, 123.4589, 'active', NOW(), NOW()),
('Basicao Interior', 'PDN-005', 'Brgy. Capt. Pedro Mendoza', '+63 917 100 0005', 'basicao.interior@pioduran.gov.ph', 'Barangay Basicao Interior, Pio Duran, Albay', 1120, 250, 5.1, 13.0223, 123.4734, 'active', NOW(), NOW()),
('Cagbulacao', 'PDN-006', 'Brgy. Capt. Elena Ramos', '+63 917 100 0006', 'cagbulacao@pioduran.gov.ph', 'Barangay Cagbulacao, Pio Duran, Albay', 890, 200, 2.6, 13.0378, 123.4812, 'active', NOW(), NOW()),
('Macabugos', 'PDN-007', 'Brgy. Capt. Carlos Villanueva', '+63 917 100 0007', 'macabugos@pioduran.gov.ph', 'Barangay Macabugos, Pio Duran, Albay', 1340, 300, 3.7, 13.0445, 123.4545, 'active', NOW(), NOW()),
('Malobago', 'PDN-008', 'Brgy. Capt. Jennifer Lopez', '+63 917 100 0008', 'malobago@pioduran.gov.ph', 'Barangay Malobago, Pio Duran, Albay', 1560, 350, 4.5, 13.0312, 123.4678, 'active', NOW(), NOW()),
('Napo', 'PDN-009', 'Brgy. Capt. Michael Santos', '+63 917 100 0009', 'napo@pioduran.gov.ph', 'Barangay Napo, Pio Duran, Albay', 2100, 470, 6.2, 13.0189, 123.4756, 'active', NOW(), NOW()),
('Poblacion', 'PDN-010', 'Brgy. Capt. Grace Aquino', '+63 917 100 0010', 'poblacion@pioduran.gov.ph', 'Barangay Poblacion, Pio Duran, Albay', 3200, 720, 2.1, 13.0267, 123.4623, 'active', NOW(), NOW()),
('San Antonio', 'PDN-011', 'Brgy. Capt. Ramon Bautista', '+63 917 100 0011', 'sanantonio@pioduran.gov.ph', 'Barangay San Antonio, Pio Duran, Albay', 1780, 400, 4.8, 13.0401, 123.4789, 'active', NOW(), NOW()),
('San Jose', 'PDN-012', 'Brgy. Capt. Lisa Garcia', '+63 917 100 0012', 'sanjose@pioduran.gov.ph', 'Barangay San Jose, Pio Duran, Albay', 1420, 320, 3.4, 13.0334, 123.4534, 'active', NOW(), NOW());

-- Display inserted barangays
SELECT id, name, code, captain, population, households, status FROM public.barangays ORDER BY name;
