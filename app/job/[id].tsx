import { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import Colors from '@/constants/Colors';
import { MapPin, Calendar, Clock, DollarSign, CircleCheck, Info, MessageSquare, ChevronLeft, Shield } from 'lucide-react-native';
import GearRequirement from '@/components/job/GearRequirement';
import { mockJobs } from '@/data/mockData';
import { Platform } from 'react-native';

export default function JobDetailsScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  const job = mockJobs.find(j => j.id === id);
  const [applying, setApplying] = useState(false);
  
  if (!job) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Stack.Screen options={{ headerShown: true, title: 'Job Details' }} />
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: colors.text }]}>Job not found</Text>
          <TouchableOpacity 
            style={[styles.backButton, { backgroundColor: colors.primary }]}
            onPress={() => router.back()}
          >
            <Text style={[styles.backButtonText, { color: colors.cardText }]}>Back to Jobs</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  const handleApply = () => {
    setApplying(true);
    
    // Simulate API call
    setTimeout(() => {
      setApplying(false);
      if (Platform.OS === 'web') {
        alert('Application submitted successfully!');
      } else {
        Alert.alert(
          'Application Submitted!',
          'You have successfully applied for this gig. You will be notified when the employer responds.',
          [{ text: 'OK', onPress: () => router.push('/shifts') }]
        );
      }
    }, 1500);
  };
  
  const gearRequirements = [
    { id: '1', name: 'Black Pants', required: true },
    { id: '2', name: 'Non-Slip Shoes', required: true },
    { id: '3', name: 'Black Shirt', required: true },
    { id: '4', name: 'Hairnet', required: false },
  ];
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen 
        options={{ 
          headerShown: true, 
          title: '', 
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity 
              style={[styles.headerButton, { backgroundColor: colors.card }]} 
              onPress={() => router.back()}
            >
              <ChevronLeft size={24} color={colors.text} />
            </TouchableOpacity>
          )
        }} 
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: job.image }} style={styles.image} />
          <View style={[styles.badgeContainer, { backgroundColor: colors.primary }]}>
            <Text style={[styles.badgeText, { color: colors.cardText }]}>${job.hourlyRate}/hr</Text>
          </View>
        </View>
        
        <View style={styles.detailsContainer}>
          <Text style={[styles.jobTitle, { color: colors.text }]}>{job.title}</Text>
          <Text style={[styles.companyName, { color: colors.textDim }]}>{job.company}</Text>
          
          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <View style={[styles.iconContainer, { backgroundColor: colors.primaryLight }]}>
                  <MapPin size={18} color={colors.primary} />
                </View>
                <View>
                  <Text style={[styles.infoLabel, { color: colors.textDim }]}>Location</Text>
                  <Text style={[styles.infoValue, { color: colors.text }]}>{job.location}</Text>
                </View>
              </View>
              
              <View style={styles.infoItem}>
                <View style={[styles.iconContainer, { backgroundColor: colors.successLight }]}>
                  <DollarSign size={18} color={colors.success} />
                </View>
                <View>
                  <Text style={[styles.infoLabel, { color: colors.textDim }]}>Payment</Text>
                  <Text style={[styles.infoValue, { color: colors.text }]}>Next Day</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <View style={[styles.iconContainer, { backgroundColor: colors.accentLight }]}>
                  <Calendar size={18} color={colors.accent} />
                </View>
                <View>
                  <Text style={[styles.infoLabel, { color: colors.textDim }]}>Date</Text>
                  <Text style={[styles.infoValue, { color: colors.text }]}>{job.date}</Text>
                </View>
              </View>
              
              <View style={styles.infoItem}>
                <View style={[styles.iconContainer, { backgroundColor: colors.warningLight }]}>
                  <Clock size={18} color={colors.warning} />
                </View>
                <View>
                  <Text style={[styles.infoLabel, { color: colors.textDim }]}>Time</Text>
                  <Text style={[styles.infoValue, { color: colors.text }]}>{job.time}</Text>
                </View>
              </View>
            </View>
          </View>
          
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>About the Gig</Text>
            <Text style={[styles.description, { color: colors.text }]}>
              {job.description || 'Join our team for this exciting opportunity! We are looking for dedicated individuals to help us deliver exceptional service. This role requires attention to detail, customer service skills, and the ability to work in a fast-paced environment.'}
            </Text>
          </View>
          
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Required Gear</Text>
            
            <View style={styles.gearList}>
              {gearRequirements.map((gear) => (
                <GearRequirement
                  key={gear.id}
                  name={gear.name}
                  required={gear.required}
                  theme={theme}
                />
              ))}
            </View>
          </View>
          
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Company Information</Text>
            
            <View style={[styles.companyCard, { backgroundColor: colors.card }]}>
              <View style={styles.companyHeader}>
                <Image 
                  source={{ uri: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }} 
                  style={styles.companyLogo}
                />
                <View style={styles.companyInfo}>
                  <Text style={[styles.companyCardName, { color: colors.text }]}>{job.company}</Text>
                  <View style={styles.ratingContainer}>
                    <Shield size={14} color={colors.success} />
                    <Text style={[styles.ratingText, { color: colors.success }]}>Verified Employer</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity 
                style={[styles.contactButton, { backgroundColor: colors.backgroundAlt }]}
                onPress={() => console.log('Contact company')}
              >
                <MessageSquare size={18} color={colors.primary} />
                <Text style={[styles.contactButtonText, { color: colors.primary }]}>Message</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={[styles.footer, { backgroundColor: colors.card }]}>
        <View style={[styles.cancellationInfo, { backgroundColor: colors.warningLight }]}>
          <Info size={16} color={colors.warning} />
          <Text style={[styles.cancellationText, { color: colors.warning }]}>
            Cancellation within 2 hours incurs a fee
          </Text>
        </View>
        
        <TouchableOpacity
          style={[
            styles.applyButton,
            { backgroundColor: colors.primary },
            applying && { opacity: 0.7 }
          ]}
          onPress={handleApply}
          disabled={applying}
        >
          {applying ? (
            <Text style={[styles.applyButtonText, { color: colors.cardText }]}>Applying...</Text>
          ) : (
            <Text style={[styles.applyButtonText, { color: colors.cardText }]}>Apply Now</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
    height: 250,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badgeContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  detailsContainer: {
    padding: 24,
    paddingBottom: 120,
  },
  jobTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    marginBottom: 8,
  },
  companyName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginBottom: 24,
  },
  infoSection: {
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  infoItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginBottom: 4,
  },
  infoValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  divider: {
    height: 1,
    marginVertical: 24,
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginBottom: 16,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
  },
  gearList: {
    marginTop: 8,
  },
  companyCard: {
    borderRadius: 12,
    padding: 16,
  },
  companyHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  companyLogo: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 16,
  },
  companyInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  companyCardName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginLeft: 4,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  contactButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    marginLeft: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
  },
  cancellationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  cancellationText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginLeft: 8,
  },
  applyButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  errorText: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    marginBottom: 24,
  },
  backButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
});