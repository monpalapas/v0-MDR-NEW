-- Seed public_messages table
-- This creates sample public message/inquiry records

INSERT INTO public_messages (sender_name, sender_email, sender_phone, subject, message, category, priority, status, created_at, updated_at)
VALUES
  ('Juan Dela Cruz', 'juan.delacruz@email.com', '+639171234567', 'Inquiry about Evacuation Center', 'Good day! I would like to know the location of the nearest evacuation center in Barangay Poblacion. Thank you.', 'inquiry', 'medium', 'pending', NOW() - INTERVAL '2 hours', NOW()),
  ('Maria Santos', 'maria.santos@email.com', '+639181234567', 'Request for Fire Safety Training', 'We would like to request a fire safety training for our barangay. Please advise on the schedule and requirements.', 'request', 'medium', 'pending', NOW() - INTERVAL '1 day', NOW()),
  ('Pedro Reyes', 'pedro.reyes@email.com', '+639191234567', 'Flood Report', 'There is flooding in our area (Barangay San Jose) due to heavy rain. Water level is rising. Please send assistance.', 'report', 'high', 'resolved', NOW() - INTERVAL '3 days', NOW() - INTERVAL '2 days'),
  ('Ana Bautista', 'ana.bautista@email.com', '+639201234567', 'Suggestion for Disaster Preparedness', 'I suggest conducting more frequent disaster preparedness seminars in our barangay to increase awareness.', 'suggestion', 'low', 'reviewed', NOW() - INTERVAL '5 days', NOW() - INTERVAL '4 days'),
  ('Carlos Ramos', 'carlos.ramos@email.com', '+639211234567', 'Complaint about Blocked Drainage', 'The drainage system in our street is blocked, causing water to accumulate. This could lead to flooding during heavy rain.', 'complaint', 'high', 'in_progress', NOW() - INTERVAL '1 day', NOW())
ON CONFLICT DO NOTHING;
