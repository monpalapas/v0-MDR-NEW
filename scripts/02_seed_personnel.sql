-- Seed personnel table with MDRRMO staff
-- This creates sample personnel records

INSERT INTO personnel (name, email, phone, department, position, status, avatar_url, created_at, updated_at)
VALUES
  ('Dr. Roberto Martinez', 'roberto.martinez@mdrrmo.gov.ph', '+639171111111', 'Administration', 'MDRRMO Officer-in-Charge', 'active', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto', NOW(), NOW()),
  ('Engr. Sofia Villanueva', 'sofia.villanueva@mdrrmo.gov.ph', '+639172222222', 'Operations', 'Operations Chief', 'active', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia', NOW(), NOW()),
  ('Jose Mercado', 'jose.mercado@mdrrmo.gov.ph', '+639173333333', 'Emergency Response', 'Response Team Leader', 'active', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jose', NOW(), NOW()),
  ('Ana Bautista', 'ana.bautista@mdrrmo.gov.ph', '+639174444444', 'Medical Services', 'Medical Officer', 'active', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana', NOW(), NOW()),
  ('Carlos Ramos', 'carlos.ramos@mdrrmo.gov.ph', '+639175555555', 'Communications', 'Communications Officer', 'active', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos', NOW(), NOW()),
  ('Linda Cruz', 'linda.cruz@mdrrmo.gov.ph', '+639176666666', 'Logistics', 'Logistics Coordinator', 'active', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Linda', NOW(), NOW()),
  ('Miguel Torres', 'miguel.torres@mdrrmo.gov.ph', '+639177777777', 'Training', 'Training Officer', 'active', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Miguel', NOW(), NOW()),
  ('Elena Garcia', 'elena.garcia@mdrrmo.gov.ph', '+639178888888', 'Planning', 'Planning Officer', 'active', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena', NOW(), NOW()),
  ('Ramon Santos', 'ramon.santos@mdrrmo.gov.ph', '+639179999999', 'Emergency Response', 'Rescue Team Member', 'active', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ramon', NOW(), NOW()),
  ('Teresa Flores', 'teresa.flores@mdrrmo.gov.ph', '+639170000000', 'Medical Services', 'Nurse', 'active', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Teresa', NOW(), NOW())
ON CONFLICT DO NOTHING;
