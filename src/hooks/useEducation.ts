import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { educationApi } from '@/lib/api/education';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';

type Education = Database['public']['Tables']['education']['Row'];
type EducationInsert = Database['public']['Tables']['education']['Insert'];
type EducationUpdate = Database['public']['Tables']['education']['Update'];

export const useEducation = {
  useCreateEducation: () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
      mutationFn: (education: Omit<EducationInsert, 'profile_id'>) => educationApi.createEducation(education),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['education'] });
        toast({ title: 'Education added successfully' });
      },
      onError: (error: Error) => {
        toast({ title: 'Error adding education', description: error.message, variant: 'destructive' });
      }
    });
  },

  useUserEducation: (profileId: string) => {
    return useQuery({
      queryKey: ['education', 'user', profileId],
      queryFn: () => educationApi.getUserEducation(profileId),
      enabled: !!profileId
    });
  },

  useUpdateEducation: () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
      mutationFn: ({ id, updates }: { id: string; updates: EducationUpdate }) => 
        educationApi.updateEducation(id, updates),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['education'] });
        toast({ title: 'Education updated successfully' });
      },
      onError: (error: Error) => {
        toast({ title: 'Error updating education', description: error.message, variant: 'destructive' });
      }
    });
  },

  useDeleteEducation: () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
      mutationFn: (id: string) => educationApi.deleteEducation(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['education'] });
        toast({ title: 'Education deleted successfully' });
      },
      onError: (error: Error) => {
        toast({ title: 'Error deleting education', description: error.message, variant: 'destructive' });
      }
    });
  }
};