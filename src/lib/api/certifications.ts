import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Certification = Database['public']['Tables']['certifications']['Row'];
type CertificationInsert = Database['public']['Tables']['certifications']['Insert'];
type CertificationUpdate = Database['public']['Tables']['certifications']['Update'];

export const certificationsApi = {
  async createCertification(certification: any): Promise<Certification> {
    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('clerk_id', (await supabase.auth.getUser()).data.user?.id!)
      .single();

    if (!profile) throw new Error('Profile not found');

    const { data, error } = await supabase
      .from('certifications')
      .insert({ ...certification, profile_id: profile.id })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getUserCertifications(profileId: string): Promise<Certification[]> {
    const { data, error } = await supabase
      .from('certifications')
      .select('*')
      .eq('profile_id', profileId)
      .order('issue_date', { ascending: false });

    if (error) throw error;
    return data;
  },

  async updateCertification(id: string, updates: CertificationUpdate): Promise<Certification> {
    const { data, error } = await supabase
      .from('certifications')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteCertification(id: string): Promise<void> {
    const { error } = await supabase
      .from('certifications')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};