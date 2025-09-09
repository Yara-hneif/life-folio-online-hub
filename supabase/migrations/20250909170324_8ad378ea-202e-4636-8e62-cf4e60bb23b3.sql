-- ==============================================
-- ENUM للأدوار
-- ==============================================
CREATE TYPE public.app_role AS ENUM (
  'super_admin',
  'site_owner',
  'site_admin',
  'editor',
  'viewer'
);

-- ==============================================
-- جدول user_roles
-- ==============================================
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,                  -- Clerk user ID
  role app_role NOT NULL,
  site_id uuid REFERENCES sites(id) NULL, -- NULL = دور عام مثل super_admin
  permissions jsonb DEFAULT '{}'::jsonb,  -- صلاحيات granular مستقبلية
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role, site_id)
);

-- ==============================================
-- إضافة created_at لجدول site_messages إذا لم يكن موجوداً
-- ==============================================
ALTER TABLE public.site_messages 
ADD COLUMN IF NOT EXISTS created_at timestamptz NOT NULL DEFAULT now();

-- ==============================================
-- دوال للتحقق من الصلاحيات
-- ==============================================

-- تحقق من وجود دور معين
CREATE OR REPLACE FUNCTION public.has_role(
  _user_id uuid,
  _role app_role,
  _site_id uuid DEFAULT NULL
)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
      AND (site_id = _site_id OR (_site_id IS NULL AND site_id IS NULL))
  );
$$;

-- تحقق إن كان للمستخدم أي دور في موقع
CREATE OR REPLACE FUNCTION public.has_site_access(
  _user_id uuid,
  _site_id uuid
)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND site_id = _site_id
  ) OR EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = 'super_admin'
      AND site_id IS NULL
  );
$$;

-- ==============================================
-- Trigger لإضافة Site Owner عند إنشاء موقع جديد
-- ==============================================
CREATE OR REPLACE FUNCTION public.handle_new_site()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role, site_id)
  VALUES (NEW.user_id, 'site_owner', NEW.id);
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_site_created
AFTER INSERT ON public.sites
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_site();

-- ==============================================
-- Triggers للتحديث التلقائي لـ updated_at
-- ==============================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_user_roles_updated_at
  BEFORE UPDATE ON public.user_roles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ==============================================
-- تفعيل RLS
-- ==============================================
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_messages ENABLE ROW LEVEL SECURITY;

-- ==============================================
-- RLS لجدول user_roles
-- ==============================================

-- يمكن للمستخدم رؤية أدواره أو إذا كان Super Admin
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (
  auth.uid() = user_id
  OR public.has_role(auth.uid(), 'super_admin')
);

-- Site Owner يدير الأدوار في موقعه
CREATE POLICY "Site owners can manage roles for their sites"
ON public.user_roles
FOR ALL
USING (
  public.has_role(auth.uid(), 'super_admin')
  OR (site_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.sites
    WHERE sites.id = user_roles.site_id
      AND sites.user_id = auth.uid()
  ))
)
WITH CHECK (
  public.has_role(auth.uid(), 'super_admin')
  OR (site_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.sites
    WHERE sites.id = user_roles.site_id
      AND sites.user_id = auth.uid()
  ))
);

-- ==============================================
-- RLS لجدول site_messages
-- ==============================================

-- القراءة: أي مستخدم عنده صلاحية وصول للموقع
CREATE POLICY "Users with site access can view messages"
ON public.site_messages
FOR SELECT
USING (
  public.has_role(auth.uid(), 'super_admin')
  OR public.has_site_access(auth.uid(), site_id)
);

-- الإدارة: Super Admin + Site Owner + Site Admin + Editor
CREATE POLICY "Users with editor+ access can manage messages"
ON public.site_messages
FOR ALL
USING (
  public.has_role(auth.uid(), 'super_admin')
  OR public.has_role(auth.uid(), 'site_owner', site_id)
  OR public.has_role(auth.uid(), 'site_admin', site_id)
  OR public.has_role(auth.uid(), 'editor', site_id)
)
WITH CHECK (
  public.has_role(auth.uid(), 'super_admin')
  OR public.has_role(auth.uid(), 'site_owner', site_id)
  OR public.has_role(auth.uid(), 'site_admin', site_id)
  OR public.has_role(auth.uid(), 'editor', site_id)
);

