-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- USERS TABLE (Handled by Supabase Auth, but usually we reference auth.users)
-- We don't need a public users table if we just reference auth.users

-- 1. NOTES TABLE
create table if not exists public.notes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text,
  content text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. TODOS TABLE
create table if not exists public.todos (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  text text not null,
  completed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. CONTACT SUBMISSIONS TABLE
create table if not exists public.contact_submissions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. USER PREFERENCES TABLE
create table if not exists public.user_preferences (
  user_id uuid references auth.users(id) on delete cascade primary key,
  theme text default 'light',
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. SHORTENED URLS TABLE (New)
create table if not exists public.shortened_urls (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade, -- Optional, can be anonymous
  original_url text not null,
  short_code text not null unique,
  clicks integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. QR CODE HISTORY TABLE (New)
create table if not exists public.qr_codes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  content text not null,
  config jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. FILE CONVERSION LOGS TABLE (New - for history/stats)
create table if not exists public.file_conversions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  original_name text,
  converted_name text,
  conversion_type text,
  size_bytes bigint,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);


-- ROW LEVEL SECURITY (RLS) POLICIES

-- Enable RLS on all tables
alter table public.notes enable row level security;
alter table public.todos enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.user_preferences enable row level security;
alter table public.shortened_urls enable row level security;
alter table public.qr_codes enable row level security;
alter table public.file_conversions enable row level security;

-- NOTES POLICIES
drop policy if exists "Users can view own notes" on public.notes;
create policy "Users can view own notes" on public.notes for select using (auth.uid() = user_id);

drop policy if exists "Users can insert own notes" on public.notes;
create policy "Users can insert own notes" on public.notes for insert with check (auth.uid() = user_id);

drop policy if exists "Users can update own notes" on public.notes;
create policy "Users can update own notes" on public.notes for update using (auth.uid() = user_id);

drop policy if exists "Users can delete own notes" on public.notes;
create policy "Users can delete own notes" on public.notes for delete using (auth.uid() = user_id);

-- TODOS POLICIES
drop policy if exists "Users can view own todos" on public.todos;
create policy "Users can view own todos" on public.todos for select using (auth.uid() = user_id);

drop policy if exists "Users can insert own todos" on public.todos;
create policy "Users can insert own todos" on public.todos for insert with check (auth.uid() = user_id);

drop policy if exists "Users can update own todos" on public.todos;
create policy "Users can update own todos" on public.todos for update using (auth.uid() = user_id);

drop policy if exists "Users can delete own todos" on public.todos;
create policy "Users can delete own todos" on public.todos for delete using (auth.uid() = user_id);

-- CONTACT SUBMISSIONS POLICIES
drop policy if exists "Anyone can insert contact submissions" on public.contact_submissions;
create policy "Anyone can insert contact submissions" on public.contact_submissions for insert with check (true);
-- Only admins should read (assuming no admin role set up yet, so maybe disable select for public)

-- USER PREFERENCES POLICIES
drop policy if exists "Users can view own preferences" on public.user_preferences;
create policy "Users can view own preferences" on public.user_preferences for select using (auth.uid() = user_id);

drop policy if exists "Users can insert own preferences" on public.user_preferences;
create policy "Users can insert own preferences" on public.user_preferences for insert with check (auth.uid() = user_id);

drop policy if exists "Users can update own preferences" on public.user_preferences;
create policy "Users can update own preferences" on public.user_preferences for update using (auth.uid() = user_id);

-- SHORTENED URLS POLICIES
-- Anyone can view/resolve a short URL (select by short_code needs to be public for redirection)
drop policy if exists "Anyone can read short urls" on public.shortened_urls;
create policy "Anyone can read short urls" on public.shortened_urls for select using (true);

-- Only authenticated users (or anonymous) can create
drop policy if exists "Users can create short urls" on public.shortened_urls;
create policy "Users can create short urls" on public.shortened_urls for insert with check (true); 

-- Only owner can delete
drop policy if exists "Users can delete own short urls" on public.shortened_urls;
create policy "Users can delete own short urls" on public.shortened_urls for delete using (auth.uid() = user_id);

-- QR CODES POLICIES
drop policy if exists "Users can view own qr codes" on public.qr_codes;
create policy "Users can view own qr codes" on public.qr_codes for select using (auth.uid() = user_id);

drop policy if exists "Users can insert own qr codes" on public.qr_codes;
create policy "Users can insert own qr codes" on public.qr_codes for insert with check (auth.uid() = user_id);

drop policy if exists "Users can delete own qr codes" on public.qr_codes;
create policy "Users can delete own qr codes" on public.qr_codes for delete using (auth.uid() = user_id);

-- FILE CONVERSION POLICIES
drop policy if exists "Users can view own conversions" on public.file_conversions;
create policy "Users can view own conversions" on public.file_conversions for select using (auth.uid() = user_id);

drop policy if exists "Users can insert conversions" on public.file_conversions;
create policy "Users can insert conversions" on public.file_conversions for insert with check (true); -- Allow anon insert if features used anonymously? or strictly auth.uid() = user_id if we force login
