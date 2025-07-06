import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const PassportBadge = ({ badge, size = 'medium', onPress, showDetails = false }) => {
  if (!badge) return null;

  // Dimensioni responsive
  const sizes = {
    small: { 
      container: 80, 
      icon: 20, 
      title: 10, 
      padding: 8,
      margin: 4
    },
    medium: { 
      container: 100, 
      icon: 24, 
      title: 12, 
      padding: 12,
      margin: 6
    },
    large: { 
      container: 120, 
      icon: 28, 
      title: 14, 
      padding: 16,
      margin: 8
    }
  };

  const currentSize = sizes[size] || sizes.medium;

  // Colori per rarità
  const getRarityColors = (rarity) => {
    const colors = {
      'common': ['#6B7280', '#9CA3AF'], // Grigio
      'rare': ['#3B82F6', '#60A5FA'], // Blu
      'epic': ['#8B5CF6', '#A78BFA'], // Viola
      'legendary': ['#F59E0B', '#FBBF24'], // Oro
      'default': ['#6B7280', '#9CA3AF']
    };
    return colors[rarity] || colors.default;
  };

  // Colori per tipo
  const getTypeColors = (type) => {
    const colors = {
      'narrative': ['#FF6B6B', '#FF8E8E'], // Rosso
      'partner': ['#4ECDC4', '#7ED5D1'], // Turchese
      'community': ['#F06292', '#F48FB1'], // Rosa
      'legacy': ['#45B7D1', '#6AC5E5'], // Blu
      'default': ['#6B7280', '#9CA3AF']
    };
    return colors[type] || colors.default;
  };

  const rarityColors = getRarityColors(badge.rarity);
  const typeColors = getTypeColors(badge.type);
  const colors = badge.rarity ? rarityColors : typeColors;

  return (
    <TouchableOpacity 
      style={[
        styles.container,
        {
          width: currentSize.container,
          height: currentSize.container,
          margin: currentSize.margin,
        }
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={!badge.earned && !onPress}
    >
      <LinearGradient
        colors={badge.earned ? colors : ['#E5E7EB', '#F3F4F6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.gradient,
          {
            padding: currentSize.padding,
          }
        ]}
      >
        {/* Badge Icon */}
        <View style={[
          styles.iconContainer,
          {
            backgroundColor: badge.earned ? 'rgba(255,255,255,0.2)' : 'rgba(107,114,128,0.2)',
          }
        ]}>
          <Text style={[
            styles.icon,
            {
              fontSize: currentSize.icon,
              opacity: badge.earned ? 1 : 0.5,
            }
          ]}>
            {badge.icon}
          </Text>
        </View>

        {/* Badge Title */}
        <Text 
          style={[
            styles.title,
            {
              fontSize: currentSize.title,
              color: badge.earned ? '#FFFFFF' : '#6B7280',
            }
          ]}
          numberOfLines={2}
        >
          {badge.name}
        </Text>

        {/* Earned Indicator */}
        {badge.earned && (
          <View style={styles.earnedIndicator}>
            <Ionicons name="checkmark-circle" size={16} color="#10B981" />
          </View>
        )}

        {/* Rarity Indicator */}
        {badge.rarity && badge.rarity !== 'common' && (
          <View style={[
            styles.rarityIndicator,
            {
              backgroundColor: badge.rarity === 'legendary' ? '#F59E0B' : 
                             badge.rarity === 'epic' ? '#8B5CF6' : '#3B82F6'
            }
          ]}>
            <Ionicons 
              name={badge.rarity === 'legendary' ? 'star' : 
                    badge.rarity === 'epic' ? 'diamond' : 'medal'} 
              size={10} 
              color="#FFFFFF" 
            />
          </View>
        )}

        {/* Lock Indicator for unearned badges */}
        {!badge.earned && (
          <View style={styles.lockIndicator}>
            <Ionicons name="lock-closed" size={12} color="#6B7280" />
          </View>
        )}
      </LinearGradient>

      {/* Badge Details (optional) */}
      {showDetails && badge.earned && (
        <View style={styles.detailsContainer}>
          <Text style={styles.earnedDate}>
            {badge.earnedDate ? new Date(badge.earnedDate).toLocaleDateString('it-IT') : 'Oggi'}
          </Text>
          {badge.type && (
            <Text style={styles.badgeType}>
              {badge.type === 'narrative' ? 'Narrativo' :
               badge.type === 'partner' ? 'Partner' :
               badge.type === 'community' ? 'Community' : 'Legacy'}
            </Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      },
    }),
  },
  gradient: {
    borderRadius: 16,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  iconContainer: {
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 14,
  },
  earnedIndicator: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 8,
    padding: 2,
  },
  rarityIndicator: {
    position: 'absolute',
    top: 4,
    left: 4,
    borderRadius: 6,
    padding: 2,
  },
  lockIndicator: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 8,
    padding: 2,
  },
  detailsContainer: {
    marginTop: 4,
    alignItems: 'center',
  },
  earnedDate: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '500',
  },
  badgeType: {
    fontSize: 9,
    color: '#9CA3AF',
    fontWeight: '400',
    textTransform: 'uppercase',
  },
});

export default PassportBadge;
