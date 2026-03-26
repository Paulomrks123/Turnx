-- 1. Create Profiles Table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  full_name TEXT,
  company TEXT,
  role TEXT,
  email TEXT,
  avatar_url TEXT,
  bio TEXT,
  points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- 2. Create Opportunities Table
CREATE TABLE opportunities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT DEFAULT 'negócio',
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- 3. Create Services Table
CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  sector TEXT,
  description TEXT NOT NULL,
  indicative_value TEXT,
  model TEXT,
  support_links TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- 4. Create Events Table
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  location TEXT,
  image_url TEXT,
  is_premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- 5. Create Event Registrations Table
CREATE TABLE event_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  UNIQUE(user_id, event_id)
);

-- 6. Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

-- 7. Create RLS Policies

-- Profiles: Anyone can read, only owner can update
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

-- Opportunities: Anyone can read approved, only owner can CRUD their own
CREATE POLICY "Public can view approved opportunities." ON opportunities FOR SELECT USING (status = 'approved');
CREATE POLICY "Users can view their own opportunities." ON opportunities FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own opportunities." ON opportunities FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own opportunities." ON opportunities FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own opportunities." ON opportunities FOR DELETE USING (auth.uid() = user_id);

-- Services: Anyone can read approved, only owner can CRUD their own
CREATE POLICY "Public can view approved services." ON services FOR SELECT USING (status = 'approved');
CREATE POLICY "Users can view their own services." ON services FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own services." ON services FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own services." ON services FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own services." ON services FOR DELETE USING (auth.uid() = user_id);

-- Events: Anyone can read
CREATE POLICY "Events are viewable by everyone." ON events FOR SELECT USING (true);

-- Event Registrations: Only owner can CRUD their own
CREATE POLICY "Users can view their own registrations." ON event_registrations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can register to events." ON event_registrations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can cancel their registrations." ON event_registrations FOR DELETE USING (auth.uid() = user_id);

-- 8. Create Trigger for New User Profile
-- This automatically creates a profile when a new user signs up via Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
