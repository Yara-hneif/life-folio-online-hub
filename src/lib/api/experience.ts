import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Experience = Database['public']['Tables']['experience']['Row'];
type ExperienceInsert = Database['public']['Tables']['experience']['Insert'];
type ExperienceUpdate = Database['public']['Tables']['experience']['Update'];

export const experienceApi = {
  async createExperience(experience: any): Promise<Experience> {
    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('clerk_id', (await supabase.auth.getUser()).data.user?.id!)
      .single();

    if (!profile) throw new Error('Profile not found');

    const { data, error } = await supabase
      .from('experience')
      .insert({ ...experience, profile_id: profile.id })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getUserExperience(profileId: string): Promise<Experience[]> {
    const { data, error } = await supabase
      .from('experience')
      .select('*')
      .eq('profile_id', profileId)
      .order('start_date', { ascending: false });

    if (error) throw error;
    return data;
  },

  async updateExperience(id: string, updates: ExperienceUpdate): Promise<Experience> {
    const { data, error } = await supabase
      .from('experience')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteExperience(id: string): Promise<void> {
    const { error } = await supabase
      .from('experience')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};