-- Create tables for our blog application

-- Enable RLS (Row Level Security)
alter table auth.users enable row level security;

-- Create a table for user profiles
create table public.users (
  id uuid references auth.users not null primary key,
  email text not null,
  username text not null unique,
  avatar_url text,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Create a table for blogs
create table public.blogs (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text not null,
  author_id uuid references public.users not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  published boolean default false not null,
  likes_count integer default 0 not null
);

-- Create a table for likes
create table public.likes (
  id uuid default gen_random_uuid() primary key,
  blog_id uuid references public.blogs not null,
  user_id uuid references public.users not null,
  created_at timestamp with time zone default now() not null,
  unique (blog_id, user_id)
);

-- Create a table for follows
create table public.follows (
  id uuid default gen_random_uuid() primary key,
  follower_id uuid references public.users not null,
  following_id uuid references public.users not null,
  created_at timestamp with time zone default now() not null,
  unique (follower_id, following_id)
);

-- Create functions for incrementing and decrementing likes count
create or replace function increment_likes(blog_id uuid)
returns void as $$
begin
  update public.blogs
  set likes_count = likes_count + 1
  where id = blog_id;
end;
$$ language plpgsql;

create or replace function decrement_likes(blog_id uuid)
returns void as $$
begin
  update public.blogs
  set likes_count = likes_count - 1
  where id = blog_id;
end;
$$ language plpgsql;