import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../utils/theme';

const ChallengeCard = ({ challenge, onPress }) => {
  const getDifficultyColor = (difficulty) => {
    if (!difficulty) return '#95A5A6';
    
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
    if (!category) return ['#95A5A6', '#B2BFC6'];
    
    switch (category.toLowerCase()) {
      case 'gastronomia':
        return ['#FF6B6B', '#FF8E8E'];
      case 'cultura':
        return ['#4ECDC4', '#7ED5D1'];
      case 'natura':
        return ['#45B7D1', '#6AC5E5'];
      case 'arte':
        return ['#F06292', '#F48FB1'];
      case 'mistero':
        return ['#8B5CF6', '#A78BFA'];
      case 'leggenda':
        return ['#F59E0B', '#FCD34D'];
      case 'storia':
        return ['#DC2626', '#F87171'];
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
          <View style={styles.typeContainerBanner}>
            <Text style={styles.typeIcon}>{challenge.image}</Text>
            <Text style={styles.typeLabel}>{challenge.category ? challenge.category.charAt(0).toUpperCase() + challenge.category.slice(1) : 'Sfida'}</Text>
          </View>
          <View style={styles.statusContainer}>
            {challenge.completed && (
              <View style={styles.completedBadge}>
                <Text style={styles.completedText}>✓</Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>{challenge.title || 'Titolo mancante'}</Text>
          <View style={styles.footer}>
            <View style={styles.infoRow}>
              <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(challenge.difficulty) }]}> 
                <Text style={styles.difficultyText}>{challenge.difficulty || 'N/A'}</Text>
              </View>
              <View style={styles.pointsContainer}>
                <Text style={styles.pointsText}>{challenge.points || 0} pts</Text>
              </View>
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
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      },
    }),
    backgroundColor: 'transparent',
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
  typeContainerBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  typeIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  typeLabel: {
    fontSize: 13,
    fontFamily: theme.fonts.semiBold,
    color: '#FFFFFF',
    textTransform: 'capitalize',
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
