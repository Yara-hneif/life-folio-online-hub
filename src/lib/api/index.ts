// Simplified API with basic types to avoid TypeScript depth issues
import { supabase } from '@/integrations/supabase/client';

// Generic API functions with simplified types
export const api = {
  blogs: {
    create: async (data: any) => {
      const { data: profile } = await supabase.from('profiles').select('id').eq('clerk_id', (await supabase.auth.getUser()).data.user?.id!).single();
      return supabase.from('blogs').insert({ ...data, profile_id: profile.id }).select().single();
    },
    getByProfile: (profileId: string) => supabase.from('blogs').select('*').eq('profile_id', profileId).order('created_at', { ascending: false }),
    getPublic: () => supabase.from('blogs').select('*').eq('published', true).order('created_at', { ascending: false }),
    update: (id: string, data: any) => supabase.from('blogs').update(data).eq('id', id).select().single(),
    delete: (id: string) => supabase.from('blogs').delete().eq('id', id)
  },

  projects: {
    create: async (data: any) => {
      const { data: profile } = await supabase.from('profiles').select('id').eq('clerk_id', (await supabase.auth.getUser()).data.user?.id!).single();
      return supabase.from('projects').insert({ ...data, profile_id: profile.id }).select().single();
    },
    getByProfile: (profileId: string) => supabase.from('projects').select('*').eq('profile_id', profileId).order('created_at', { ascending: false }),
    getPublic: () => supabase.from('projects').select('*').eq('published', true).order('created_at', { ascending: false }),
    update: (id: string, data: any) => supabase.from('projects').update(data).eq('id', id).select().single(),
    delete: (id: string) => supabase.from('projects').delete().eq('id', id)
  },

  contact: {
    send: (data: any) => supabase.from('contact').insert(data).select().single(),
    getByProfile: (profileId: string) => supabase.from('contact').select('*').eq('profile_id', profileId).order('updated_at', { ascending: false }),
    update: (id: string, data: any) => supabase.from('contact').update(data).eq('id', id).select().single()
  },

  profiles: {
    getByUsername: (username: string) => supabase.from('profiles').select('*').eq('username', username).single(),
    getCurrent: async () => {
      const user = await supabase.auth.getUser();
      if (!user.data.user) return { data: null, error: null };
      return supabase.from('profiles').select('*').eq('clerk_id', user.data.user.id).single();
    },
    update: async (data: any) => {
      const user = await supabase.auth.getUser();
      return supabase.from('profiles').update(data).eq('clerk_id', user.data.user?.id!).select().single();
    }
  }
};