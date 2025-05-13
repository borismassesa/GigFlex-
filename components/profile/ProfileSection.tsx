import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

interface ProfileSectionProps {
  title: string;
  content: React.ReactNode;
  theme: 'light' | 'dark';
}

export default function ProfileSection({ title, content, theme }: ProfileSectionProps) {
  const colors = Colors[theme];
  
  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <View style={styles.content}>
        {content}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginBottom: 16,
  },
  content: {
    flex: 1,
  },
});