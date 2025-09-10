import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contactApi } from '@/lib/api/contact';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';

type Contact = Database['public']['Tables']['contact']['Row'];
type ContactUpdate = Database['public']['Tables']['contact']['Update'];

export const useContact = {
  useSendMessage: () => {
    const { toast } = useToast();

    return useMutation({
      mutationFn: (message: {
        name: string;
        email: string;
        subject?: string;
        message: string;
        profileId: string;
      }) => contactApi.sendMessage(message),
      onSuccess: () => {
        toast({ title: 'Message sent successfully' });
      },
      onError: (error: Error) => {
        toast({ title: 'Error sending message', description: error.message, variant: 'destructive' });
      }
    });
  },

  useUserMessages: (profileId: string) => {
    return useQuery({
      queryKey: ['contact', 'user', profileId],
      queryFn: () => contactApi.getUserMessages(profileId),
      enabled: !!profileId
    });
  },

  useUpdateMessage: () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
      mutationFn: ({ id, updates }: { id: string; updates: ContactUpdate }) => 
        contactApi.updateMessage(id, updates),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['contact'] });
        toast({ title: 'Message updated successfully' });
      },
      onError: (error: Error) => {
        toast({ title: 'Error updating message', description: error.message, variant: 'destructive' });
      }
    });
  },

  useMarkAsRead: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (id: string) => contactApi.markAsRead(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['contact'] });
      }
    });
  },

  useMarkAsStarred: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ id, starred }: { id: string; starred: boolean }) => 
        contactApi.markAsStarred(id, starred),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['contact'] });
      }
    });
  },

  useDeleteMessage: () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
      mutationFn: (id: string) => contactApi.deleteMessage(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['contact'] });
        toast({ title: 'Message deleted successfully' });
      },
      onError: (error: Error) => {
        toast({ title: 'Error deleting message', description: error.message, variant: 'destructive' });
      }
    });
  }
};