import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sitesApi } from '@/lib/api/sites';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';

type Site = Database['public']['Tables']['sites']['Row'];
type SiteInsert = Database['public']['Tables']['sites']['Insert'];
type SiteUpdate = Database['public']['Tables']['sites']['Update'];

export const useSites = {
  useCreateSite: () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
      mutationFn: (site: Omit<SiteInsert, 'profile_id'>) => sitesApi.createSite(site),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['sites'] });
        toast({ title: 'Site created successfully' });
      },
      onError: (error: Error) => {
        toast({ title: 'Error creating site', description: error.message, variant: 'destructive' });
      }
    });
  },

  useUserSites: (profileId: string) => {
    return useQuery({
      queryKey: ['sites', 'user', profileId],
      queryFn: () => sitesApi.getUserSites(profileId),
      enabled: !!profileId
    });
  },

  usePublicSites: () => {
    return useQuery({
      queryKey: ['sites', 'public'],
      queryFn: () => sitesApi.getPublicSites()
    });
  },

  useUpdateSite: () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
      mutationFn: ({ id, updates }: { id: string; updates: SiteUpdate }) => 
        sitesApi.updateSite(id, updates),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['sites'] });
        toast({ title: 'Site updated successfully' });
      },
      onError: (error: Error) => {
        toast({ title: 'Error updating site', description: error.message, variant: 'destructive' });
      }
    });
  },

  useDeleteSite: () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
      mutationFn: (id: string) => sitesApi.deleteSite(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['sites'] });
        toast({ title: 'Site deleted successfully' });
      },
      onError: (error: Error) => {
        toast({ title: 'Error deleting site', description: error.message, variant: 'destructive' });
      }
    });
  },

  useSiteBySlug: (slug: string) => {
    return useQuery({
      queryKey: ['sites', 'slug', slug],
      queryFn: () => sitesApi.getSiteBySlug(slug),
      enabled: !!slug
    });
  }
};