import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../utils/theme';

const HybridItineraryCard = ({ 
  step, 
  index, 
  isExpanded, 
  isCompleted, 
  isNearby, 
  onPress, 
  onComplete 
}) => {
  const getStepTypeColor = (type) => {
    switch (type) {
      case 'narrative':
        return theme.gradients.primary;
      case 'partner':
        return theme.gradients.sunset;
      case 'itinerary':
        return theme.gradients.ocean;
      case 'custom':
        return theme.gradients.purple;
      default:
        return theme.gradients.primary;
    }
  };

  const getStepTypeIcon = (type) => {
    switch (type) {
      case 'narrative':
        return 'book';
      case 'partner':
        return 'business';
      case 'itinerary':
        return 'map';
      case 'custom':
        return 'star';
      default:
        return 'location';
    }
  };

  const getStepStatusIcon = () => {
    if (isCompleted) return 'checkmark-circle';
    if (isNearby) return 'location';
    return 'radio-button-off';
  };

  const getStepStatusColor = () => {
    if (isCompleted) return theme.colors.success;
    if (isNearby) return theme.colors.warning;
    return theme.colors.textSecondary;
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isNearby && styles.nearbyContainer,
        isCompleted && styles.completedContainer,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Step number badge */}
      <View style={styles.stepNumberContainer}>
        <LinearGradient
          colors={getStepTypeColor(step.type)}
          style={styles.stepNumberBadge}
        >
          <Text style={styles.stepNumberText}>{index + 1}</Text>
        </LinearGradient>
      </View>

      {/* Main content */}
      <View style={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.titleRow}>
              <Ionicons 
                name={getStepTypeIcon(step.type)} 
                size={20} 
                color={theme.colors.primary} 
              />
              <Text style={styles.title}>{step.title}</Text>
            </View>
            
            {step.estimatedTime && (
              <View style={styles.timeRow}>
                <Ionicons name="time" size={14} color={theme.colors.textSecondary} />
                <Text style={styles.timeText}>{step.estimatedTime}</Text>
              </View>
            )}
          </View>

          <View style={styles.headerRight}>
            <Ionicons
              name={getStepStatusIcon()}
              size={24}
              color={getStepStatusColor()}
            />
          </View>
        </View>

        {/* Description */}
        <Text style={styles.description} numberOfLines={isExpanded ? 0 : 2}>
          {step.description}
        </Text>

        {/* Expanded content */}
        {isExpanded && (
          <View style={styles.expandedContent}>
            {/* Location */}
            {step.location && (
              <View style={styles.infoRow}>
                <Ionicons name="location-outline" size={16} color={theme.colors.textSecondary} />
                <Text style={styles.infoText}>{step.location}</Text>
              </View>
            )}

            {/* Cost */}
            {step.estimatedCost && (
              <View style={styles.infoRow}>
                <Ionicons name="wallet-outline" size={16} color={theme.colors.textSecondary} />
                <Text style={styles.infoText}>€{step.estimatedCost}</Text>
              </View>
            )}

            {/* Points */}
            {step.points && (
              <View style={styles.infoRow}>
                <Ionicons name="star-outline" size={16} color={theme.colors.textSecondary} />
                <Text style={styles.infoText}>{step.points} punti</Text>
              </View>
            )}

            {/* Tags */}
            {step.tags && step.tags.length > 0 && (
              <View style={styles.tagsContainer}>
                {step.tags.map((tag, tagIndex) => (
                  <View key={tagIndex} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Action buttons */}
            <View style={styles.actionsContainer}>
              {!isCompleted && (
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={onComplete}
                >
                  <LinearGradient
                    colors={theme.gradients.success}
                    style={styles.actionButtonGradient}
                  >
                    <Ionicons name="checkmark" size={16} color={theme.colors.surface} />
                    <Text style={styles.actionButtonText}>Completa</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}

              {step.type === 'partner' && (
                <TouchableOpacity
                  style={[styles.actionButton, styles.secondaryActionButton]}
                  onPress={() => {
                    // TODO: Handle partner experience navigation
                  }}
                >
                  <View style={styles.secondaryActionButtonContent}>
                    <Ionicons name="gift" size={16} color={theme.colors.primary} />
                    <Text style={styles.secondaryActionButtonText}>Offerta</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}

        {/* Nearby banner */}
        {isNearby && !isCompleted && (
          <View style={styles.nearbyBanner}>
            <Ionicons name="location" size={16} color={theme.colors.warning} />
            <Text style={styles.nearbyText}>Sei vicino a questa tappa!</Text>
          </View>
        )}

        {/* Completed banner */}
        {isCompleted && (
          <View style={styles.completedBanner}>
            <Ionicons name="checkmark-circle" size={16} color={theme.colors.success} />
            <Text style={styles.completedText}>Tappa completata</Text>
          </View>
        )}
      </View>

      {/* Expand indicator */}
      <View style={styles.expandIndicator}>
        <Ionicons
          name={isExpanded ? "chevron-up" : "chevron-down"}
          size={20}
          color={theme.colors.textSecondary}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.lg,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nearbyContainer: {
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.warning,
  },
  completedContainer: {
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.success,
    opacity: 0.8,
  },
  stepNumberContainer: {
    marginRight: theme.spacing.md,
  },
  stepNumberBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    fontSize: theme.fonts.sizes.body,
    fontWeight: theme.fonts.weights.bold,
    color: theme.colors.surface,
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    marginLeft: theme.spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  title: {
    fontSize: theme.fonts.sizes.subheading,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.text,
    marginLeft: theme.spacing.sm,
    flex: 1,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
  },
  description: {
    fontSize: theme.fonts.sizes.body,
    color: theme.colors.textSecondary,
    lineHeight: 20,
    marginBottom: theme.spacing.sm,
  },
  expandedContent: {
    marginTop: theme.spacing.sm,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  infoText: {
    fontSize: theme.fonts.sizes.body,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.sm,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: theme.spacing.md,
  },
  tag: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.small,
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
  },
  tagText: {
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.textSecondary,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  actionButton: {
    flex: 1,
    borderRadius: theme.borderRadius.medium,
    overflow: 'hidden',
  },
  actionButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
  },
  actionButtonText: {
    fontSize: theme.fonts.sizes.body,
    fontWeight: theme.fonts.weights.medium,
    color: theme.colors.surface,
    marginLeft: theme.spacing.xs,
  },
  secondaryActionButton: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.surface,
  },
  secondaryActionButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
  },
  secondaryActionButtonText: {
    fontSize: theme.fonts.sizes.body,
    fontWeight: theme.fonts.weights.medium,
    color: theme.colors.primary,
    marginLeft: theme.spacing.xs,
  },
  nearbyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.warning + '20',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.small,
    marginTop: theme.spacing.sm,
  },
  nearbyText: {
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.warning,
    fontWeight: theme.fonts.weights.medium,
    marginLeft: theme.spacing.xs,
  },
  completedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.success + '20',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.small,
    marginTop: theme.spacing.sm,
  },
  completedText: {
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.success,
    fontWeight: theme.fonts.weights.medium,
    marginLeft: theme.spacing.xs,
  },
  expandIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    marginLeft: theme.spacing.sm,
  },
});

export default HybridItineraryCard;
