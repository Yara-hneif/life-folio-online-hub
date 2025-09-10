import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectsApi } from '@/lib/api/projects';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';

type Project = Database['public']['Tables']['projects']['Row'];
type ProjectInsert = Database['public']['Tables']['projects']['Insert'];
type ProjectUpdate = Database['public']['Tables']['projects']['Update'];

export const useProjects = {
  useCreateProject: () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
      mutationFn: (project: Omit<ProjectInsert, 'profile_id'>) => projectsApi.createProject(project),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['projects'] });
        toast({ title: 'Project created successfully' });
      },
      onError: (error: Error) => {
        toast({ title: 'Error creating project', description: error.message, variant: 'destructive' });
      }
    });
  },

  useUserProjects: (profileId: string) => {
    return useQuery({
      queryKey: ['projects', 'user', profileId],
      queryFn: () => projectsApi.getUserProjects(profileId),
      enabled: !!profileId
    });
  },

  usePublicProjects: () => {
    return useQuery({
      queryKey: ['projects', 'public'],
      queryFn: () => projectsApi.getPublicProjects()
    });
  },

  useUpdateProject: () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
      mutationFn: ({ id, updates }: { id: string; updates: ProjectUpdate }) => 
        projectsApi.updateProject(id, updates),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['projects'] });
        toast({ title: 'Project updated successfully' });
      },
      onError: (error: Error) => {
        toast({ title: 'Error updating project', description: error.message, variant: 'destructive' });
      }
    });
  },

  useDeleteProject: () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
      mutationFn: (id: string) => projectsApi.deleteProject(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['projects'] });
        toast({ title: 'Project deleted successfully' });
      },
      onError: (error: Error) => {
        toast({ title: 'Error deleting project', description: error.message, variant: 'destructive' });
      }
    });
  },

  useProjectBySlug: (slug: string) => {
    return useQuery({
      queryKey: ['projects', 'slug', slug],
      queryFn: () => projectsApi.getProjectBySlug(slug),
      enabled: !!slug
    });
  }
};