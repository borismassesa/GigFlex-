import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import Colors from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';
import WelcomeCard from '@/components/home/WelcomeCard';
import UpcomingShift from '@/components/home/UpcomingShift';
import RecommendedJob from '@/components/home/RecommendedJob';
import { TrendingUp, DollarSign, Award } from 'lucide-react-native';
import StatsCard from '@/components/home/StatsCard';

export default function HomeScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const { user } = useAuth();
  const router = useRouter();
  
  const stats = [
    { id: '1', title: 'Earnings', value: '$245', icon: <DollarSign size={24} color={colors.primary} /> },
    { id: '2', title: 'Trust Score', value: '92', icon: <Award size={24} color={colors.success} /> },
    { id: '3', title: 'Next Raise', value: '86%', icon: <TrendingUp size={24} color={colors.accent} /> },
  ];

  const upcomingShifts = [
    {
      id: '1',
      title: 'Warehouse Assistant',
      company: 'FastLogistics Inc.',
      date: 'Today',
      time: '2:00 PM - 6:00 PM',
      location: 'Downtown Warehouse',
      pay: '$18/hr',
      image: 'https://images.pexels.com/photos/7706434/pexels-photo-7706434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];

  const recommendedJobs = [
    {
      id: '1',
      title: 'Event Staff',
      company: 'City Event Center',
      date: 'Tomorrow',
      time: '5:00 PM - 10:00 PM',
      location: '1.2 miles away',
      pay: '$22/hr',
      image: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: '2',
      title: 'Delivery Driver',
      company: 'Quick Delivery Co.',
      date: 'Wed, May 15',
      time: '10:00 AM - 2:00 PM',
      location: '0.8 miles away',
      pay: '$20/hr',
      image: 'https://images.pexels.com/photos/4393668/pexels-photo-4393668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: '3',
      title: 'Restaurant Server',
      company: 'Gourmet Kitchen',
      date: 'Thu, May 16',
      time: '6:00 PM - 11:00 PM',
      location: '1.5 miles away',
      pay: '$16/hr + tips',
      image: 'https://images.pexels.com/photos/6136262/pexels-photo-6136262.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <WelcomeCard userName={user?.firstName || 'Guest'} theme={theme} />
      
      <View style={styles.statsContainer}>
        {stats.map((stat) => (
          <StatsCard 
            key={stat.id}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            theme={theme}
          />
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Upcoming Shift</Text>
          <TouchableOpacity onPress={() => router.push('/shifts')}>
            <Text style={[styles.seeAll, { color: colors.primary }]}>See All</Text>
          </TouchableOpacity>
        </View>
        
        {upcomingShifts.length > 0 ? (
          <FlatList
            data={upcomingShifts}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <UpcomingShift shift={item} theme={theme} onPress={() => router.push(`/job/${item.id}`)} />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.shiftsList}
          />
        ) : (
          <View style={[styles.emptyState, { backgroundColor: colors.card }]}>
            <Text style={[styles.emptyText, { color: colors.textDim }]}>No upcoming shifts</Text>
            <TouchableOpacity 
              style={[styles.findButton, { backgroundColor: colors.primary }]}
              onPress={() => router.push('/discover')}
            >
              <Text style={[styles.findButtonText, { color: colors.cardText }]}>Find Gigs</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recommended For You</Text>
          <TouchableOpacity onPress={() => router.push('/discover')}>
            <Text style={[styles.seeAll, { color: colors.primary }]}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={recommendedJobs}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <RecommendedJob job={item} theme={theme} onPress={() => router.push(`/job/${item.id}`)} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.jobsList}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 30,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
  },
  seeAll: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  shiftsList: {
    paddingBottom: 8,
  },
  jobsList: {
    paddingBottom: 8,
  },
  emptyState: {
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 8,
  },
  emptyText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginBottom: 16,
  },
  findButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  findButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
});