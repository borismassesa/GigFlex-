import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import Colors from '@/constants/Colors';
import { ChevronLeft, ChevronDown, Filter, Settings } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function EarningsActivityScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const router = useRouter();
  
  const [dateRange, setDateRange] = useState('04-21 - 04-28');
  
  const transactions = [
    {
      id: '1',
      date: 'Thu, Apr 24',
      items: [
        {
          id: 'a1',
          type: 'delivery',
          amount: 4.09,
          time: '9:36 p.m.',
          duration: '11 min 25 sec',
          distance: '3.94 km',
          from: 'Boston Pizza (10153 King George Hwy)',
          to: '87B Ave, Surrey, BC, CA',
        },
        {
          id: 'a2',
          type: 'delivery',
          amount: 5.04,
          time: '8:57 p.m.',
          duration: '19 min 3 sec',
          distance: '4.22 km',
          from: 'Osmow\'s (12477 88 Ave)',
          to: '131A St, Surrey, BC, CA',
        },
        {
          id: 'a3',
          type: 'delivery',
          amount: 10.05,
          time: '8:30 p.m.',
          duration: '29 min 40 sec',
          distance: '6.87 km',
          from: 'Earls Kitchen + Bar (Guildford)',
          to: '139A St, Surrey, BC, CA',
        },
      ],
    },
  ];

  const renderTransaction = (transaction: any) => (
    <View key={transaction.id} style={styles.transactionGroup}>
      <Text style={[styles.dateHeader, { color: colors.text }]}>{transaction.date}</Text>
      
      {transaction.items.map((item: any) => (
        <View 
          key={item.id} 
          style={[styles.transactionItem, { backgroundColor: colors.card }]}
        >
          <View style={styles.transactionHeader}>
            <View style={styles.amountContainer}>
              <Text style={[styles.amount, { color: colors.text }]}>
                ${item.amount.toFixed(2)}
              </Text>
              <Text style={[styles.time, { color: colors.textDim }]}>
                {item.time}
              </Text>
            </View>
          </View>
          
          <View style={styles.deliveryDetails}>
            <Text style={[styles.deliveryInfo, { color: colors.textDim }]}>
              Delivery · {item.duration} · {item.distance}
            </Text>
            
            <View style={styles.locationContainer}>
              <Text 
                style={[styles.location, { color: colors.text }]} 
                numberOfLines={1}
              >
                {item.from}
              </Text>
              <Text 
                style={[styles.location, { color: colors.text }]} 
                numberOfLines={1}
              >
                {item.to}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }]}>
            Earnings Activity
          </Text>
          <TouchableOpacity>
            <Settings size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.filterContainer}>
          <TouchableOpacity 
            style={[styles.filterButton, { backgroundColor: colors.backgroundAlt }]}
          >
            <Text style={[styles.filterText, { color: colors.text }]}>Type</Text>
            <ChevronDown size={16} color={colors.text} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.filterButton, { backgroundColor: colors.backgroundAlt }]}
          >
            <Text style={[styles.filterText, { color: colors.text }]}>Feature</Text>
            <ChevronDown size={16} color={colors.text} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.filterButton, { backgroundColor: '#000000' }]}
          >
            <Text style={[styles.filterText, { color: '#FFFFFF' }]}>
              {dateRange}
            </Text>
            <ChevronDown size={16} color="#FFFFFF" />
          </TouchableOpacity>
          
          <TouchableOpacity>
            <Text style={[styles.clearText, { color: colors.text }]}>
              Clear all
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {transactions.map(renderTransaction)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  filterText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  clearText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  transactionGroup: {
    marginBottom: 24,
  },
  dateHeader: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 12,
  },
  transactionItem: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  amount: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
  },
  time: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  deliveryDetails: {
    gap: 8,
  },
  deliveryInfo: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  locationContainer: {
    gap: 4,
  },
  location: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
});