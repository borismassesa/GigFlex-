import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function SplashScreenComponent() {
  useEffect(() => {
    // Hide splash screen after a brief delay
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };
    
    // Hide after a short delay
    const timer = setTimeout(hideSplash, 1000);
    return () => clearTimeout(timer);
  }, []);

  // This component won't be visible - it just manages the native splash screen
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});