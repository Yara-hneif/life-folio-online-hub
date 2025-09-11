import { supabase } from '@/integrations/supabase/client';

interface Project {
  id: string;
  profile_id?: string;
  user_id: string;
  title: string;
  description?: string;
  slug: string;
  published?: boolean;
  is_public?: boolean;
  category?: string;
  image_url?: string;
  tags?: string[];
  collaborators?: any;
  live_url?: string;
  repo_url?: string;
  status?: string;
  created_at: string;
  updated_at?: string;
}

interface ProjectInsert {
  profile_id?: string;
  user_id?: string;
  title: string;
  description?: string;
  slug: string;
  published?: boolean;
  is_public?: boolean;
  category?: string;
  image_url?: string;
  tags?: string[];
  collaborators?: any;
  live_url?: string;
  repo_url?: string;
  status?: string;
}

interface ProjectUpdate {
  title?: string;
  description?: string;
  slug?: string;
  published?: boolean;
  is_public?: boolean;
  category?: string;
  image_url?: string;
  tags?: string[];
  collaborators?: any;
  live_url?: string;
  repo_url?: string;
  status?: string;
}

export const projectsApi = {
  async createProject(project: ProjectInsert): Promise<any> {
    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getUserProjects(profileId: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('profile_id', profileId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as any[] || [];
  },

  async getPublicProjects(): Promise<any[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as any[] || [];
  },

  async updateProject(id: string, updates: ProjectUpdate): Promise<any> {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteProject(id: string): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async getProjectBySlug(slug: string): Promise<any | null> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }
};