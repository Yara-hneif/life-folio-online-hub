import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Blog = Database['public']['Tables']['blogs']['Row'];
type BlogInsert = Database['public']['Tables']['blogs']['Insert'];
type BlogUpdate = Database['public']['Tables']['blogs']['Update'];

export const blogsApi = {
  async createBlog(blog: any): Promise<Blog> {
    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('clerk_id', (await supabase.auth.getUser()).data.user?.id!)
      .single();

    if (!profile) throw new Error('Profile not found');

    const { data, error } = await supabase
      .from('blogs')
      .insert({ ...blog, profile_id: profile.id })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getUserBlogs(profileId: string): Promise<Blog[]> {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('profile_id', profileId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getPublicBlogs(): Promise<Blog[]> {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async updateBlog(id: string, updates: BlogUpdate): Promise<Blog> {
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

  async getBlogBySlug(slug: string): Promise<Blog | null> {
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