import React, { useEffect, memo } from 'react';
import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';

// Prevent the splash screen from auto-hiding but with proper error handling
try {
  SplashScreen.preventAutoHideAsync();
} catch (e) {
  console.log('Error preventing splash screen auto hide:', e);
}

// Memoize status bar component to prevent unnecessary rerenders
const MemoizedStatusBar = memo(() => <StatusBar style="auto" />);

export default function RootLayout() {
  useEffect(() => {
    // Hide splash screen with better reliability
    const hideSplash = async () => {
      try {
        // Ensure the component is mounted before hiding splash
        await new Promise(resolve => setTimeout(resolve, 300));
        await SplashScreen.hideAsync();
      } catch (e) {
        console.log('Error hiding splash screen:', e);
      }
    };

    hideSplash();
    
    // No timer cleanup needed as we're not setting any timeout reference
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <MemoizedStatusBar />
          <Slot />
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
