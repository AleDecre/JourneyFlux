import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../utils/theme';

const ItineraryCard = ({ itinerary, onPress }) => {
  if (!itinerary) return null;

  const gradientColors = itinerary.type === 'community' 
    ? ['#FF6B6B', '#FF8E8E']
    : ['#45B7D1', '#6AC5E5'];

  const typeIcon = itinerary.type === 'community' ? '👥' : '🎯';
  const typeLabel = itinerary.type === 'community' ? 'Community' : 'Tour Operator';

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
          <View style={styles.typeContainer}>
            <Text style={styles.typeIcon}>{typeIcon}</Text>
            <Text style={styles.typeLabel}>{typeLabel}</Text>
          </View>
          {itinerary.featured && (
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredText}>⭐</Text>
            </View>
          )}
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {itinerary.title}
          </Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>
              ⏱️ {itinerary.duration}
            </Text>
            <Text style={styles.infoText}>
              💰 {itinerary.estimatedCost}
            </Text>
          </View>

          {itinerary.creator && (
            <View style={styles.creatorRow}>
              <Text style={styles.creatorText}>
                👤 {itinerary.creator.name}
              </Text>
              {itinerary.creator.verified && (
                <Text style={styles.verifiedIcon}>✓</Text>
              )}
            </View>
          )}

          {itinerary.rating && (
            <View style={styles.ratingRow}>
              <Text style={styles.ratingText}>
                ⭐ {itinerary.rating}/5
              </Text>
              <Text style={styles.reviewsText}>
                ({itinerary.reviewsCount || 0} recensioni)
              </Text>
            </View>
          )}
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
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  typeIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  typeLabel: {
    fontSize: 12,
    fontFamily: theme.fonts.semiBold,
    color: '#FFFFFF',
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
    marginBottom: 12,
    lineHeight: 22,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  creatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  creatorText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: 'rgba(255, 255, 255, 0.9)',
    marginRight: 6,
  },
  verifiedIcon: {
    fontSize: 14,
    color: '#FFFFFF',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontFamily: theme.fonts.semiBold,
    color: '#FFFFFF',
    marginRight: 8,
  },
  reviewsText: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: 'rgba(255, 255, 255, 0.8)',
  },
});

export default ItineraryCard;
