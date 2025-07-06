import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const PartnerExperienceCard = ({ partnerExperience, onPress }) => {
  if (!partnerExperience) return null;

  // Colori per categoria partner
  const getCategoryColors = (category) => {
    const colors = {
      'aperitivo': ['#F06292', '#F48FB1'], // Rosa
      'degustazione': ['#FF6B6B', '#FF8E8E'], // Rosso
      'cena': ['#45B7D1', '#6AC5E5'], // Blu
      'colazione': ['#FFB74D', '#FFCC80'], // Arancio
      'default': ['#6B7280', '#9CA3AF'] // Grigio
    };
    return colors[category] || colors.default;
  };

  const getPartnerIcon = (type) => {
    const icons = {
      'bar': 'wine-outline',
      'restaurant': 'restaurant-outline',
      'bottega': 'storefront-outline',
      'default': 'business-outline'
    };
    return icons[type] || icons.default;
  };

  const categoryColors = getCategoryColors(partnerExperience.category);
  const partnerIcon = getPartnerIcon(partnerExperience.partner.type);

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
        {/* Header con partner e sconto */}
        <View style={styles.header}>
          <View style={styles.partnerContainer}>
            <Ionicons name={partnerIcon} size={20} color="#FFFFFF" />
            <Text style={styles.partnerType}>
              {partnerExperience.partner.type}
            </Text>
          </View>
          {partnerExperience.experience.discountPercentage && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>
                -{partnerExperience.experience.discountPercentage}%
              </Text>
            </View>
          )}
        </View>

        {/* Contenuto principale */}
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {partnerExperience.name}
          </Text>
          <Text style={styles.partnerName} numberOfLines={1}>
            {partnerExperience.partner.name}
          </Text>
          <Text style={styles.description} numberOfLines={3}>
            {partnerExperience.experience.description}
          </Text>
        </View>

        {/* Prezzi */}
        <View style={styles.priceSection}>
          <View style={styles.priceRow}>
            <Text style={styles.originalPrice}>
              {partnerExperience.experience.originalPrice}
            </Text>
            <Text style={styles.discountedPrice}>
              {partnerExperience.experience.discountedPrice}
            </Text>
          </View>
        </View>

        {/* Info bottom */}
        <View style={styles.footer}>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="location-outline" size={16} color="rgba(255,255,255,0.8)" />
              <Text style={styles.infoText}>{partnerExperience.city}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={16} color="rgba(255,255,255,0.8)" />
              <Text style={styles.infoText}>
                {partnerExperience.experience.validHours}
              </Text>
            </View>
          </View>
          
          <View style={styles.bottomRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>
                {partnerExperience.category}
              </Text>
            </View>
            <View style={styles.pointsContainer}>
              <Text style={styles.pointsText}>
                {partnerExperience.rewards?.points || 0} pts
              </Text>
            </View>
          </View>
        </View>

        {/* Indicatore attivo */}
        {partnerExperience.active && (
          <View style={styles.activeBadge}>
            <View style={styles.activeDot} />
            <Text style={styles.activeText}>Attivo</Text>
          </View>
        )}

        {/* Indicatore featured */}
        {partnerExperience.featured && (
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
    minHeight: 200,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  partnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  partnerType: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  discountBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  discountText: {
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
    marginBottom: 4,
  },
  partnerName: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 20,
  },
  priceSection: {
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    textDecorationLine: 'line-through',
  },
  discountedPrice: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
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
  categoryBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize',
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
  activeBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.9)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 4,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  activeText: {
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

export default PartnerExperienceCard;
