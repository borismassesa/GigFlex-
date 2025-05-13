import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { Filter } from 'lucide-react-native';

interface FilterButtonProps {
  theme: 'light' | 'dark';
}

export default function FilterButton({ theme }: FilterButtonProps) {
  const colors = Colors[theme];
  
  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: colors.backgroundAlt }]}
      onPress={() => console.log('Filter pressed')}
    >
      <Filter size={20} color={colors.text} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});