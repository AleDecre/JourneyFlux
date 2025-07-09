import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../utils/theme';

const { width } = Dimensions.get('window');

const GeoReminderBanner = ({ nearbySteps, onDismiss, onStepPress }) => {
  const [slideAnim] = useState(new Animated.Value(-100));
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (nearbySteps.length > 0) {
      setVisible(true);
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setVisible(false));
    }
  }, [nearbySteps]);

  const handleDismiss = () => {
    Animated.timing(slideAnim, {
      toValue: -100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
      onDismiss && onDismiss();
    });
  };

  const handleStepPress = (stepId) => {
    onStepPress && onStepPress(stepId);
  };

  if (!visible) return null;

  const getBannerContent = () => {
    if (nearbySteps.length === 1) {
      return {
        title: '📍 Tappa nelle vicinanze!',
        message: 'Sei vicino a una tappa del tuo itinerario',
        actionText: 'Visualizza',
      };
    } else {
      return {
        title: '📍 Tappe nelle vicinanze!',
        message: `Ci sono ${nearbySteps.length} tappe vicino a te`,
        actionText: 'Visualizza',
      };
    }
  };

  const content = getBannerContent();

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <LinearGradient
        colors={[theme.colors.warning, theme.colors.warningLight]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.content}>
          <View style={styles.leftContent}>
            <View style={styles.iconContainer}>
              <Ionicons name="location" size={24} color={theme.colors.surface} />
            </View>
            
            <View style={styles.textContainer}>
              <Text style={styles.title}>{content.title}</Text>
              <Text style={styles.message}>{content.message}</Text>
            </View>
          </View>

          <View style={styles.rightContent}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleStepPress(nearbySteps[0])}
            >
              <Text style={styles.actionButtonText}>{content.actionText}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.dismissButton}
              onPress={handleDismiss}
            >
              <Ionicons name="close" size={20} color={theme.colors.surface} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Pulse animation dot */}
        <View style={styles.pulseContainer}>
          <PulseAnimation />
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

// Componente per l'animazione del pulse
const PulseAnimation = () => {
  const [pulseAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const startPulse = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startPulse();
  }, []);

  const scale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  const opacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.3],
  });

  return (
    <Animated.View
      style={[
        styles.pulseDot,
        {
          transform: [{ scale }],
          opacity,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    elevation: 1000,
  },
  gradient: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: theme.fonts.sizes.subheading,
    fontWeight: theme.fonts.weights.bold,
    color: theme.colors.surface,
    marginBottom: theme.spacing.xs,
  },
  message: {
    fontSize: theme.fonts.sizes.body,
    color: theme.colors.surface,
    opacity: 0.9,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.medium,
    marginRight: theme.spacing.sm,
  },
  actionButtonText: {
    fontSize: theme.fonts.sizes.body,
    fontWeight: theme.fonts.weights.medium,
    color: theme.colors.surface,
  },
  dismissButton: {
    padding: theme.spacing.sm,
  },
  pulseContainer: {
    position: 'absolute',
    top: theme.spacing.md,
    left: theme.spacing.lg + 4,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.surface,
  },
});

export default GeoReminderBanner;
