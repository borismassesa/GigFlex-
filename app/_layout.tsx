import React, { useEffect, useState, useCallback } from 'react';
import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import * as Font from 'expo-font';
import { View } from 'react-native';

// Keep splash screen visible while app is loading
SplashScreen.preventAutoHideAsync().catch(e => console.warn("SplashScreen.preventAutoHideAsync failed:", e));

export default function RootLayout() {
  const [assetsReady, setAssetsReady] = useState(false);

  useEffect(() => {
    async function prepareAppAssets() {
      try {
        await Font.loadAsync({
          'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
          'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
          'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
          'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
          'Inter-Black': require('../assets/fonts/Inter-Black.ttf'),
        });
      } catch (e) {
        console.warn('Error loading app assets (fonts, etc.):', e);
      } finally {
        setAssetsReady(true);
      }
    }
    prepareAppAssets();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (assetsReady) {
      await SplashScreen.hideAsync().catch(e => console.warn("SplashScreen.hideAsync failed:", e));
    }
  }, [assetsReady]);

  if (!assetsReady) {
    return null; // Keep splash screen visible until assets are ready
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AuthProvider>
            <StatusBar style="auto" />
            <Slot />
          </AuthProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </View>
  );
}