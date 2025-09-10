import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Education = Database['public']['Tables']['education']['Row'];
type EducationInsert = Database['public']['Tables']['education']['Insert'];
type EducationUpdate = Database['public']['Tables']['education']['Update'];

export const educationApi = {
  async createEducation(education: any): Promise<Education> {
    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('clerk_id', (await supabase.auth.getUser()).data.user?.id!)
      .single();

    if (!profile) throw new Error('Profile not found');

    const { data, error } = await supabase
      .from('education')
      .insert({ ...education, profile_id: profile.id })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getUserEducation(profileId: string): Promise<Education[]> {
    const { data, error } = await supabase
      .from('education')
      .select('*')
      .eq('profile_id', profileId)
      .order('start_date', { ascending: false });

    if (error) throw error;
    return data;
  },

  async updateEducation(id: string, updates: EducationUpdate): Promise<Education> {
    const { data, error } = await supabase
      .from('education')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteEducation(id: string): Promise<void> {
    const { error } = await supabase
      .from('education')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};