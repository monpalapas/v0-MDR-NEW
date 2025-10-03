-- Updated to use existing admin user IDs from profiles table
-- Seed data for personnel table
-- This creates sample MDRRMO staff members

INSERT INTO public.personnel (name, position, department, email, phone, status, avatar_url, created_at, updated_at) VALUES
('Engr. Roberto Martinez', 'MDRRMO Officer-in-Charge', 'Operations', 'roberto.martinez@pioduran-mdrrmo.gov.ph', '+63 917 123 4567', 'active', '/placeholder.svg?height=100&width=100', NOW(), NOW()),
('Dr. Elena Villanueva', 'Medical Coordinator', 'Health Services', 'elena.villanueva@pioduran-mdrrmo.gov.ph', '+63 918 234 5678', 'active', '/placeholder.svg?height=100&width=100', NOW(), NOW()),
('Mark Anthony Cruz', 'Operations Chief', 'Operations', 'mark.cruz@pioduran-mdrrmo.gov.ph', '+63 919 345 6789', 'active', '/placeholder.svg?height=100&width=100', NOW(), NOW()),
('Sarah Jane Ramos', 'Communications Officer', 'Communications', 'sarah.ramos@pioduran-mdrrmo.gov.ph', '+63 920 456 7890', 'active', '/placeholder.svg?height=100&width=100', NOW(), NOW()),
('Lt. Carlos Mendoza', 'Rescue Team Leader', 'Search and Rescue', 'carlos.mendoza@pioduran-mdrrmo.gov.ph', '+63 921 567 8901', 'active', '/placeholder.svg?height=100&width=100', NOW(), NOW()),
('Jennifer Lopez', 'Logistics Officer', 'Logistics', 'jennifer.lopez@pioduran-mdrrmo.gov.ph', '+63 922 678 9012', 'active', '/placeholder.svg?height=100&width=100', NOW(), NOW()),
('Michael Santos', 'Training Coordinator', 'Training and Development', 'michael.santos@pioduran-mdrrmo.gov.ph', '+63 923 789 0123', 'active', '/placeholder.svg?height=100&width=100', NOW(), NOW()),
('Grace Aquino', 'Administrative Assistant', 'Administration', 'grace.aquino@pioduran-mdrrmo.gov.ph', '+63 924 890 1234', 'active', '/placeholder.svg?height=100&width=100', NOW(), NOW()),
('Ramon Bautista', 'Equipment Manager', 'Logistics', 'ramon.bautista@pioduran-mdrrmo.gov.ph', '+63 925 901 2345', 'active', '/placeholder.svg?height=100&width=100', NOW(), NOW()),
('Lisa Marie Garcia', 'Community Relations Officer', 'Community Affairs', 'lisa.garcia@pioduran-mdrrmo.gov.ph', '+63 926 012 3456', 'active', '/placeholder.svg?height=100&width=100', NOW(), NOW());

-- Display inserted personnel
SELECT id, name, position, department, status FROM public.personnel ORDER BY id;
