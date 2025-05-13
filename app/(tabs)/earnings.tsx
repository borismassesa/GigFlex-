import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import Colors from '@/constants/Colors';
import { ChevronLeft, ChevronRight, Clock, MapPin, Award, Gift, BarChart3, Wallet, Trophy } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function EarningsScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('activity');

  // Mock data
  const currentWeek = {
    start: 'May 12',
    end: 'May 19',
    earnings: 245.50,
    online: '4h 27m',
    active: '2h 56m',
    trips: 11,
    points: 15
  };

  const renderHeader = () => (
    <View style={[styles.header, { backgroundColor: colors.card }]}>
      <View style={styles.dateSelector}>
        <TouchableOpacity>
          <ChevronLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.dateRange, { color: colors.text }]}>
          {currentWeek.start} - {currentWeek.end}
        </Text>
        <TouchableOpacity>
          <ChevronRight size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <Text style={[styles.earnings, { color: colors.text }]}>
        ${currentWeek.earnings.toFixed(2)}
      </Text>
      
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Clock size={16} color={colors.textDim} />
          <Text style={[styles.statLabel, { color: colors.textDim }]}>Online</Text>
          <Text style={[styles.statValue, { color: colors.text }]}>{currentWeek.online}</Text>
        </View>
        
        <View style={styles.statItem}>
          <MapPin size={16} color={colors.textDim} />
          <Text style={[styles.statLabel, { color: colors.textDim }]}>Active</Text>
          <Text style={[styles.statValue, { color: colors.text }]}>{currentWeek.active}</Text>
        </View>
        
        <View style={styles.statItem}>
          <BarChart3 size={16} color={colors.textDim} />
          <Text style={[styles.statLabel, { color: colors.textDim }]}>Trips</Text>
          <Text style={[styles.statValue, { color: colors.text }]}>{currentWeek.trips}</Text>
        </View>
        
        <View style={styles.statItem}>
          <Trophy size={16} color={colors.textDim} />
          <Text style={[styles.statLabel, { color: colors.textDim }]}>Points</Text>
          <Text style={[styles.statValue, { color: colors.text }]}>{currentWeek.points}</Text>
        </View>
      </View>
    </View>
  );

  const renderTabs = () => (
    <View style={[styles.tabs, { backgroundColor: colors.backgroundAlt }]}>
      <TouchableOpacity 
        style={[
          styles.tab,
          selectedTab === 'activity' && { backgroundColor: colors.primary + '20' }
        ]}
        onPress={() => setSelectedTab('activity')}
      >
        <BarChart3 
          size={20} 
          color={selectedTab === 'activity' ? colors.primary : colors.textDim} 
        />
        <Text style={[
          styles.tabText,
          { color: selectedTab === 'activity' ? colors.primary : colors.textDim }
        ]}>Activity</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[
          styles.tab,
          selectedTab === 'wallet' && { backgroundColor: colors.primary + '20' }
        ]}
        onPress={() => setSelectedTab('wallet')}
      >
        <Wallet 
          size={20} 
          color={selectedTab === 'wallet' ? colors.primary : colors.textDim} 
        />
        <Text style={[
          styles.tabText,
          { color: selectedTab === 'wallet' ? colors.primary : colors.textDim }
        ]}>Wallet</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[
          styles.tab,
          selectedTab === 'benefits' && { backgroundColor: colors.primary + '20' }
        ]}
        onPress={() => setSelectedTab('benefits')}
      >
        <Award 
          size={20} 
          color={selectedTab === 'benefits' ? colors.primary : colors.textDim} 
        />
        <Text style={[
          styles.tabText,
          { color: selectedTab === 'benefits' ? colors.primary : colors.textDim }
        ]}>Benefits</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPromotions = () => (
    <View style={styles.promotionsSection}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>More ways to earn</Text>
      
      <TouchableOpacity style={[styles.promotionItem, { backgroundColor: colors.card }]}>
        <Gift size={24} color={colors.primary} />
        <View style={styles.promotionContent}>
          <Text style={[styles.promotionTitle, { color: colors.text }]}>Upcoming promotions</Text>
          <Text style={[styles.promotionSubtitle, { color: colors.textDim }]}>See what's available</Text>
        </View>
        <ChevronRight size={20} color={colors.textDim} />
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.promotionItem, { backgroundColor: colors.card }]}>
        <Award size={24} color={colors.primary} />
        <View style={styles.promotionContent}>
          <Text style={[styles.promotionTitle, { color: colors.text }]}>Refer friends and earn</Text>
          <Text style={[styles.promotionSubtitle, { color: colors.textDim }]}>
            Make money when you invite friends to earn
          </Text>
        </View>
        <ChevronRight size={20} color={colors.textDim} />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {renderHeader()}
      {renderTabs()}
      
      <View style={[styles.balanceCard, { backgroundColor: colors.card }]}>
        <View style={styles.balanceHeader}>
          <Text style={[styles.balanceLabel, { color: colors.textDim }]}>Balance</Text>
          <Text style={[styles.balanceAmount, { color: colors.text }]}>$21.63</Text>
        </View>
        
        <View style={styles.balanceActions}>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.primary }]}
          >
            <Text style={[styles.actionButtonText, { color: colors.cardText }]}>Cash out</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.backgroundAlt }]}
          >
            <Text style={[styles.actionButtonText, { color: colors.text }]}>Summary</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {renderPromotions()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  dateRange: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginHorizontal: 16,
  },
  earnings: {
    fontFamily: 'Inter-Bold',
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginTop: 4,
  },
  statValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginTop: 2,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: 8,
  },
  balanceCard: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  balanceLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  balanceAmount: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
  },
  balanceActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  promotionsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 16,
  },
  promotionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  promotionContent: {
    flex: 1,
    marginLeft: 16,
  },
  promotionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  promotionSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
});