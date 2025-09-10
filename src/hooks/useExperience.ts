import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { experienceApi } from '@/lib/api/experience';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';

type Experience = Database['public']['Tables']['experience']['Row'];
type ExperienceInsert = Database['public']['Tables']['experience']['Insert'];
type ExperienceUpdate = Database['public']['Tables']['experience']['Update'];

export const useExperience = {
  useCreateExperience: () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
      mutationFn: (experience: Omit<ExperienceInsert, 'profile_id'>) => experienceApi.createExperience(experience),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['experience'] });
        toast({ title: 'Experience added successfully' });
      },
      onError: (error: Error) => {
        toast({ title: 'Error adding experience', description: error.message, variant: 'destructive' });
      }
    });
  },

  useUserExperience: (profileId: string) => {
    return useQuery({
      queryKey: ['experience', 'user', profileId],
      queryFn: () => experienceApi.getUserExperience(profileId),
      enabled: !!profileId
    });
  },

  useUpdateExperience: () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
      mutationFn: ({ id, updates }: { id: string; updates: ExperienceUpdate }) => 
        experienceApi.updateExperience(id, updates),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['experience'] });
        toast({ title: 'Experience updated successfully' });
      },
      onError: (error: Error) => {
        toast({ title: 'Error updating experience', description: error.message, variant: 'destructive' });
      }
    });
  },

  useDeleteExperience: () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
      mutationFn: (id: string) => experienceApi.deleteExperience(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['experience'] });
        toast({ title: 'Experience deleted successfully' });
      },
      onError: (error: Error) => {
        toast({ title: 'Error deleting experience', description: error.message, variant: 'destructive' });
      }
    });
  }
};