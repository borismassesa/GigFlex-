import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { Search } from 'lucide-react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  theme: 'light' | 'dark';
}

export default function SearchBar({ value, onChangeText, placeholder, theme }: SearchBarProps) {
  const colors = Colors[theme];
  
  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundAlt }]}>
      <Search size={20} color={colors.textDim} />
      <TextInput
        style={[styles.input, { color: colors.text }]}
        placeholder={placeholder}
        placeholderTextColor={colors.textDim}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginLeft: 8,
  },
});