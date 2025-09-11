import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData?: any) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithProvider: (provider: 'google' | 'github') => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user && event === 'SIGNED_IN') {
          setTimeout(async () => {
            await syncUserProfile(session.user);
          }, 0);
        }
        
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const syncUserProfile = async (user: User) => {
    try {
      const username = user.email?.split('@')[0] || 'user';
      const name = user.user_metadata?.name || user.user_metadata?.full_name || username;
      const avatar = user.user_metadata?.avatar_url || user.user_metadata?.picture || '';

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          email: user.email,
          username,
          name,
          avatar,
          bio: '',
          social_links: {},
          skills: []
        }, {
          onConflict: 'id'
        });

      if (error) {
        console.error('Error syncing profile:', error);
      }
    } catch (error) {
      console.error('Error in syncUserProfile:', error);
    }
  };

  const signUp = async (email: string, password: string, userData?: any) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: userData
      }
    });

    if (error) {
      toast({
        title: 'Sign up failed',
        description: error.message,
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Check your email',
        description: 'We sent you a confirmation link'
      });
    }

    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      toast({
        title: 'Sign in failed',
        description: error.message,
        variant: 'destructive'
      });
    }

    return { error };
  };

  const signInWithProvider = async (provider: 'google' | 'github') => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: redirectUrl
      }
    });

    if (error) {
      toast({
        title: 'Sign in failed',
        description: error.message,
        variant: 'destructive'
      });
    }

    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: 'Sign out failed',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signUp,
      signIn,
      signInWithProvider,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};