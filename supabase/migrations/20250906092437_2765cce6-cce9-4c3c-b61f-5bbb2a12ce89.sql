-- Update profiles table to handle Clerk integration
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS clerk_id TEXT UNIQUE;

-- Create RLS policies for profiles table
DROP POLICY IF EXISTS "Public read profiles" ON public.profiles;
CREATE POLICY "Public read profiles" 
ON public.profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid()::text = clerk_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid()::text = clerk_id);

-- Update other tables to use clerk_id for user identification
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS clerk_user_id TEXT;

ALTER TABLE public.blogs 
ADD COLUMN IF NOT EXISTS clerk_user_id TEXT;

ALTER TABLE public.education 
ADD COLUMN IF NOT EXISTS clerk_user_id TEXT;

ALTER TABLE public.experience 
ADD COLUMN IF NOT EXISTS clerk_user_id TEXT;

ALTER TABLE public.certifications 
ADD COLUMN IF NOT EXISTS clerk_user_id TEXT;

-- Create RLS policies for projects
DROP POLICY IF EXISTS "Public read projects" ON public.projects;
DROP POLICY IF EXISTS "projects_read_own" ON public.projects;
DROP POLICY IF EXISTS "projects_write_own" ON public.projects;

CREATE POLICY "Public read published projects" 
ON public.projects 
FOR SELECT 
USING (status = 'published' OR auth.uid()::text = clerk_user_id);

CREATE POLICY "Users can manage their own projects" 
ON public.projects 
FOR ALL
USING (auth.uid()::text = clerk_user_id)
WITH CHECK (auth.uid()::text = clerk_user_id);

-- Create RLS policies for blogs
DROP POLICY IF EXISTS "Users can delete their own blogs" ON public.blogs;
DROP POLICY IF EXISTS "Users can insert their own blogs" ON public.blogs;
DROP POLICY IF EXISTS "Users can read their own blogs" ON public.blogs;
DROP POLICY IF EXISTS "Users can update their own blogs" ON public.blogs;

CREATE POLICY "Users can manage their own blogs" 
ON public.blogs 
FOR ALL
USING (auth.uid()::text = clerk_user_id)
WITH CHECK (auth.uid()::text = clerk_user_id);

-- Create RLS policies for education
CREATE POLICY "Users can manage their own education" 
ON public.education 
FOR ALL
USING (auth.uid()::text = clerk_user_id)
WITH CHECK (auth.uid()::text = clerk_user_id);

-- Create RLS policies for experience
CREATE POLICY "Users can manage their own experience" 
ON public.experience 
FOR ALL
USING (auth.uid()::text = clerk_user_id)
WITH CHECK (auth.uid()::text = clerk_user_id);

-- Create RLS policies for certifications
CREATE POLICY "Users can manage their own certifications" 
ON public.certifications 
FOR ALL
USING (auth.uid()::text = clerk_user_id)
WITH CHECK (auth.uid()::text = clerk_user_id);

-- Enable RLS on all tables if not already enabled
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;