-- Run this in your Supabase project's SQL editor (Dashboard > SQL Editor)

-- profiles: one row per auth user
CREATE TABLE IF NOT EXISTS profiles (
  id        UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email     TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role      TEXT NOT NULL CHECK (role IN ('BUYER', 'VENDOR')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- vendor_profiles: extended details for VENDOR accounts
CREATE TABLE IF NOT EXISTS vendor_profiles (
  id         UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  brand_name TEXT NOT NULL,
  store_slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE vendor_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Vendors can insert own vendor profile"
  ON vendor_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Vendors can read own vendor profile"
  ON vendor_profiles FOR SELECT
  USING (auth.uid() = id);
