import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../utils/theme';
import { usePlanner } from '../../context/PlannerContext';
import HybridItineraryCard from '../../components/HybridItineraryCard';
import GeoReminderBanner from '../../components/GeoReminderBanner';
import { useGeoReminder } from '../../hooks/useGeoReminder';

const HybridItineraryScreen = ({ navigation }) => {
  const { state, actions } = usePlanner();
  const { generatedItinerary, currentTrip } = state;
  const [selectedDay, setSelectedDay] = useState(0);
  const [expandedStep, setExpandedStep] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  
  // Geo reminder hook
  const { nearbySteps, updateLocation } = useGeoReminder(
    generatedItinerary.days[selectedDay]?.steps || []
  );

  useEffect(() => {
    if (!generatedItinerary.id) {
      navigation.navigate('Planner');
      return;
    }
    
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [generatedItinerary]);

  const handleStartTrip = () => {
    Alert.alert(
      'Inizia il viaggio',
      'Vuoi iniziare il tuo viaggio ora? Riceverai notifiche quando sei vicino alle tappe.',
      [
        { text: 'Annulla', style: 'cancel' },
        { 
          text: 'Inizia', 
          onPress: () => {
            const allSteps = generatedItinerary.days.flatMap(day => day.steps);
            actions.startTrip(allSteps);
            // Mock location update
            updateLocation({ lat: 41.9028, lng: 12.4964 }); // Rome center
          }
        },
      ]
    );
  };

  const handleStepPress = (step) => {
    setExpandedStep(expandedStep === step.id ? null : step.id);
  };

  const handleCompleteStep = (step) => {
    Alert.alert(
      'Completa tappa',
      `Hai completato "${step.title}"?`,
      [
        { text: 'Annulla', style: 'cancel' },
        { 
          text: 'Completa', 
          onPress: () => {
            actions.completeStep(step.id, step.points || 100, step.badge, null);
            // Navigate to completion screen if needed
            navigation.navigate('ExperienceComplete', {
              type: 'step',
              title: step.title,
              points: step.points || 100,
              badge: step.badge,
            });
          }
        },
      ]
    );
  };

  const renderDayTabs = () => {
    if (!generatedItinerary.days || generatedItinerary.days.length <= 1) return null;
    
    return (
      <View style={styles.dayTabsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dayTabsContent}
        >
          {generatedItinerary.days.map((day, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayTab,
                selectedDay === index && styles.selectedDayTab,
              ]}
              onPress={() => setSelectedDay(index)}
            >
              <Text style={[
                styles.dayTabText,
                selectedDay === index && styles.selectedDayTabText,
              ]}>
                Giorno {index + 1}
              </Text>
              {day.date && (
                <Text style={[
                  styles.dayTabDate,
                  selectedDay === index && styles.selectedDayTabDate,
                ]}>
                  {new Date(day.date).toLocaleDateString('it-IT', {
                    day: 'numeric',
                    month: 'short',
                  })}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderItinerarySummary = () => {
    return (
      <View style={styles.summaryContainer}>
        <Text style={styles.itineraryTitle}>{generatedItinerary.title}</Text>
        <View style={styles.summaryStats}>
          <View style={styles.statItem}>
            <Ionicons name="time" size={16} color={theme.colors.primary} />
            <Text style={styles.statText}>
              {generatedItinerary.totalDuration} min
            </Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="wallet" size={16} color={theme.colors.primary} />
            <Text style={styles.statText}>
              €{generatedItinerary.totalEstimatedCost}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="location" size={16} color={theme.colors.primary} />
            <Text style={styles.statText}>
              {generatedItinerary.days.reduce((sum, day) => sum + day.steps.length, 0)} tappe
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderStepsList = () => {
    const currentDay = generatedItinerary.days[selectedDay];
    if (!currentDay || !currentDay.steps) return null;

    return (
      <View style={styles.stepsContainer}>
        <Text style={styles.stepsTitle}>
          📍 Tappe del giorno {selectedDay + 1}
        </Text>
        
        {currentDay.steps.map((step, index) => (
          <HybridItineraryCard
            key={step.id}
            step={step}
            index={index}
            isExpanded={expandedStep === step.id}
            isCompleted={currentTrip.completedSteps.some(completed => completed.id === step.id)}
            isNearby={nearbySteps.includes(step.id)}
            onPress={() => handleStepPress(step)}
            onComplete={() => handleCompleteStep(step)}
          />
        ))}
      </View>
    );
  };

  if (!generatedItinerary.id) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nessun itinerario generato</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#F8F9FA', '#E9ECEF']}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Il tuo itinerario</Text>
          <TouchableOpacity 
            style={styles.shareButton}
            onPress={() => {
              // TODO: Implement share functionality
              Alert.alert('Condividi', 'Funzionalità in arrivo!');
            }}
          >
            <Ionicons name="share-outline" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Geo Reminder Banner */}
        {nearbySteps.length > 0 && (
          <GeoReminderBanner
            nearbySteps={nearbySteps}
            onDismiss={() => {}}
          />
        )}

        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Itinerary Summary */}
            {renderItinerarySummary()}

            {/* Day Tabs */}
            {renderDayTabs()}

            {/* Steps List */}
            {renderStepsList()}

            {/* Bottom spacing */}
            <View style={styles.bottomSpacing} />
          </ScrollView>
        </Animated.View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          {!currentTrip.isActive ? (
            <TouchableOpacity
              style={styles.startTripButton}
              onPress={handleStartTrip}
            >
              <LinearGradient
                colors={theme.gradients.primary}
                style={styles.startTripGradient}
              >
                <Ionicons name="play" size={24} color={theme.colors.surface} />
                <Text style={styles.startTripText}>Inizia il viaggio</Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <View style={styles.tripStatusContainer}>
              <View style={styles.tripStatusBadge}>
                <Ionicons name="navigation" size={16} color={theme.colors.success} />
                <Text style={styles.tripStatusText}>Viaggio in corso</Text>
              </View>
              <Text style={styles.tripStatusSubtext}>
                {currentTrip.completedSteps.length} / {currentTrip.remainingSteps.length + currentTrip.completedSteps.length} tappe completate
              </Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  backButton: {
    padding: theme.spacing.sm,
  },
  headerTitle: {
    flex: 1,
    fontSize: theme.fonts.sizes.heading,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.text,
    textAlign: 'center',
    marginLeft: -32,
  },
  shareButton: {
    padding: theme.spacing.sm,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xxl,
  },
  summaryContainer: {
    margin: theme.spacing.lg,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.large,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itineraryTitle: {
    fontSize: theme.fonts.sizes.title,
    fontWeight: theme.fonts.weights.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: theme.fonts.sizes.body,
    color: theme.colors.text,
    marginLeft: theme.spacing.xs,
    fontWeight: theme.fonts.weights.medium,
  },
  dayTabsContainer: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  dayTabsContent: {
    paddingHorizontal: theme.spacing.xs,
  },
  dayTab: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    marginRight: theme.spacing.sm,
    borderRadius: theme.borderRadius.medium,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  selectedDayTab: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  dayTabText: {
    fontSize: theme.fonts.sizes.body,
    fontWeight: theme.fonts.weights.medium,
    color: theme.colors.text,
  },
  selectedDayTabText: {
    color: theme.colors.surface,
  },
  dayTabDate: {
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  selectedDayTabDate: {
    color: theme.colors.surface,
  },
  stepsContainer: {
    marginHorizontal: theme.spacing.lg,
  },
  stepsTitle: {
    fontSize: theme.fonts.sizes.subheading,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  actionsContainer: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  startTripButton: {
    borderRadius: theme.borderRadius.medium,
    overflow: 'hidden',
  },
  startTripGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.lg,
  },
  startTripText: {
    fontSize: theme.fonts.sizes.subheading,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.surface,
    marginLeft: theme.spacing.sm,
  },
  tripStatusContainer: {
    alignItems: 'center',
  },
  tripStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.success + '20',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.medium,
    marginBottom: theme.spacing.sm,
  },
  tripStatusText: {
    fontSize: theme.fonts.sizes.body,
    fontWeight: theme.fonts.weights.medium,
    color: theme.colors.success,
    marginLeft: theme.spacing.xs,
  },
  tripStatusSubtext: {
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.textSecondary,
  },
  bottomSpacing: {
    height: theme.spacing.xxl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: theme.fonts.sizes.subheading,
    color: theme.colors.textSecondary,
  },
});

export default HybridItineraryScreen;
