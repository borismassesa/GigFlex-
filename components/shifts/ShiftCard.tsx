import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Colors from '@/constants/Colors';
import { MapPin, Clock, Calendar, CheckCircle, AlertCircle, Clock4 } from 'lucide-react-native';

interface ShiftProps {
  id: string;
  title: string;
  company: string;
  date: string;
  time: string;
  location: string;
  pay: string;
  image: string;
  status: 'upcoming' | 'completed' | 'canceled' | 'in-progress';
}

interface ShiftCardProps {
  shift: ShiftProps;
  theme: 'light' | 'dark';
  onPress: () => void;
}

export default function ShiftCard({ shift, theme, onPress }: ShiftCardProps) {
  const colors = Colors[theme];
  
  const getStatusColor = () => {
    switch(shift.status) {
      case 'upcoming':
        return colors.primary;
      case 'completed':
        return colors.success;
      case 'canceled':
        return colors.error;
      case 'in-progress':
        return colors.accent;
      default:
        return colors.primary;
    }
  };
  
  const getStatusIcon = () => {
    switch(shift.status) {
      case 'upcoming':
        return <Calendar size={16} color={colors.primary} />;
      case 'completed':
        return <CheckCircle size={16} color={colors.success} />;
      case 'canceled':
        return <AlertCircle size={16} color={colors.error} />;
      case 'in-progress':
        return <Clock4 size={16} color={colors.accent} />;
      default:
        return <Calendar size={16} color={colors.primary} />;
    }
  };
  
  const getStatusText = () => {
    switch(shift.status) {
      case 'upcoming':
        return 'Upcoming';
      case 'completed':
        return 'Completed';
      case 'canceled':
        return 'Canceled';
      case 'in-progress':
        return 'In Progress';
      default:
        return 'Upcoming';
    }
  };
  
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.card }]}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: shift.image }} style={styles.image} />
        <View style={[styles.payBadge, { backgroundColor: colors.primary }]}>
          <Text style={[styles.pay, { color: colors.cardText }]}>{shift.pay}</Text>
        </View>
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>{shift.title}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor() + '20' }]}>
            {getStatusIcon()}
            <Text style={[styles.statusText, { color: getStatusColor() }]}>
              {getStatusText()}
            </Text>
          </View>
        </View>
        
        <Text style={[styles.company, { color: colors.textDim }]}>{shift.company}</Text>
        
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Calendar size={14} color={colors.textDim} />
            <Text style={[styles.detailText, { color: colors.textDim }]}>{shift.date}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Clock size={14} color={colors.textDim} />
            <Text style={[styles.detailText, { color: colors.textDim }]}>{shift.time}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <MapPin size={14} color={colors.textDim} />
            <Text style={[styles.detailText, { color: colors.textDim }]}>{shift.location}</Text>
          </View>
        </View>
        
        {shift.status === 'upcoming' && (
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.primary }]}
            onPress={onPress}
          >
            <Text style={[styles.actionButtonText, { color: colors.cardText }]}>View Details</Text>
          </TouchableOpacity>
        )}
        
        {shift.status === 'in-progress' && (
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.accent }]}
            onPress={onPress}
          >
            <Text style={[styles.actionButtonText, { color: colors.cardText }]}>Clock Out</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
  },
  payBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  pay: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
  },
  contentContainer: {
    flex: 1,
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginLeft: 4,
  },
  company: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 8,
  },
  details: {
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginLeft: 8,
  },
  actionButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
});