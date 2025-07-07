import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../utils/theme';

const NarrativePathCard = ({ narrativePath, onPress }) => {
  if (!narrativePath) return null;

  const getCategoryColors = (category) => {
    const colors = {
      'mistero': ['#6B46C1', '#9333EA'],
      'leggenda': ['#DC2626', '#EF4444'],
      'storia': ['#059669', '#10B981'],
      'arte': ['#DC2626', '#F59E0B'],
      'cultura': ['#1D4ED8', '#3B82F6'],
      'default': ['#4ECDC4', '#7ED5D1']
    };
    return colors[category] || colors.default;
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'facile': return '🟢';
      case 'media': return '🟡';
      case 'difficile': return '🔴';
      default: return '⚪';
    }
  };

  const categoryColors = getCategoryColors(narrativePath.category);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <LinearGradient
        colors={categoryColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryIcon}>🎭</Text>
            <Text style={styles.categoryLabel}>{narrativePath.category}</Text>
          </View>
          {narrativePath.completed && (
            <View style={styles.completedBadge}>
              <Text style={styles.completedText}>✓</Text>
            </View>
          )}
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {narrativePath.title}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {narrativePath.description}
          </Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>📍 {narrativePath.city}</Text>
            <Text style={styles.infoText}>⏱️ {narrativePath.duration}</Text>
          </View>
          <View style={styles.bottomRow}>
            <View style={styles.difficultyContainer}>
              <Text style={styles.difficultyIcon}>{getDifficultyIcon(narrativePath.difficulty)}</Text>
              <Text style={styles.difficultyText}>{narrativePath.difficulty}</Text>
            </View>
            <Text style={styles.pointsText}>{narrativePath.rewards?.points || 0} punti</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginBottom: 16,
    marginHorizontal: 16, // margine come ChallengeCard
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  gradient: {
    padding: 20,
    borderRadius: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  categoryLabel: {
    fontSize: 12,
    fontFamily: theme.fonts.semiBold,
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },
  completedBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  completedText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
    marginBottom: 8,
    lineHeight: 22,
  },
  description: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 18,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  difficultyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  difficultyText: {
    fontSize: 12,
    fontFamily: theme.fonts.semiBold,
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },
  pointsText: {
    fontSize: 14,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
  },
});

export default NarrativePathCard;
