import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import Colors from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';
import { LogOut, Moon, Sun, Star, Award, MapPin, Briefcase, ChevronRight, Camera } from 'lucide-react-native';
import ProfileSection from '@/components/profile/ProfileSection';
import TrustScore from '@/components/profile/TrustScore';
import * as ImagePicker from 'expo-image-picker';

export interface User {
  firstName: string;
  lastName: string;
}

export default function ProfileScreen() {
  const { theme, toggleTheme } = useTheme();
  const colors = Colors[theme];
  const { user, signOut } = useAuth();
  
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  const workHistory = [
    { id: '1', title: 'Warehouse Assistant', company: 'FastLogistics Inc.', date: 'Apr 28, 2025', rating: 4.8 },
    { id: '2', title: 'Event Staff', company: 'City Event Center', date: 'Apr 22, 2025', rating: 5.0 },
    { id: '3', title: 'Delivery Driver', company: 'Quick Delivery Co.', date: 'Apr 15, 2025', rating: 4.5 },
  ];
  
  const skills = [
    { id: '1', name: 'Customer Service' },
    { id: '2', name: 'Warehouse Operations' },
    { id: '3', name: 'Delivery' },
    { id: '4', name: 'Event Management' },
    { id: '5', name: 'Food Service' },
  ];
  
  const certifications = [
    { id: '1', name: 'Food Handler Certificate', issueDate: 'Jan 2025', expiryDate: 'Jan 2026' },
    { id: '2', name: 'Forklift Operator License', issueDate: 'Mar 2025', expiryDate: 'Mar 2027' },
  ];

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      
      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log('Error picking image:', error);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.profileCard, { backgroundColor: colors.card }]}>
        <View style={styles.profileImageContainer}>
          <Image
            source={
              profileImage 
                ? { uri: profileImage } 
                : { uri: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }
            }
            style={styles.profileImage}
          />
          <TouchableOpacity 
            style={[styles.cameraButton, { backgroundColor: colors.primary }]} 
            onPress={pickImage}
          >
            <Camera size={16} color={colors.cardText} />
          </TouchableOpacity>
        </View>
        
        <Text style={[styles.name, { color: colors.text }]}>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text style={[styles.bio, { color: colors.textDim }]}>
          Experienced worker with 4+ years in various roles
        </Text>
        
        <View style={[styles.locationContainer, { backgroundColor: colors.backgroundAlt }]}>
          <MapPin size={16} color={colors.primary} />
          <Text style={[styles.location, { color: colors.textDim }]}>San Francisco, CA</Text>
        </View>
        
        <View style={styles.rankContainer}>
          <TrustScore score={92} theme={theme} />
        </View>
      </View>
      
      <ProfileSection
        title="Skills"
        theme={theme}
        content={
          <View style={styles.skillsContainer}>
            {skills.map(skill => (
              <View 
                key={skill.id} 
                style={[styles.skillBadge, { backgroundColor: colors.backgroundAlt }]}
              >
                <Text style={[styles.skillText, { color: colors.text }]}>{skill.name}</Text>
              </View>
            ))}
          </View>
        }
      />
      
      <ProfileSection
        title="Work History"
        theme={theme}
        content={
          <View>
            {workHistory.map(job => (
              <View key={job.id} style={[styles.historyItem, { borderBottomColor: colors.border }]}>
                <View style={styles.historyContent}>
                  <Text style={[styles.historyTitle, { color: colors.text }]}>{job.title}</Text>
                  <Text style={[styles.historyCompany, { color: colors.textDim }]}>{job.company}</Text>
                  <Text style={[styles.historyDate, { color: colors.textDim }]}>{job.date}</Text>
                </View>
                <View style={styles.historyRating}>
                  <Star size={16} color={colors.accent} />
                  <Text style={[styles.ratingText, { color: colors.text }]}>{job.rating}</Text>
                </View>
              </View>
            ))}
          </View>
        }
      />
      
      <ProfileSection
        title="Certifications"
        theme={theme}
        content={
          <View>
            {certifications.map(cert => (
              <View key={cert.id} style={[styles.certItem, { borderBottomColor: colors.border }]}>
                <Award size={20} color={colors.primary} />
                <View style={styles.certContent}>
                  <Text style={[styles.certName, { color: colors.text }]}>{cert.name}</Text>
                  <Text style={[styles.certDate, { color: colors.textDim }]}>
                    Valid: {cert.issueDate} - {cert.expiryDate}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        }
      />
      
      <View style={styles.settingsSection}>
        <TouchableOpacity 
          style={[styles.settingsItem, { backgroundColor: colors.card }]}
          onPress={toggleTheme}
        >
          {theme === 'light' ? (
            <Moon size={22} color={colors.text} />
          ) : (
            <Sun size={22} color={colors.text} />
          )}
          <Text style={[styles.settingsText, { color: colors.text }]}>
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </Text>
          <ChevronRight size={20} color={colors.textDim} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.settingsItem, { backgroundColor: colors.card }]}
          onPress={signOut}
        >
          <LogOut size={22} color={colors.error} />
          <Text style={[styles.settingsText, { color: colors.error }]}>Sign Out</Text>
          <ChevronRight size={20} color={colors.textDim} />
        </TouchableOpacity>
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
    paddingBottom: 40,
  },
  profileCard: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 4,
  },
  bio: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  location: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: 4,
  },
  rankContainer: {
    width: '100%',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  historyContent: {
    flex: 1,
  },
  historyTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  historyCompany: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 4,
  },
  historyDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  historyRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    marginLeft: 4,
  },
  certItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  certContent: {
    marginLeft: 12,
  },
  certName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  certDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  settingsSection: {
    marginTop: 8,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  settingsText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    flex: 1,
    marginLeft: 12,
  },
});