import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Skill = Database['public']['Tables']['skills']['Row'];
type UserSkill = Database['public']['Tables']['user_skills']['Row'];

export const skillsApi = {
  async getAllSkills(): Promise<Skill[]> {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('name');

    if (error) throw error;
    return data;
  },

  async getUserSkills(profileId: string): Promise<(UserSkill & { skill: Skill })[]> {
    const { data, error } = await supabase
      .from('user_skills')
      .select(`
        *,
        skill:skills(*)
      `)
      .eq('user_id', profileId);

    if (error) throw error;
    return data as (UserSkill & { skill: Skill })[];
  },

  async addUserSkill(skillId: string, level?: number): Promise<UserSkill> {
    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('clerk_id', (await supabase.auth.getUser()).data.user?.id!)
      .single();

    if (!profile) throw new Error('Profile not found');

    const { data, error } = await supabase
      .from('user_skills')
      .insert({
        user_id: profile.id,
        skill_id: skillId,
        level: level || 3
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateUserSkill(profileId: string, skillId: string, level: number): Promise<UserSkill> {
    const { data, error } = await supabase
      .from('user_skills')
      .update({ level })
      .eq('user_id', profileId)
      .eq('skill_id', skillId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async removeUserSkill(profileId: string, skillId: string): Promise<void> {
    const { error } = await supabase
      .from('user_skills')
      .delete()
      .eq('user_id', profileId)
      .eq('skill_id', skillId);

    if (error) throw error;
  }
};