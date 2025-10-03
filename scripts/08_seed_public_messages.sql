-- Seed data for public messages/inquiries
-- This creates sample citizen inquiries and reports

INSERT INTO public.public_messages (sender_name, sender_email, sender_phone, subject, message, category, priority, status, created_at, updated_at) VALUES
('Juan Santos', 'juan.santos@email.com', '+63 917 111 2222', 'Flood in Barangay Bagumbayan', 'There is flooding in our area due to heavy rain. Water level is rising near the creek. Please send assistance.', 'emergency', 'high', 'pending', NOW() - INTERVAL '2 hours', NOW() - INTERVAL '2 hours'),
('Maria Cruz', 'maria.cruz@email.com', '+63 918 222 3333', 'Request for First Aid Training', 'Good day! I would like to inquire about the schedule for first aid training. Is it open for ordinary citizens?', 'inquiry', 'low', 'pending', NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
('Pedro Reyes', 'pedro.reyes@email.com', '+63 919 333 4444', 'Fallen Tree Blocking Road', 'A large tree has fallen and is blocking the road to Barangay Macabugos. Vehicles cannot pass through.', 'report', 'medium', 'in_progress', NOW() - INTERVAL '5 hours', NOW() - INTERVAL '1 hour'),
('Ana Garcia', 'ana.garcia@email.com', '+63 920 444 5555', 'Evacuation Center Inquiry', 'Where is the nearest evacuation center for Barangay Poblacion? We want to be prepared in case of emergency.', 'inquiry', 'low', 'resolved', NOW() - INTERVAL '3 days', NOW() - INTERVAL '2 days'),
('Carlos Mendoza', 'carlos.mendoza@email.com', '+63 921 555 6666', 'Landslide Warning', 'There are cracks appearing on the hillside near our community. This might be a sign of potential landslide. Please inspect.', 'emergency', 'high', 'in_progress', NOW() - INTERVAL '6 hours', NOW() - INTERVAL '3 hours');

-- Display inserted messages
SELECT id, sender_name, subject, category, priority, status, created_at FROM public.public_messages ORDER BY created_at DESC;
