import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, Animated, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import Colors from '@/constants/Colors';
import { Search, Filter, TrendingUp, MapPin } from 'lucide-react-native';
import JobCard from '@/components/job/JobCard';
import SearchBar from '@/components/ui/SearchBar';
import FilterButton from '@/components/ui/FilterButton';
import { mockJobs } from '@/data/mockData';
import * as Location from 'expo-location';

export default function DiscoverScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const router = useRouter();
  
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState(mockJobs);
  
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  const filterJobs = (query: string) => {
    if (!query.trim()) {
      setJobs(mockJobs);
      return;
    }
    
    const filtered = mockJobs.filter(job => 
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.company.toLowerCase().includes(query.toLowerCase()) ||
      job.location.toLowerCase().includes(query.toLowerCase())
    );
    
    setJobs(filtered);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterJobs(query);
  };

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const renderHeroSection = () => (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
      style={styles.heroContainer}
    >
      <View style={styles.heroOverlay}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Find Your Next Gig</Text>
          <Text style={styles.heroSubtitle}>Discover opportunities near you</Text>
          
          <View style={styles.statsContainer}>
            <View style={[styles.statCard, { backgroundColor: 'rgba(255, 255, 255, 0.15)' }]}>
              <TrendingUp size={20} color="#ffffff" />
              <Text style={styles.statValue}>2,500+</Text>
              <Text style={styles.statLabel}>Active Jobs</Text>
            </View>
            
            <View style={[styles.statCard, { backgroundColor: 'rgba(255, 255, 255, 0.15)' }]}>
              <MapPin size={20} color="#ffffff" />
              <Text style={styles.statValue}>50+</Text>
              <Text style={styles.statLabel}>Cities</Text>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.View style={[
        styles.header, 
        { 
          backgroundColor: colors.card,
          borderBottomColor: colors.border,
          shadowOpacity: headerOpacity 
        }
      ]}>
        <View style={styles.searchContainer}>
          <SearchBar 
            value={searchQuery}
            onChangeText={handleSearch}
            placeholder="Search jobs, companies, locations..."
            theme={theme}
          />
          <FilterButton theme={theme} />
        </View>
      </Animated.View>

      <Animated.FlatList
        data={jobs}
        ListHeaderComponent={renderHeroSection}
        renderItem={({ item }) => (
          <JobCard 
            job={item} 
            theme={theme}
            large
            onPress={() => router.push(`/job/${item.id}`)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  listContainer: {
    padding: 16,
  },
  heroContainer: {
    height: 300,
    width: '100%',
    marginBottom: 24,
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
    padding: 24,
  },
  heroContent: {
    width: '100%',
  },
  heroTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 16,
  },
  statCard: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 120,
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginTop: 8,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
});