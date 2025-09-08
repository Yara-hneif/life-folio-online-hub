-- Add missing RLS policies with proper type casting

-- Analytics table policies
CREATE POLICY "Users can manage their own analytics" 
ON public.analytics 
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Contact table policies  
CREATE POLICY "Users can manage their own contact messages" 
ON public.contact 
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Images media table policies
CREATE POLICY "Public read images" 
ON public.images_media 
FOR SELECT 
USING (true);

CREATE POLICY "Users can manage project images" 
ON public.images_media 
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.projects 
    WHERE projects.id = images_media.project_id 
    AND projects.clerk_user_id = auth.uid()::text
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.projects 
    WHERE projects.id = images_media.project_id 
    AND projects.clerk_user_id = auth.uid()::text
  )
);

-- Links recommended table policies
CREATE POLICY "Users can manage their own recommended links" 
ON public.links_recommended 
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- User skills table policies
CREATE POLICY "Public read user skills" 
ON public.user_skills 
FOR SELECT 
USING (true);

CREATE POLICY "Users can manage their own skills" 
ON public.user_skills 
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Skills table - public read only
CREATE POLICY "Public read skills" 
ON public.skills 
FOR SELECT 
USING (true);

-- Sites table policies
CREATE POLICY "Public read published sites" 
ON public.sites 
FOR SELECT 
USING (published = true OR auth.uid() = user_id);

-- Site pages policies (already exist but let's ensure they're correct)
DROP POLICY IF EXISTS "Public read published site pages" ON public.site_pages;
DROP POLICY IF EXISTS "Users can manage their own site pages" ON public.site_pages;

CREATE POLICY "Public read published site pages" 
ON public.site_pages 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.sites 
    WHERE sites.id = site_pages.site_id 
    AND (sites.published = true OR sites.user_id = auth.uid())
  )
);

CREATE POLICY "Users can manage their own site pages" 
ON public.site_pages 
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.sites 
    WHERE sites.id = site_pages.site_id 
    AND sites.user_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.sites 
    WHERE sites.id = site_pages.site_id 
    AND sites.user_id = auth.uid()
  )
);

-- Fix function security by setting search path
ALTER FUNCTION public.handle_new_user() SET search_path = public;