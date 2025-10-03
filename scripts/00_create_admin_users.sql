-- Create admin users in auth.users and profiles table
-- Note: This script creates users with a default password: Admin123!
-- IMPORTANT: Change these passwords after first login!

-- First, we need to insert into auth.users (this requires service role key)
-- Since we can't directly insert into auth.users via SQL, we'll create a function

-- Create a function to safely create test users
CREATE OR REPLACE FUNCTION create_test_admin_user(
  user_email TEXT,
  user_password TEXT,
  user_full_name TEXT,
  user_role TEXT DEFAULT 'admin'
)
RETURNS UUID AS $$
DECLARE
  new_user_id UUID;
BEGIN
  -- Generate a UUID for the user
  new_user_id := gen_random_uuid();
  
  -- Insert into auth.users (this will work if RLS is properly configured)
  INSERT INTO auth.users (
    id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    role
  ) VALUES (
    new_user_id,
    user_email,
    crypt(user_password, gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    jsonb_build_object('full_name', user_full_name),
    false,
    'authenticated'
  );
  
  -- Insert into profiles table
  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    role,
    created_at,
    updated_at
  ) VALUES (
    new_user_id,
    user_email,
    user_full_name,
    user_role,
    NOW(),
    NOW()
  );
  
  RETURN new_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create three admin users
SELECT create_test_admin_user(
  'admin@pioduran-mdrrmo.gov.ph',
  'Admin123!',
  'Maria Santos',
  'admin'
);

SELECT create_test_admin_user(
  'coordinator@pioduran-mdrrmo.gov.ph',
  'Admin123!',
  'Juan Dela Cruz',
  'admin'
);

SELECT create_test_admin_user(
  'officer@pioduran-mdrrmo.gov.ph',
  'Admin123!',
  'Ana Reyes',
  'admin'
);

-- Display created users
SELECT id, email, full_name, role, created_at 
FROM public.profiles 
WHERE role = 'admin'
ORDER BY created_at DESC;
