import React, { useEffect, useState } from 'react';
import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

// Prevent the splash screen from auto-hiding but with proper error handling
try {
  SplashScreen.preventAutoHideAsync();
} catch (e) {
  console.log('Error preventing splash screen auto hide:', e);
}

export default function RootLayout() {
  useFrameworkReady();
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Hide splash screen with better reliability
    const hideSplash = async () => {
      try {
        // Ensure the component is mounted before hiding splash
        await new Promise(resolve => setTimeout(resolve, 300));
        if (isMounted) {
          await SplashScreen.hideAsync();
        }
      } catch (e) {
        console.log('Error hiding splash screen:', e);
      }
    };

    hideSplash();

    // Cleanup function to handle unmounting
    return () => {
      setIsMounted(false);
    };
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <StatusBar style="auto" />
          <Slot />
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}