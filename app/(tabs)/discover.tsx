import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import Colors from '@/constants/Colors';
import { Search, Filter } from 'lucide-react-native';
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
});