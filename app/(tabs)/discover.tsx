import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList, ScrollView, Animated, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import Colors from '@/constants/Colors';
import { List, MapPin, Filter, Search } from 'lucide-react-native';
import JobCard from '@/components/job/JobCard';
import SearchBar from '@/components/ui/SearchBar';
import FilterButton from '@/components/ui/FilterButton';
import { mockJobs } from '@/data/mockData';
import * as Location from 'expo-location';

const { width } = Dimensions.get('window');

// Conditionally import MapView only for native platforms
let MapView: any;
let Marker: any;
if (Platform.OS !== 'web') {
  const Maps = require('react-native-maps');
  MapView = Maps.default;
  Marker = Maps.Marker;
}

export default function DiscoverScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const router = useRouter();
  
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState(mockJobs);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  
  const mapRef = useRef<any>(null);
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

  const handleJobPress = (jobId: string) => {
    if (Platform.OS === 'web') {
      router.push(`/job/${jobId}`);
      return;
    }
    
    setSelectedJob(jobId);
    const job = jobs.find(j => j.id === jobId);
    
    if (job && mapRef.current && viewMode === 'map') {
      mapRef.current.animateToRegion({
        latitude: job.latitude,
        longitude: job.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 500);
    }
  };

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

  const initialRegion = location ? {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  } : {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const renderMap = () => {
    if (Platform.OS === 'web') {
      return (
        <View style={styles.webMapPlaceholder}>
          <Text style={[styles.webMapText, { color: colors.text }]}>
            Map view is not available on web platform.
          </Text>
          <TouchableOpacity
            style={[styles.webMapButton, { backgroundColor: colors.primary }]}
            onPress={() => setViewMode('list')}
          >
            <Text style={[styles.webMapButtonText, { color: colors.cardText }]}>
              Switch to List View
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <MapView
        ref={mapRef}
        style={styles.map}
        provider="google"
        initialRegion={initialRegion}
        showsUserLocation
        showsMyLocationButton
      >
        {jobs.map((job) => (
          <Marker
            key={job.id}
            coordinate={{
              latitude: job.latitude,
              longitude: job.longitude,
            }}
            onPress={() => handleJobPress(job.id)}
            pinColor={selectedJob === job.id ? colors.primary : colors.marker}
          />
        ))}
      </MapView>
    );
  };

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
        
        <View style={styles.viewToggle}>
          <TouchableOpacity 
            style={[
              styles.toggleButton, 
              viewMode === 'map' && [styles.activeToggle, { backgroundColor: colors.primary }]
            ]}
            onPress={() => setViewMode('map')}
          >
            <MapPin 
              size={18} 
              color={viewMode === 'map' ? colors.cardText : colors.text} 
            />
            <Text 
              style={[
                styles.toggleText, 
                { color: viewMode === 'map' ? colors.cardText : colors.text }
              ]}
            >
              Map
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.toggleButton, 
              viewMode === 'list' && [styles.activeToggle, { backgroundColor: colors.primary }]
            ]}
            onPress={() => setViewMode('list')}
          >
            <List 
              size={18} 
              color={viewMode === 'list' ? colors.cardText : colors.text} 
            />
            <Text 
              style={[
                styles.toggleText, 
                { color: viewMode === 'list' ? colors.cardText : colors.text }
              ]}
            >
              List
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {viewMode === 'map' ? (
        <View style={styles.mapContainer}>
          {renderMap()}
          
          <View style={styles.jobListOverlay}>
            <FlatList
              data={jobs}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <JobCard 
                  job={item} 
                  theme={theme} 
                  selected={selectedJob === item.id}
                  onPress={() => handleJobPress(item.id)}
                />
              )}
              keyExtractor={(item) => item.id}
              snapToInterval={width - 60}
              decelerationRate="fast"
              contentContainerStyle={styles.jobCardList}
            />
          </View>
        </View>
      ) : (
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
      )}
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
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  toggleText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: 4,
  },
  activeToggle: {
    borderRadius: 8,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  jobListOverlay: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
  },
  jobCardList: {
    paddingHorizontal: 16,
  },
  listContainer: {
    padding: 16,
  },
  webMapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  webMapText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Inter-Medium',
  },
  webMapButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  webMapButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
});