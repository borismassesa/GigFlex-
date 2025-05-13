import React, { createContext, useContext, useState, useEffect, memo } from 'react';
import { useRouter, useSegments, Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { View, Text, TouchableOpacity } from 'react-native';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync().catch(() => {
  /* ignore error */
});

// Memoize any complex components if needed
const MemoizedStatusBar = memo(function MemoStatusBar() {
  return <StatusBar style="auto" />;
});

// User type definition
type User = {
  id: string;
  name: string;
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
        name: 'Test User',
        email,
      });
      console.log('Successfully signed in:', email);
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
      const newUserId = 'user_' + Math.random().toString(36).substring(2, 9);
      setUser({
        id: newUserId,
        name,
        email,
        phone,
        dob,
      });
      console.log('Successfully registered:', { name, email, phone, dob });
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

  // Fixed navigation effect to prevent loops
  useEffect(() => {
    if (!segments) return;
    
    const inAuthGroup = segments[0] === 'auth';
    
    if (user && inAuthGroup) {
      console.log('User authenticated, redirecting to home');
      router.replace('/(app)'); // or just '/' if your home is at root
    } else if (!user && !inAuthGroup && segments.length > 0) {
      console.log('Not authenticated, redirecting to login');
      router.replace('auth/login'); // Remove leading slash
    }
  }, [user, segments, router]);

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

const ThemeContext = createContext(undefined);
const SettingsContext = createContext(undefined);

export default function RootLayout() {
  useEffect(() => {
    // Hide splash screen
    const hideSplash = async () => {
      // Small timeout to ensure everything is ready
      await new Promise((resolve) => setTimeout(resolve, 100));
      await SplashScreen.hideAsync();
    };

    hideSplash();
  }, []);

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ThemeContext.Provider value={undefined}>
          <SettingsContext.Provider value={undefined}>
            <MemoizedStatusBar />
            <Slot />
          </SettingsContext.Provider>
        </ThemeContext.Provider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}