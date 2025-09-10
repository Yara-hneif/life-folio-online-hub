import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { skillsApi } from '@/lib/api/skills';
import { useToast } from '@/hooks/use-toast';

export const useSkills = {
  useAllSkills: () => {
    return useQuery({
      queryKey: ['skills', 'all'],
      queryFn: () => skillsApi.getAllSkills()
    });
  },

  useUserSkills: (profileId: string) => {
    return useQuery({
      queryKey: ['skills', 'user', profileId],
      queryFn: () => skillsApi.getUserSkills(profileId),
      enabled: !!profileId
    });
  },

  useAddUserSkill: () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
      mutationFn: ({ skillId, level }: { skillId: string; level?: number }) => 
        skillsApi.addUserSkill(skillId, level),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['skills', 'user'] });
        toast({ title: 'Skill added successfully' });
      },
      onError: (error: Error) => {
        toast({ title: 'Error adding skill', description: error.message, variant: 'destructive' });
      }
    });
  },

  useUpdateUserSkill: () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
      mutationFn: ({ profileId, skillId, level }: { profileId: string; skillId: string; level: number }) => 
        skillsApi.updateUserSkill(profileId, skillId, level),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['skills', 'user'] });
        toast({ title: 'Skill updated successfully' });
      },
      onError: (error: Error) => {
        toast({ title: 'Error updating skill', description: error.message, variant: 'destructive' });
      }
    });
  },

  useRemoveUserSkill: () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
      mutationFn: ({ profileId, skillId }: { profileId: string; skillId: string }) => 
        skillsApi.removeUserSkill(profileId, skillId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['skills', 'user'] });
        toast({ title: 'Skill removed successfully' });
      },
      onError: (error: Error) => {
        toast({ title: 'Error removing skill', description: error.message, variant: 'destructive' });
      }
    });
  }
};