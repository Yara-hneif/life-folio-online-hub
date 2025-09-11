import { supabase } from '@/integrations/supabase/client';

interface Blog {
  id: string;
  profile_id?: string;
  user_id: string;
  title: string;
  content_markdown?: string;
  slug: string;
  published?: boolean;
  is_public?: boolean;
  created_at: string;
  updated_at?: string;
}

interface BlogInsert {
  profile_id?: string;
  user_id?: string;
  title: string;
  content_markdown?: string;
  slug: string;
  published?: boolean;
  is_public?: boolean;
}

interface BlogUpdate {
  title?: string;
  content_markdown?: string;
  slug?: string;
  published?: boolean;
  is_public?: boolean;
}

export const blogsApi = {
  async createBlog(blog: BlogInsert): Promise<any> {
    const { data, error } = await supabase
      .from('blogs')
      .insert(blog)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getUserBlogs(profileId: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('profile_id', profileId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as any[] || [];
  },

  async getPublicBlogs(): Promise<any[]> {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as any[] || [];
  },

  async updateBlog(id: string, updates: BlogUpdate): Promise<any> {
    const { data, error } = await supabase
      .from('blogs')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteBlog(id: string): Promise<void> {
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async getBlogBySlug(slug: string): Promise<any | null> {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }
};