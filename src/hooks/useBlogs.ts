import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { blogsApi } from '@/lib/api/blogs';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';

type Blog = Database['public']['Tables']['blogs']['Row'];
type BlogInsert = Database['public']['Tables']['blogs']['Insert'];
type BlogUpdate = Database['public']['Tables']['blogs']['Update'];

export const useBlogs = {
  useCreateBlog: () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
      mutationFn: (blog: Omit<BlogInsert, 'profile_id'>) => blogsApi.createBlog(blog),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['blogs'] });
        toast({ title: 'Blog created successfully' });
      },
      onError: (error: Error) => {
        toast({ title: 'Error creating blog', description: error.message, variant: 'destructive' });
      }
    });
  },

  useUserBlogs: (profileId: string) => {
    return useQuery({
      queryKey: ['blogs', 'user', profileId],
      queryFn: () => blogsApi.getUserBlogs(profileId),
      enabled: !!profileId
    });
  },

  usePublicBlogs: () => {
    return useQuery({
      queryKey: ['blogs', 'public'],
      queryFn: () => blogsApi.getPublicBlogs()
    });
  },

  useUpdateBlog: () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
      mutationFn: ({ id, updates }: { id: string; updates: BlogUpdate }) => 
        blogsApi.updateBlog(id, updates),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['blogs'] });
        toast({ title: 'Blog updated successfully' });
      },
      onError: (error: Error) => {
        toast({ title: 'Error updating blog', description: error.message, variant: 'destructive' });
      }
    });
  },

  useDeleteBlog: () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
      mutationFn: (id: string) => blogsApi.deleteBlog(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['blogs'] });
        toast({ title: 'Blog deleted successfully' });
      },
      onError: (error: Error) => {
        toast({ title: 'Error deleting blog', description: error.message, variant: 'destructive' });
      }
    });
  },

  useBlogBySlug: (slug: string) => {
    return useQuery({
      queryKey: ['blogs', 'slug', slug],
      queryFn: () => blogsApi.getBlogBySlug(slug),
      enabled: !!slug
    });
  }
};