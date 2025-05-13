import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  theme: 'light' | 'dark';
}

export default function StatsCard({ title, value, icon, theme }: StatsCardProps) {
  const colors = Colors[theme];
  
  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
      <Text style={[styles.title, { color: colors.textDim }]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  iconContainer: {
    marginBottom: 8,
  },
  value: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 4,
  },
  title: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
});