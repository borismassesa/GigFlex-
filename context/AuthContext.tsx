import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

// User type definition
type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dob?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string, phone?: string, dob?: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const segments = useSegments();
  const isReady = useFrameworkReady();

  // Improved signIn function with better error handling
  const signIn = async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    
    setIsLoading(true);
    try {
      // For demo purposes
      setUser({
        id: '123',
        firstName: 'John',
        lastName: 'Doe',
        email,
      });
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Improved signUp with validation
  const signUp = async (name: string, email: string, password: string, phone?: string, dob?: string) => {
    if (!name || !email || !password) {
      throw new Error('Name, email, and password are required');
    }
    
    setIsLoading(true);
    try {
      // For demo purposes
      const [firstName, ...lastNameParts] = name.split(' ');
      const lastName = lastNameParts.join(' ');
      
      const newUserId = 'user_' + Math.random().toString(36).substring(2, 9);
      setUser({
        id: newUserId,
        firstName,
        lastName,
        email,
        phone,
        dob,
      });
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
  };

  // Fixed navigation effect to prevent navigation before framework is ready
  useEffect(() => {
    if (!isReady || !segments) return;
    
    const inAuthGroup = segments[0] === 'auth';
    
    if (user && inAuthGroup) {
      router.replace('/(tabs)');
    } else if (!user && !inAuthGroup && segments.length > 0) {
      router.replace('/auth/login');
    }
  }, [user, segments, isReady]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}