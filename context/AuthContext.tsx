import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

type Profile = Database['public']['Tables']['profiles']['Row'];

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  dob?: string | null;
  avatarUrl?: string | null;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string, phone?: string, dob?: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();
  const isMounted = useRef(true);
  const initialAuthCheckComplete = useRef(false);

  // Cache profile data to speed up subsequent loads
  const profileCache = useRef<Record<string, any>>({});

  useEffect(() => {
    isMounted.current = true;

    const fetchUserProfile = async (supabaseUserId: string) => {
      try {
        // Check cache first
        if (profileCache.current[supabaseUserId] && !isStale(profileCache.current[supabaseUserId].timestamp)) {
          if (isMounted.current) {
            setUser(profileCache.current[supabaseUserId].data);
          }
          return;
        }

        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', supabaseUserId)
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError.message);
          if (isMounted.current) setUser(null);
          return;
        }

        if (profileData && isMounted.current) {
          const userData = {
            id: profileData.id,
            firstName: profileData.first_name || '',
            lastName: profileData.last_name || '',
            email: profileData.email || '',
            phone: profileData.phone,
            dob: profileData.dob,
            avatarUrl: profileData.avatar_url,
          };

          // Cache the profile data
          profileCache.current[supabaseUserId] = {
            data: userData,
            timestamp: Date.now(),
          };

          setUser(userData);
        } else if (isMounted.current) {
          setUser(null);
        }
      } catch (error: any) {
        console.error('Exception fetching profile:', error.message);
        if (isMounted.current) setUser(null);
      }
    };

    const handleAuthSession = async (sessionUser: SupabaseUser | null) => {
      if (sessionUser && isMounted.current) {
        await fetchUserProfile(sessionUser.id);
      } else if (isMounted.current) {
        setUser(null);
      }
    };

    const initializeAuth = async () => {
      setIsLoading(true);
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) console.error("Error getting session:", sessionError.message);
        await handleAuthSession(session?.user ?? null);
      } catch (e: any) {
        console.error("Critical error in initializeAuth:", e.message);
        if (isMounted.current) setUser(null);
      } finally {
        if (isMounted.current) {
          setIsLoading(false);
          initialAuthCheckComplete.current = true;
        }
      }
    };

    initializeAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!isMounted.current) return;
        setIsLoading(true);
        await handleAuthSession(session?.user ?? null);
        if (isMounted.current) setIsLoading(false);
      }
    );

    return () => {
      isMounted.current = false;
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // Navigation effect with proper timing and path formats
  useEffect(() => {
    // Don't navigate if not ready yet
    if (isLoading || !initialAuthCheckComplete.current || !segments) {
      return;
    }

    const inAuthRouteGroup = segments[0] === 'auth';

    if (user && inAuthRouteGroup) {
      // Use leading slash for route paths
      router.replace('/(tabs)');
    } else if (!user && !inAuthRouteGroup) {
      router.replace('/auth/login');
    }
  }, [user, segments, isLoading, router]);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      // onAuthStateChange will handle setting user state
    } catch (error: any) {
      console.error('Sign In Error:', error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string, phone?: string, dob?: string) => {
    setIsLoading(true);
    try {
      // Split name into first name and last name
      const nameParts = name.trim().split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            phone,
            dob,
          },
        },
      });
      if (error) throw error;
      
      // Note: you may need additional logic here for profile creation
      // if Supabase doesn't automatically create one via triggers
    } catch (error: any) {
      console.error('Sign Up Error:', error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      console.error('Sign Out Error:', error.message);
      throw error;
    } finally {
      setIsLoading(false);
      // Force-set user to null on sign out regardless of success
      setUser(null);
    }
  };

  const resetPassword = async (email: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        // Use your app's actual URL scheme here:
        redirectTo: 'gigflex://reset-password',
      });
      if (error) throw error;
    } catch (error: any) {
      console.error('Reset Password Error:', error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (password: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
    } catch (error: any) {
      console.error('Update Password Error:', error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Helper function to check if cache is stale (older than 5 minutes)
const isStale = (timestamp: number) => {
  return Date.now() - timestamp > 5 * 60 * 1000;
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}