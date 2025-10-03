-- Seed DRRM Council members
-- This creates sample council member records

INSERT INTO drrm_council (name, position, department, email, phone, bio, avatar_url, order_index, status, created_at, updated_at)
VALUES
  ('Hon. Mayor Ricardo Gonzales', 'Chairperson', 'Local Government Unit', 'mayor@pioduran.gov.ph', '+639181111111', 'Municipal Mayor and DRRM Council Chairperson', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ricardo', 1, 'active', NOW(), NOW()),
  ('Dr. Roberto Martinez', 'Vice-Chairperson', 'MDRRMO', 'roberto.martinez@mdrrmo.gov.ph', '+639171111111', 'MDRRMO Officer-in-Charge', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto', 2, 'active', NOW(), NOW()),
  ('Engr. Antonio Reyes', 'Member', 'Engineering Office', 'engineering@pioduran.gov.ph', '+639182222222', 'Municipal Engineer', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Antonio', 3, 'active', NOW(), NOW()),
  ('Dr. Carmen Lopez', 'Member', 'Health Office', 'health@pioduran.gov.ph', '+639183333333', 'Municipal Health Officer', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carmen', 4, 'active', NOW(), NOW()),
  ('Chief Insp. Fernando Cruz', 'Member', 'Police Station', 'police@pioduran.gov.ph', '+639184444444', 'Chief of Police', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fernando', 5, 'active', NOW(), NOW()),
  ('SFO3 Gabriel Santos', 'Member', 'Fire Station', 'fire@pioduran.gov.ph', '+639185555555', 'Fire Marshal', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gabriel', 6, 'active', NOW(), NOW()),
  ('Ms. Patricia Mendoza', 'Member', 'Social Welfare Office', 'dswd@pioduran.gov.ph', '+639186666666', 'Social Welfare Officer', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Patricia', 7, 'active', NOW(), NOW()),
  ('Mr. Leonardo Diaz', 'Member', 'Agriculture Office', 'agriculture@pioduran.gov.ph', '+639187777777', 'Municipal Agriculturist', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Leonardo', 8, 'active', NOW(), NOW())
ON CONFLICT DO NOTHING;
