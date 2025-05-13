import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MapPin } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface WebMapFallbackProps {
  theme: 'light' | 'dark';
  onSwitchToList: () => void;
}

export default function WebMapFallback({ theme, onSwitchToList }: WebMapFallbackProps) {
  const colors = Colors[theme];
  
  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundAlt }]}>
      <MapPin size={48} color={colors.primary} />
      <Text style={[styles.title, { color: colors.text }]}>
        Map View Unavailable
      </Text>
      <Text style={[styles.description, { color: colors.textDim }]}>
        The map view is not available on web platforms. Please use the list view instead.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    textAlign: 'center',
    maxWidth: 300,
  },
});