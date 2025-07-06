import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const NarrativePathCard = ({ narrativePath, onPress }) => {
  if (!narrativePath) return null;

  // Colori per categoria narrativa
  const getCategoryColors = (category) => {
    const colors = {
      'mistero': ['#6B46C1', '#9333EA'], // Viola
      'leggenda': ['#DC2626', '#EF4444'], // Rosso
      'storia': ['#059669', '#10B981'], // Verde
      'arte': ['#DC2626', '#F59E0B'], // Rosso-arancio
      'cultura': ['#1D4ED8', '#3B82F6'], // Blu
      'default': ['#6B7280', '#9CA3AF'] // Grigio
    };
    return colors[category] || colors.default;
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'facile': '#10B981',
      'media': '#F59E0B', 
      'difficile': '#EF4444',
      'default': '#6B7280'
    };
    return colors[difficulty?.toLowerCase()] || colors.default;
  };

  const categoryColors = getCategoryColors(narrativePath.category);
  const difficultyColor = getDifficultyColor(narrativePath.difficulty);

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={categoryColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Header con icona e stato */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>{narrativePath.icon}</Text>
          </View>
          {narrativePath.completed && (
            <View style={styles.completedBadge}>
              <Ionicons name="checkmark-circle" size={24} color="#10B981" />
            </View>
          )}
        </View>

        {/* Contenuto principale */}
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {narrativePath.title}
          </Text>
          <Text style={styles.description} numberOfLines={3}>
            {narrativePath.description}
          </Text>
        </View>

        {/* Info bottom */}
        <View style={styles.footer}>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="location-outline" size={16} color="rgba(255,255,255,0.8)" />
              <Text style={styles.infoText}>{narrativePath.city}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={16} color="rgba(255,255,255,0.8)" />
              <Text style={styles.infoText}>{narrativePath.duration}</Text>
            </View>
          </View>
          
          <View style={styles.bottomRow}>
            <View style={[styles.difficultyBadge, { backgroundColor: difficultyColor }]}>
              <Text style={styles.difficultyText}>
                {narrativePath.difficulty}
              </Text>
            </View>
            <View style={styles.pointsContainer}>
              <Text style={styles.pointsText}>
                {narrativePath.rewards?.points || 0} pts
              </Text>
            </View>
          </View>
        </View>

        {/* Indicatore featured */}
        {narrativePath.featured && (
          <View style={styles.featuredBadge}>
            <Ionicons name="star" size={16} color="#FFD700" />
          </View>
        )}
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
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      },
    }),
  },
  gradient: {
    borderRadius: 16,
    padding: 16,
    minHeight: 160,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  iconContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
  },
  completedBadge: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    padding: 4,
  },
  content: {
    flex: 1,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 20,
  },
  footer: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  pointsContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  pointsText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  featuredBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 8,
    padding: 4,
  },
});

export default NarrativePathCard;
