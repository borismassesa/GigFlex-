import React, { useEffect } from 'react';
import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';

// Keep splash screen visible while loading resources
SplashScreen.preventAutoHideAsync().catch(() => {/* ignore error */});

export default function RootLayout() {
  // Simplify the layout - don't load fonts here yet
  useEffect(() => {
    // Hide splash screen after a short timeout
    const timer = setTimeout(() => {
      SplashScreen.hideAsync().catch(() => {/* ignore error */});
    }, 300);
    
    return () => clearTimeout(timer);
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