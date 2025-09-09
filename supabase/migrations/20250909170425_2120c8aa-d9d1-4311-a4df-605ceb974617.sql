-- إصلاح المشاكل الأمنية المتبقية

-- إضافة RLS policies للجداول المفقودة

-- جدول analytics (إذا لم تكن موجودة)
CREATE POLICY IF NOT EXISTS "Users can manage their own analytics" 
ON public.analytics 
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- جدول blogs
DROP POLICY IF EXISTS "Users can manage their own blogs" ON public.blogs;
CREATE POLICY "Users can manage their own blogs" 
ON public.blogs 
FOR ALL
USING (auth.uid()::text = clerk_user_id OR public.has_role(auth.uid(), 'super_admin'))
WITH CHECK (auth.uid()::text = clerk_user_id OR public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Public read published blogs" 
ON public.blogs 
FOR SELECT
USING (true);

-- جدول certifications
DROP POLICY IF EXISTS "Users can manage their own certifications" ON public.certifications;
CREATE POLICY "Users can manage their own certifications" 
ON public.certifications 
FOR ALL
USING (auth.uid()::text = clerk_user_id OR public.has_role(auth.uid(), 'super_admin'))
WITH CHECK (auth.uid()::text = clerk_user_id OR public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Public read certifications" 
ON public.certifications 
FOR SELECT
USING (true);

-- جدول education
DROP POLICY IF EXISTS "Users can manage their own education" ON public.education;
CREATE POLICY "Users can manage their own education" 
ON public.education 
FOR ALL
USING (auth.uid()::text = clerk_user_id OR public.has_role(auth.uid(), 'super_admin'))
WITH CHECK (auth.uid()::text = clerk_user_id OR public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Public read education" 
ON public.education 
FOR SELECT
USING (true);

-- جدول experience
DROP POLICY IF EXISTS "Users can manage their own experience" ON public.experience;
CREATE POLICY "Users can manage their own experience" 
ON public.experience 
FOR ALL
USING (auth.uid()::text = clerk_user_id OR public.has_role(auth.uid(), 'super_admin'))
WITH CHECK (auth.uid()::text = clerk_user_id OR public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Public read experience" 
ON public.experience 
FOR SELECT
USING (true);

-- جدول github_sync_config
ALTER TABLE public.github_sync_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Super admin can manage github sync config" 
ON public.github_sync_config 
FOR ALL
USING (public.has_role(auth.uid(), 'super_admin'))
WITH CHECK (public.has_role(auth.uid(), 'super_admin'));

-- جدول images_media - تحديث السياسات
DROP POLICY IF EXISTS "Public read images" ON public.images_media;
DROP POLICY IF EXISTS "Users can manage project images" ON public.images_media;

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
    AND (
      projects.clerk_user_id = auth.uid()::text
      OR public.has_role(auth.uid(), 'super_admin')
    )
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.projects 
    WHERE projects.id = images_media.project_id 
    AND (
      projects.clerk_user_id = auth.uid()::text
      OR public.has_role(auth.uid(), 'super_admin')
    )
  )
);

-- جدول links_recommended
DROP POLICY IF EXISTS "Users can manage their own recommended links" ON public.links_recommended;
CREATE POLICY "Users can manage their own recommended links" 
ON public.links_recommended 
FOR ALL
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'super_admin'))
WITH CHECK (auth.uid() = user_id OR public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Public read recommended links" 
ON public.links_recommended 
FOR SELECT
USING (true);

-- جدول profiles - تحديث السياسات
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT
WITH CHECK (auth.uid()::text = clerk_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE
USING (auth.uid()::text = clerk_id OR public.has_role(auth.uid(), 'super_admin'));

-- جدول projects - تحديث السياسات
DROP POLICY IF EXISTS "Public read published projects" ON public.projects;
DROP POLICY IF EXISTS "Users can manage their own projects" ON public.projects;

CREATE POLICY "Public read published projects" 
ON public.projects 
FOR SELECT 
USING (
  status = 'published'
  OR auth.uid()::text = clerk_user_id
  OR public.has_role(auth.uid(), 'super_admin')
);

CREATE POLICY "Users can manage their own projects" 
ON public.projects 
FOR ALL
USING (auth.uid()::text = clerk_user_id OR public.has_role(auth.uid(), 'super_admin'))
WITH CHECK (auth.uid()::text = clerk_user_id OR public.has_role(auth.uid(), 'super_admin'));

-- جدول skills - السياسات موجودة بالفعل

-- جدول user_skills
DROP POLICY IF EXISTS "Public read user skills" ON public.user_skills;
DROP POLICY IF EXISTS "Users can manage their own skills" ON public.user_skills;

CREATE POLICY "Public read user skills" 
ON public.user_skills 
FOR SELECT 
USING (true);

CREATE POLICY "Users can manage their own skills" 
ON public.user_skills 
FOR ALL
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'super_admin'))
WITH CHECK (auth.uid() = user_id OR public.has_role(auth.uid(), 'super_admin'));