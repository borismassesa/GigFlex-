import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import { MapPin, Clock, DollarSign } from 'lucide-react-native';

interface JobProps {
  id: string;
  title: string;
  company: string;
  date: string;
  time: string;
  location: string;
  pay: string;
  image: string;
}

interface RecommendedJobProps {
  job: JobProps;
  theme: 'light' | 'dark';
  onPress: () => void;
}

export default function RecommendedJob({ job, theme, onPress }: RecommendedJobProps) {
  const colors = Colors[theme];
  
  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: colors.card }]}
      onPress={onPress}
    >
      <Image source={{ uri: job.image }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {job.title}
        </Text>
        <Text style={[styles.company, { color: colors.textDim }]} numberOfLines={1}>
          {job.company}
        </Text>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Clock size={12} color={colors.textDim} />
            <Text style={[styles.infoText, { color: colors.textDim }]}>{job.time}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <MapPin size={12} color={colors.textDim} />
            <Text style={[styles.infoText, { color: colors.textDim }]}>{job.location}</Text>
          </View>
        </View>
        
        <View style={styles.footer}>
          <View style={[styles.payBadge, { backgroundColor: colors.primaryLight }]}>
            <DollarSign size={12} color={colors.primary} />
            <Text style={[styles.payText, { color: colors.primary }]}>{job.pay}</Text>
          </View>
          
          <Text style={[styles.dateText, { color: colors.textDim }]}>{job.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 220,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
  },
  image: {
    width: '100%',
    height: 100,
  },
  content: {
    padding: 12,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  company: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 8,
  },
  infoContainer: {
    marginBottom: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginLeft: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  payBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  payText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    marginLeft: 2,
  },
  dateText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
});