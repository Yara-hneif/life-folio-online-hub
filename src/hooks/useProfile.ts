import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profilesApi } from '@/lib/api/profiles';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];
type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export const useProfile = {
  useProfileByUsername: (username: string) => {
    return useQuery({
      queryKey: ['profiles', 'username', username],
      queryFn: () => profilesApi.getProfileByUsername(username),
      enabled: !!username
    });
  },

  useProfileById: (id: string) => {
    return useQuery({
      queryKey: ['profiles', 'id', id],
      queryFn: () => profilesApi.getProfileById(id),
      enabled: !!id
    });
  },

  useCurrentProfile: () => {
    return useQuery({
      queryKey: ['profiles', 'current'],
      queryFn: () => profilesApi.getCurrentProfile()
    });
  },

  useUpdateProfile: () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
      mutationFn: (updates: ProfileUpdate) => profilesApi.updateProfile(updates),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['profiles'] });
        toast({ title: 'Profile updated successfully' });
      },
      onError: (error: Error) => {
        toast({ title: 'Error updating profile', description: error.message, variant: 'destructive' });
      }
    });
  }
};