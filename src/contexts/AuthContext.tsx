import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser, useAuth as useClerkAuth, useSignIn, useSignUp } from '@clerk/clerk-react';
import { supabase } from '@/integrations/supabase/client';

interface User {
  id: string;
  clerkId: string;
  username: string;
  email: string;
  name: string;
  bio?: string;
  avatar?: string;
  skills?: string[];
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ status: string; error?: string }>;
  register: (userData: RegisterData) => Promise<{ status: string; error?: string }>;
  loginWithProvider: (provider: 'oauth_google' | 'oauth_github' | 'oauth_facebook' | 'oauth_linkedin_oidc') => Promise<void>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  loading: boolean;
  isAuthenticated: boolean;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  name: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to sync user data to Supabase
const syncUserToSupabase = async (clerkUser: any) => {
  try {
    const userData = {
      id: clerkUser.id,
      clerk_id: clerkUser.id,
      email: clerkUser.emailAddresses[0]?.emailAddress,
      name: clerkUser.fullName || clerkUser.firstName + ' ' + clerkUser.lastName,
      username: clerkUser.username || clerkUser.emailAddresses[0]?.emailAddress?.split('@')[0],
      avatar: clerkUser.imageUrl,
      bio: clerkUser.publicMetadata?.bio || '',
      social_links: clerkUser.publicMetadata?.socialLinks || {},
      skills: clerkUser.publicMetadata?.skills || []
    };

    const { error } = await supabase
      .from('profiles')
      .upsert(userData, { onConflict: 'clerk_id' });

    if (error) {
      console.error('Error syncing user to Supabase:', error);
    }
  } catch (error) {
    console.error('Error in syncUserToSupabase:', error);
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user: clerkUser, isLoaded } = useUser();
  const { getToken, signOut } = useClerkAuth();
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Set up Supabase with Clerk JWT
  useEffect(() => {
    const setupSupabaseAuth = async () => {
      if (clerkUser) {
        try {
          const token = await getToken({ template: 'supabase' });
          if (token) {
            await supabase.auth.setSession({
              access_token: token,
              refresh_token: '',
            });
            
            // Sync user data to Supabase
            await syncUserToSupabase(clerkUser);
            
            // Fetch user profile from Supabase
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('clerk_id', clerkUser.id)
              .single();

            if (profile) {
              setUser({
                id: profile.id,
                clerkId: profile.clerk_id,
                username: profile.username,
                email: profile.email,
                name: profile.name,
                bio: profile.bio,
                avatar: profile.avatar,
                skills: profile.skills,
                socialLinks: profile.social_links as { github?: string; linkedin?: string; twitter?: string; website?: string; }
              });
            }
          }
        } catch (error) {
          console.error('Error setting up Supabase auth:', error);
        }
      } else {
        // Clear Supabase session when user logs out
        await supabase.auth.signOut();
        setUser(null);
      }
      setLoading(false);
    };

    if (isLoaded) {
      setupSupabaseAuth();
    }
  }, [clerkUser, isLoaded, getToken]);

  const login = async (email: string, password: string) => {
    if (!signIn) return { status: 'error', error: 'Sign in not available' };
    
    try {
      setLoading(true);
      const result = await signIn.create({
        identifier: email,
        password: password,
      });

      if (result.status === 'complete') {
        return { status: 'complete' };
      } else if (result.status === 'needs_first_factor') {
        return { status: 'needs_verification' };
      } else {
        return { status: 'error', error: 'Login failed' };
      }
    } catch (error: any) {
      return { status: 'error', error: error.errors?.[0]?.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    if (!signUp) return { status: 'error', error: 'Sign up not available' };

    try {
      setLoading(true);
      const result = await signUp.create({
        emailAddress: userData.email,
        password: userData.password,
        firstName: userData.name.split(' ')[0],
        lastName: userData.name.split(' ').slice(1).join(' '),
        username: userData.username,
      });

      if (result.status === 'complete') {
        return { status: 'complete' };
      } else if (result.status === 'missing_requirements') {
        // Send verification email
        await signUp.prepareEmailAddressVerification();
        return { status: 'needs_verification' };
      } else {
        return { status: 'error', error: 'Registration failed' };
      }
    } catch (error: any) {
      return { status: 'error', error: error.errors?.[0]?.message || 'Registration failed' };
    } finally {
      setLoading(false);
    }
  };

  const loginWithProvider = async (provider: 'oauth_google' | 'oauth_github' | 'oauth_facebook' | 'oauth_linkedin_oidc') => {
    if (!signIn) throw new Error('Sign in not available');
    
    try {
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: '/dashboard',
        redirectUrlComplete: '/dashboard'
      });
    } catch (error: any) {
      throw new Error(error.errors?.[0]?.message || 'Social login failed');
    }
  };

  const logout = async () => {
    try {
      await signOut();
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const deleteAccount = async () => {
    try {
      // Delete from Supabase first
      if (user) {
        await supabase.from('profiles').delete().eq('clerk_id', user.clerkId);
      }
      
      // Delete from Clerk
      await clerkUser?.delete();
      setUser(null);
    } catch (error) {
      console.error('Error deleting account:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    loginWithProvider,
    logout,
    deleteAccount,
    loading: loading || !isLoaded,
    isAuthenticated: !!clerkUser && !!user
  };

  return (
    <AuthContext.Provider value={value}>
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

