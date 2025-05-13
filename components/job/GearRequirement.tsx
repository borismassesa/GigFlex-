import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { CheckCircle2, CircleX } from 'lucide-react-native';

interface GearRequirementProps {
  name: string;
  required: boolean;
  theme: 'light' | 'dark';
}

export default function GearRequirement({ name, required, theme }: GearRequirementProps) {
  const colors = Colors[theme];
  
  return (
    <View style={[styles.container, { borderBottomColor: colors.border }]}>
      <View style={styles.nameContainer}>
        {required ? (
          <CheckCircle2 size={20} color={colors.success} />
        ) : (
          <CircleX size={20} color={colors.textDim} />
        )}
        <Text style={[styles.name, { color: colors.text }]}>{name}</Text>
      </View>
      
      <View style={[
        styles.badge, 
        { 
          backgroundColor: required ? colors.successLight : colors.backgroundAlt 
        }
      ]}>
        <Text style={[
          styles.badgeText, 
          { 
            color: required ? colors.success : colors.textDim 
          }
        ]}>
          {required ? 'Required' : 'Optional'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginLeft: 12,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
});