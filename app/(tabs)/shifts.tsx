import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import Colors from '@/constants/Colors';
import { Check, Clock, AlertCircle } from 'lucide-react-native';
import ShiftCard from '@/components/shifts/ShiftCard';
import EmptyState from '@/components/ui/EmptyState';
import { mockUpcomingShifts, mockPastShifts } from '@/data/mockData';

type ShiftTab = 'upcoming' | 'completed' | 'canceled';

export default function ShiftsScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<ShiftTab>('upcoming');
  
  const getShifts = () => {
    switch(activeTab) {
      case 'upcoming':
        return mockUpcomingShifts;
      case 'completed':
        return mockPastShifts.filter(shift => shift.status === 'completed');
      case 'canceled':
        return mockPastShifts.filter(shift => shift.status === 'canceled');
      default:
        return [];
    }
  };

  const getEmptyStateMessage = () => {
    switch(activeTab) {
      case 'upcoming':
        return {
          title: 'No upcoming shifts',
          message: 'You don\'t have any upcoming shifts. Browse available gigs to find work.',
          buttonText: 'Find Shifts',
          buttonAction: () => router.push('/discover')
        };
      case 'completed':
        return {
          title: 'No completed shifts',
          message: 'You haven\'t completed any shifts yet. Start working to build your history.',
          buttonText: 'Find Shifts',
          buttonAction: () => router.push('/discover')
        };
      case 'canceled':
        return {
          title: 'No canceled shifts',
          message: 'You don\'t have any canceled shifts. Keep up the good work!',
          buttonText: 'View Upcoming',
          buttonAction: () => setActiveTab('upcoming')
        };
      default:
        return {
          title: 'No shifts found',
          message: 'No shifts found in this category',
          buttonText: 'Find Shifts',
          buttonAction: () => router.push('/discover')
        };
    }
  };

  const shifts = getShifts();
  const emptyState = getEmptyStateMessage();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'upcoming' && [styles.activeTab, { borderBottomColor: colors.primary }]
          ]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Clock size={18} color={activeTab === 'upcoming' ? colors.primary : colors.textDim} />
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'upcoming' ? colors.primary : colors.textDim }
            ]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'completed' && [styles.activeTab, { borderBottomColor: colors.primary }]
          ]}
          onPress={() => setActiveTab('completed')}
        >
          <Check size={18} color={activeTab === 'completed' ? colors.primary : colors.textDim} />
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'completed' ? colors.primary : colors.textDim }
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'canceled' && [styles.activeTab, { borderBottomColor: colors.primary }]
          ]}
          onPress={() => setActiveTab('canceled')}
        >
          <AlertCircle size={18} color={activeTab === 'canceled' ? colors.primary : colors.textDim} />
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'canceled' ? colors.primary : colors.textDim }
            ]}
          >
            Canceled
          </Text>
        </TouchableOpacity>
      </View>

      {shifts.length > 0 ? (
        <FlatList
          data={shifts}
          renderItem={({ item }) => (
            <ShiftCard
              shift={item}
              theme={theme}
              onPress={() => router.push(`/job/${item.id}`)}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.shiftsList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <EmptyState
          title={emptyState.title}
          message={emptyState.message}
          buttonText={emptyState.buttonText}
          onButtonPress={emptyState.buttonAction}
          theme={theme}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: 4,
  },
  shiftsList: {
    padding: 16,
  },
});