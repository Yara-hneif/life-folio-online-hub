import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Site = Database['public']['Tables']['sites']['Row'];
type SiteInsert = Database['public']['Tables']['sites']['Insert'];
type SiteUpdate = Database['public']['Tables']['sites']['Update'];

export const sitesApi = {
  async createSite(site: Omit<SiteInsert, 'profile_id'>): Promise<Site> {
    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('clerk_id', (await supabase.auth.getUser()).data.user?.id!)
      .single();

    if (!profile) throw new Error('Profile not found');

    const { data, error } = await supabase
      .from('sites')
      .insert({ ...site, profile_id: profile.id })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getUserSites(profileId: string): Promise<Site[]> {
    const { data, error } = await supabase
      .from('sites')
      .select('*')
      .eq('profile_id', profileId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getPublicSites(): Promise<Site[]> {
    const { data, error } = await supabase
      .from('sites')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async updateSite(id: string, updates: SiteUpdate): Promise<Site> {
    const { data, error } = await supabase
      .from('sites')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteSite(id: string): Promise<void> {
    const { error } = await supabase
      .from('sites')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async getSiteBySlug(slug: string): Promise<Site | null> {
    const { data, error } = await supabase
      .from('sites')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }
};