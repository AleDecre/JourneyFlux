import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../utils/theme';

const ChallengeCard = ({ challenge, onPress }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'facile':
        return '#4ECDC4';
      case 'media':
        return '#FFB74D';
      case 'difficile':
        return '#FF6B6B';
      default:
        return '#95A5A6';
    }
  };

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'gastronomia':
        return ['#FF6B6B', '#FF8E8E'];
      case 'cultura':
        return ['#4ECDC4', '#7ED5D1'];
      case 'natura':
        return ['#45B7D1', '#6AC5E5'];
      case 'arte':
        return ['#F06292', '#F48FB1'];
      default:
        return ['#95A5A6', '#B2BFC6'];
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <LinearGradient
        colors={getCategoryColor(challenge.category)}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.emoji}>{challenge.image}</Text>
          <View style={styles.statusContainer}>
            {challenge.completed && (
              <View style={styles.completedBadge}>
                <Text style={styles.completedText}>✓</Text>
              </View>
            )}
          </View>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>{challenge.title}</Text>
          <Text style={styles.location}>{challenge.location}</Text>
          
          <View style={styles.footer}>
            <View style={styles.infoRow}>
              <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(challenge.difficulty) }]}>
                <Text style={styles.difficultyText}>{challenge.difficulty}</Text>
              </View>
              <View style={styles.pointsContainer}>
                <Text style={styles.pointsText}>{challenge.points} pts</Text>
              </View>
            </View>
            
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryText}>{challenge.category}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  gradient: {
    borderRadius: 16,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  emoji: {
    fontSize: 32,
  },
  statusContainer: {
    flexDirection: 'row',
  },
  completedBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedText: {
    color: '#27AE60',
    fontSize: 14,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: theme.fonts.sizes.heading,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  location: {
    fontSize: theme.fonts.sizes.small,
    fontFamily: theme.fonts.regular,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 12,
  },
  footer: {
    marginTop: 'auto',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    color: '#FFFFFF',
    fontSize: theme.fonts.sizes.tiny,
    fontFamily: theme.fonts.semiBold,
  },
  pointsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pointsText: {
    color: '#FFFFFF',
    fontSize: theme.fonts.sizes.tiny,
    fontFamily: theme.fonts.bold,
  },
  categoryContainer: {
    alignSelf: 'flex-start',
  },
  categoryText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: theme.fonts.sizes.tiny,
    fontFamily: theme.fonts.medium,
  },
});

export default ChallengeCard;
