import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import { MapPin, Clock } from 'lucide-react-native';

interface ShiftProps {
  id: string;
  title: string;
  company: string;
  date: string;
  time: string;
  location: string;
  pay: string;
  image: string;
}

interface UpcomingShiftProps {
  shift: ShiftProps;
  theme: 'light' | 'dark';
  onPress: () => void;
}

export default function UpcomingShift({ shift, theme, onPress }: UpcomingShiftProps) {
  const colors = Colors[theme];
  
  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: colors.card }]}
      onPress={onPress}
    >
      <View style={styles.timeContainer}>
        <Text style={[styles.date, { color: colors.primary }]}>{shift.date}</Text>
        <View style={styles.timeWrapper}>
          <Clock size={14} color={colors.textDim} />
          <Text style={[styles.time, { color: colors.textDim }]}>{shift.time}</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{shift.title}</Text>
        <Text style={[styles.company, { color: colors.textDim }]}>{shift.company}</Text>
        
        <View style={styles.locationContainer}>
          <MapPin size={14} color={colors.textDim} />
          <Text style={[styles.location, { color: colors.textDim }]}>{shift.location}</Text>
        </View>
      </View>
      
      <View style={styles.imageContainer}>
        <Image source={{ uri: shift.image }} style={styles.image} />
        <View style={[styles.payBadge, { backgroundColor: colors.primary }]}>
          <Text style={[styles.pay, { color: colors.cardText }]}>{shift.pay}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    width: '100%',
  },
  timeContainer: {
    marginRight: 16,
    justifyContent: 'center',
  },
  date: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    marginBottom: 4,
  },
  timeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginLeft: 4,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  company: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginLeft: 4,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  payBadge: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  pay: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
  },
});