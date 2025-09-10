import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Contact = Database['public']['Tables']['contact']['Row'];
type ContactInsert = Database['public']['Tables']['contact']['Insert'];
type ContactUpdate = Database['public']['Tables']['contact']['Update'];

export const contactApi = {
  async sendMessage(message: {
    name: string;
    email: string;
    subject?: string;
    message: string;
    profileId: string;
  }): Promise<Contact> {
    const { data, error } = await supabase
      .from('contact')
      .insert({
        name: message.name,
        email: message.email,
        subject: message.subject,
        message: message.message,
        profile_id: message.profileId
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getUserMessages(profileId: string): Promise<Contact[]> {
    const { data, error } = await supabase
      .from('contact')
      .select('*')
      .eq('profile_id', profileId)
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async updateMessage(id: string, updates: ContactUpdate): Promise<Contact> {
    const { data, error } = await supabase
      .from('contact')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async markAsRead(id: string): Promise<Contact> {
    return this.updateMessage(id, { is_read: true });
  },

  async markAsStarred(id: string, starred: boolean): Promise<Contact> {
    return this.updateMessage(id, { is_starred: starred });
  },

  async deleteMessage(id: string): Promise<void> {
    const { error } = await supabase
      .from('contact')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};