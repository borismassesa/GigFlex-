import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import Colors from '@/constants/Colors';
import { MapPin, Clock, DollarSign, Calendar } from 'lucide-react-native';

interface JobProps {
  id: string;
  title: string;
  company: string;
  date: string;
  time: string;
  location: string;
  hourlyRate: number;
  image: string;
  latitude: number;
  longitude: number;
  description?: string;
}

interface JobCardProps {
  job: JobProps;
  theme: 'light' | 'dark';
  selected?: boolean;
  large?: boolean;
  onPress: () => void;
}

const { width } = Dimensions.get('window');

export default function JobCard({ job, theme, selected = false, large = false, onPress }: JobCardProps) {
  const colors = Colors[theme];
  
  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        { 
          backgroundColor: colors.card,
          borderColor: selected ? colors.primary : 'transparent',
          width: large ? '100%' : width - 60,
          marginBottom: large ? 16 : 0,
        }
      ]}
      onPress={onPress}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.companyContainer}>
            <Image 
              source={{ uri: job.image }} 
              style={styles.companyImage}
            />
            <View style={styles.titleContainer}>
              <Text 
                style={[styles.title, { color: colors.text }]} 
                numberOfLines={1}
              >
                {job.title}
              </Text>
              <Text 
                style={[styles.company, { color: colors.textDim }]} 
                numberOfLines={1}
              >
                {job.company}
              </Text>
            </View>
          </View>
          <View style={[styles.rateBadge, { backgroundColor: colors.primary }]}>
            <Text style={[styles.rate, { color: colors.cardText }]}>${job.hourlyRate}/hr</Text>
          </View>
        </View>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detail}>
            <Calendar size={14} color={colors.textDim} />
            <Text style={[styles.detailText, { color: colors.textDim }]}>{job.date}</Text>
          </View>
          
          <View style={styles.detail}>
            <Clock size={14} color={colors.textDim} />
            <Text style={[styles.detailText, { color: colors.textDim }]}>{job.time}</Text>
          </View>
          
          <View style={styles.detail}>
            <MapPin size={14} color={colors.textDim} />
            <Text style={[styles.detailText, { color: colors.textDim }]}>{job.location}</Text>
          </View>
        </View>
        
        {large && job.description && (
          <Text 
            style={[styles.description, { color: colors.text }]} 
            numberOfLines={2}
          >
            {job.description}
          </Text>
        )}
        
        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.applyButton, { backgroundColor: colors.primary }]}
            onPress={onPress}
          >
            <Text style={[styles.applyText, { color: colors.cardText }]}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    marginRight: 16,
    borderWidth: 2,
    overflow: 'hidden',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  companyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  companyImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  company: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  rateBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginLeft: 8,
  },
  rate: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
  },
  detailsContainer: {
    marginBottom: 16,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginLeft: 8,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  applyButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  applyText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
});