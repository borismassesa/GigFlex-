import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import Colors from '@/constants/Colors';
import { ChevronLeft, ChevronRight, Zap, CreditCard, HelpCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function WalletScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const router = useRouter();

  const transactions = [
    {
      id: '1',
      date: 'May 1',
      items: [
        {
          id: 'a1',
          type: 'guarantee',
          title: 'Earnings guarantee - Guaranteed earnings top up',
          time: '5:11 a.m.',
          amount: 21.63,
        },
      ],
    },
    {
      id: '2',
      date: 'Apr 26',
      items: [
        {
          id: 'b1',
          type: 'fee',
          title: 'Instant Pay Fees',
          time: '2:28 p.m.',
          amount: -1.49,
        },
        {
          id: 'b2',
          type: 'transfer',
          title: 'Transferred To Bank Account',
          time: '2:28 p.m.',
          amount: -17.69,
        },
      ],
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Wallet</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.balanceCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.balanceLabel, { color: colors.textDim }]}>
            Balance
          </Text>
          <Text style={[styles.balanceAmount, { color: colors.text }]}>
            $21.63
          </Text>
          <Text style={[styles.balanceStatus, { color: colors.textDim }]}>
            No payout scheduled
          </Text>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: '#000000' }]}
          >
            <Zap size={20} color="#FFFFFF" />
            <Text style={[styles.actionButtonText, { color: '#FFFFFF' }]}>
              Cash out
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.backgroundAlt }]}
          >
            <Text style={[styles.actionButtonText, { color: colors.text }]}>
              Summary
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Payout activity
          </Text>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={[styles.seeAllText, { color: colors.text }]}>
              See all
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.payoutMethodCard, { backgroundColor: colors.card }]}>
          <View style={styles.payoutMethodContent}>
            <CreditCard size={24} color={colors.text} />
            <Text style={[styles.payoutMethodText, { color: colors.text }]}>
              Payout method
            </Text>
          </View>
          <ChevronRight size={20} color={colors.textDim} />
        </View>

        <TouchableOpacity 
          style={[styles.helpButton, { backgroundColor: colors.card }]}
        >
          <HelpCircle size={24} color={colors.text} />
          <Text style={[styles.helpButtonText, { color: colors.text }]}>
            Help
          </Text>
          <ChevronRight size={20} color={colors.textDim} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  balanceCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  balanceLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 4,
  },
  balanceAmount: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    marginBottom: 4,
  },
  balanceStatus: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 24,
    gap: 8,
  },
  actionButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
  },
  seeAllButton: {
    padding: 4,
  },
  seeAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  payoutMethodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  payoutMethodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  payoutMethodText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  helpButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    flex: 1,
    marginLeft: 12,
  },
});