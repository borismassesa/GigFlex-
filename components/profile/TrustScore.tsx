import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { Award } from 'lucide-react-native';

interface TrustScoreProps {
  score: number;
  theme: 'light' | 'dark';
}

export default function TrustScore({ score, theme }: TrustScoreProps) {
  const colors = Colors[theme];
  
  // Calculate color based on score
  const getScoreColor = () => {
    if (score >= 90) return colors.success;
    if (score >= 70) return colors.accent;
    if (score >= 50) return colors.warning;
    return colors.error;
  };
  
  const scoreColor = getScoreColor();
  const progress = score / 100;
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Award size={18} color={scoreColor} />
          <Text style={[styles.title, { color: colors.text }]}>Trust Score</Text>
        </View>
        <Text style={[styles.score, { color: scoreColor }]}>{score}</Text>
      </View>
      
      <View style={[styles.progressContainer, { backgroundColor: colors.backgroundAlt }]}>
        <View 
          style={[
            styles.progressBar, 
            { 
              backgroundColor: scoreColor,
              width: `${progress * 100}%` 
            }
          ]} 
        />
      </View>
      
      <Text style={[styles.description, { color: colors.textDim }]}>
        {score >= 90 
          ? 'Excellent! You\'re a top-rated worker.' 
          : score >= 70 
            ? 'Great job! Your reliability is well-recognized.'
            : score >= 50
              ? 'Good standing. Keep improving to unlock more opportunities.'
              : 'Work on improving your reliability to access better gigs.'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginLeft: 8,
  },
  score: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
  },
  progressContainer: {
    height: 8,
    borderRadius: 4,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
});