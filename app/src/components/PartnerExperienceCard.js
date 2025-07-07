import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../utils/theme';

const PartnerExperienceCard = ({ partnerExperience, onPress }) => {
  if (!partnerExperience) return null;

  const gradientColors = ['#45B7D1', '#6AC5E5'];

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'aperitivo': return '🍸';
      case 'ristorante': return '🍽️';
      case 'bar': return '☕';
      case 'bottega': return '🏪';
      case 'museo': return '🏛️';
      case 'tour': return '🚶';
      default: return '🌟';
    }
  };

  const discountPercentage = partnerExperience.experience?.discountPercentage || 0;
  const originalPrice = partnerExperience.experience?.originalPrice || '';
  const discountedPrice = partnerExperience.experience?.discountedPrice || '';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryIcon}>{getCategoryIcon(partnerExperience.category)}</Text>
            <Text style={styles.categoryLabel}>{partnerExperience.category}</Text>
          </View>
          {partnerExperience.featured && (
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredText}>⭐</Text>
            </View>
          )}
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {partnerExperience.name}
          </Text>
          <Text style={styles.partnerName} numberOfLines={1}>
            {partnerExperience.partner?.name || 'Partner locale'}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {partnerExperience.experience?.description || 'Esperienza esclusiva partner'}
          </Text>

          {/* Price Section */}
          {discountPercentage > 0 && (
            <View style={styles.priceSection}>
              <View style={styles.priceRow}>
                <Text style={styles.originalPrice}>{originalPrice}</Text>
                <Text style={styles.discountedPrice}>{discountedPrice}</Text>
              </View>
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>-{discountPercentage}%</Text>
              </View>
            </View>
          )}
        </View>

        {/* Info bottom */}
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>📍 {partnerExperience.city}</Text>
          <Text style={styles.infoText}>⏰ {partnerExperience.experience?.validHours || ''}</Text>
        </View>
        <View style={styles.bottomRow}>
          <View style={styles.pointsContainer}>
            <Text style={styles.pointsText}>{partnerExperience.rewards?.points || 0} pts</Text>
          </View>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{partnerExperience.category}</Text>
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
  featuredBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  featuredText: {
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
    marginBottom: 4,
    lineHeight: 22,
  },
  partnerName: {
    fontSize: 14,
    fontFamily: theme.fonts.semiBold,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 18,
    marginBottom: 8,
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalPrice: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: 'rgba(255, 255, 255, 0.7)',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  discountedPrice: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
  },
  discountBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    fontSize: 12,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: 'rgba(255,255,255,0.9)',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  pointsContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  pointsText: {
    fontSize: 12,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
  },
  categoryBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: theme.fonts.semiBold,
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },
});

export default PartnerExperienceCard;
