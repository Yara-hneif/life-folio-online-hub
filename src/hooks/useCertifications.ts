import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { certificationsApi } from '@/lib/api/certifications';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';

type Certification = Database['public']['Tables']['certifications']['Row'];
type CertificationInsert = Database['public']['Tables']['certifications']['Insert'];
type CertificationUpdate = Database['public']['Tables']['certifications']['Update'];

export const useCertifications = {
  useCreateCertification: () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
      mutationFn: (certification: Omit<CertificationInsert, 'profile_id'>) => certificationsApi.createCertification(certification),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['certifications'] });
        toast({ title: 'Certification added successfully' });
      },
      onError: (error: Error) => {
        toast({ title: 'Error adding certification', description: error.message, variant: 'destructive' });
      }
    });
  },

  useUserCertifications: (profileId: string) => {
    return useQuery({
      queryKey: ['certifications', 'user', profileId],
      queryFn: () => certificationsApi.getUserCertifications(profileId),
      enabled: !!profileId
    });
  },

  useUpdateCertification: () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
      mutationFn: ({ id, updates }: { id: string; updates: CertificationUpdate }) => 
        certificationsApi.updateCertification(id, updates),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['certifications'] });
        toast({ title: 'Certification updated successfully' });
      },
      onError: (error: Error) => {
        toast({ title: 'Error updating certification', description: error.message, variant: 'destructive' });
      }
    });
  },

  useDeleteCertification: () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
      mutationFn: (id: string) => certificationsApi.deleteCertification(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['certifications'] });
        toast({ title: 'Certification deleted successfully' });
      },
      onError: (error: Error) => {
        toast({ title: 'Error deleting certification', description: error.message, variant: 'destructive' });
      }
    });
  }
};