-- ==============================================
-- تحديث RLS لجدول contact (Super Admin inbox)
-- ==============================================

-- حذف السياسات القديمة
DROP POLICY IF EXISTS "Users can manage their own contact messages" ON public.contact;

-- Super Admin فقط يمكنه إدارة رسائل contact العامة
CREATE POLICY "Super admin can manage contact messages"
ON public.contact
FOR ALL
USING (public.has_role(auth.uid(), 'super_admin'))
WITH CHECK (public.has_role(auth.uid(), 'super_admin'));

-- الجميع يمكنهم إرسال رسائل contact (من Landing page)
CREATE POLICY "Anyone can send contact messages"
ON public.contact
FOR INSERT
WITH CHECK (true);

-- ==============================================
-- تحديث RLS لجدول sites
-- ==============================================

-- حذف السياسات القديمة
DROP POLICY IF EXISTS "Public read published sites" ON public.sites;
DROP POLICY IF EXISTS "sites_read_own" ON public.sites;
DROP POLICY IF EXISTS "sites_write_own" ON public.sites;

-- قراءة عامة للمواقع المنشورة أو للمستخدمين الذين لديهم صلاحية
CREATE POLICY "Public read published sites"
ON public.sites
FOR SELECT
USING (
  published = true 
  OR auth.uid() = user_id
  OR public.has_role(auth.uid(), 'super_admin')
  OR public.has_site_access(auth.uid(), id)
);

-- إدارة المواقع للمالكين والسوبر أدمن
CREATE POLICY "Site owners and super admin can manage sites"
ON public.sites
FOR ALL
USING (
  auth.uid() = user_id
  OR public.has_role(auth.uid(), 'super_admin')
  OR public.has_role(auth.uid(), 'site_owner', id)
  OR public.has_role(auth.uid(), 'site_admin', id)
)
WITH CHECK (
  auth.uid() = user_id
  OR public.has_role(auth.uid(), 'super_admin')
  OR public.has_role(auth.uid(), 'site_owner', id)
  OR public.has_role(auth.uid(), 'site_admin', id)
);

-- ==============================================
-- تحديث RLS لجدول site_pages
-- ==============================================

-- حذف السياسات القديمة
DROP POLICY IF EXISTS "Public read published site pages" ON public.site_pages;
DROP POLICY IF EXISTS "Users can manage their own site pages" ON public.site_pages;
DROP POLICY IF EXISTS "pages_read" ON public.site_pages;
DROP POLICY IF EXISTS "pages_write_own" ON public.site_pages;

-- قراءة عامة لصفحات المواقع المنشورة
CREATE POLICY "Public read published site pages"
ON public.site_pages
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.sites 
    WHERE sites.id = site_pages.site_id 
    AND (
      sites.published = true 
      OR sites.user_id = auth.uid()
      OR public.has_role(auth.uid(), 'super_admin')
      OR public.has_site_access(auth.uid(), sites.id)
    )
  )
);

-- إدارة صفحات المواقع
CREATE POLICY "Site users can manage site pages"
ON public.site_pages
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.sites 
    WHERE sites.id = site_pages.site_id 
    AND (
      sites.user_id = auth.uid()
      OR public.has_role(auth.uid(), 'super_admin')
      OR public.has_role(auth.uid(), 'site_owner', sites.id)
      OR public.has_role(auth.uid(), 'site_admin', sites.id)
      OR public.has_role(auth.uid(), 'editor', sites.id)
    )
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.sites 
    WHERE sites.id = site_pages.site_id 
    AND (
      sites.user_id = auth.uid()
      OR public.has_role(auth.uid(), 'super_admin')
      OR public.has_role(auth.uid(), 'site_owner', sites.id)
      OR public.has_role(auth.uid(), 'site_admin', sites.id)
      OR public.has_role(auth.uid(), 'editor', sites.id)
    )
  )
);