import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const ItineraryCard = ({ itinerary, onPress }) => {
  if (!itinerary) return null;

  // Colori per tipo itinerario
  const getTypeColors = (type) => {
    const colors = {
      'community': ['#4ECDC4', '#7ED5D1'], // Turchese
      'tour_operator': ['#667eea', '#764ba2'], // Blu-viola
      'default': ['#6B7280', '#9CA3AF'] // Grigio
    };
    return colors[type] || colors.default;
  };

  const getTypeIcon = (type) => {
    const icons = {
      'community': 'people-outline',
      'tour_operator': 'business-outline',
      'default': 'map-outline'
    };
    return icons[type] || icons.default;
  };

  const typeColors = getTypeColors(itinerary.type);
  const typeIcon = getTypeIcon(itinerary.type);

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={typeColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Header con tipo e rating */}
        <View style={styles.header}>
          <View style={styles.typeContainer}>
            <Ionicons name={typeIcon} size={20} color="#FFFFFF" />
            <Text style={styles.typeText}>
              {itinerary.type === 'community' ? 'Community' : 'Tour Operator'}
            </Text>
          </View>
          {itinerary.rating && (
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{itinerary.rating}</Text>
            </View>
          )}
        </View>

        {/* Contenuto principale */}
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {itinerary.title}
          </Text>
          <Text style={styles.description} numberOfLines={3}>
            {itinerary.description}
          </Text>
        </View>

        {/* Creator info (se community) */}
        {itinerary.creator && (
          <View style={styles.creatorSection}>
            <Ionicons name="person-circle-outline" size={16} color="rgba(255,255,255,0.8)" />
            <Text style={styles.creatorText}>
              by {itinerary.creator.name}
            </Text>
            {itinerary.creator.verified && (
              <Ionicons name="checkmark-circle" size={14} color="#10B981" />
            )}
          </View>
        )}

        {/* Info bottom */}
        <View style={styles.footer}>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="location-outline" size={16} color="rgba(255,255,255,0.8)" />
              <Text style={styles.infoText}>{itinerary.city}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={16} color="rgba(255,255,255,0.8)" />
              <Text style={styles.infoText}>{itinerary.duration}</Text>
            </View>
          </View>
          
          <View style={styles.bottomRow}>
            <View style={styles.costContainer}>
              <Text style={styles.costText}>
                {itinerary.estimatedCost}
              </Text>
            </View>
            {itinerary.booking?.required && (
              <View style={styles.bookingBadge}>
                <Ionicons name="calendar-outline" size={12} color="#FFFFFF" />
                <Text style={styles.bookingText}>Prenotazione</Text>
              </View>
            )}
          </View>
        </View>

        {/* Indicatore featured */}
        {itinerary.featured && (
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
    minHeight: 180,
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
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  typeText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 2,
  },
  ratingText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
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
  creatorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  creatorText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
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
  costContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  costText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  bookingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  bookingText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
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

export default ItineraryCard;
