-- Seed data for DRRM Council members
-- This creates the municipal DRRM council composition

INSERT INTO public.drrm_council (name, position, department, email, phone, bio, order_index, status, avatar_url, created_at, updated_at) VALUES
('Hon. Mayor Ricardo Gomez', 'Chairperson', 'Local Chief Executive', 'mayor@pioduran.gov.ph', '+63 917 111 2222', 'Municipal Mayor and DRRM Council Chairperson', 1, 'active', '/placeholder.svg?height=150&width=150', NOW(), NOW()),
('Engr. Roberto Martinez', 'Vice-Chairperson', 'MDRRMO', 'roberto.martinez@pioduran-mdrrmo.gov.ph', '+63 917 123 4567', 'MDRRMO Officer-in-Charge and Council Vice-Chair', 2, 'active', '/placeholder.svg?height=150&width=150', NOW(), NOW()),
('Dr. Elena Villanueva', 'Member', 'Municipal Health Office', 'mho@pioduran.gov.ph', '+63 918 234 5678', 'Municipal Health Officer', 3, 'active', '/placeholder.svg?height=150&width=150', NOW(), NOW()),
('Engr. Antonio Reyes', 'Member', 'Engineering Office', 'meo@pioduran.gov.ph', '+63 919 333 4444', 'Municipal Engineer', 4, 'active', '/placeholder.svg?height=150&width=150', NOW(), NOW()),
('PSInsp. Maria Santos', 'Member', 'Philippine National Police', 'pnp.pioduran@police.gov.ph', '+63 920 444 5555', 'Chief of Police', 5, 'active', '/placeholder.svg?height=150&width=150', NOW(), NOW()),
('SFO3 Juan Dela Cruz', 'Member', 'Bureau of Fire Protection', 'bfp.pioduran@fire.gov.ph', '+63 921 555 6666', 'Fire Marshal', 6, 'active', '/placeholder.svg?height=150&width=150', NOW(), NOW()),
('Prof. Carmen Rodriguez', 'Member', 'Department of Education', 'deped.pioduran@deped.gov.ph', '+63 922 666 7777', 'Schools Division Superintendent', 7, 'active', '/placeholder.svg?height=150&width=150', NOW(), NOW()),
('Mr. Pedro Fernandez', 'Member', 'Social Welfare Office', 'mswd@pioduran.gov.ph', '+63 923 777 8888', 'Municipal Social Welfare Officer', 8, 'active', '/placeholder.svg?height=150&width=150', NOW(), NOW());

-- Display inserted council members
SELECT id, name, position, department, order_index, status FROM public.drrm_council ORDER BY order_index;
