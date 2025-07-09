import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../utils/theme';
import { usePlanner } from '../../context/PlannerContext';
import CalendarPicker from '../../components/CalendarPicker';
import ItineraryViewer from '../../components/ItineraryViewer';
import { generateItinerary } from '../../utils/helpers';

const PlannerScreen = ({ navigation }) => {
  const { state, actions } = usePlanner();
  const [selectedDates, setSelectedDates] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const { userPreferences } = state;

  useEffect(() => {
    // If no preferences, redirect to onboarding
    if (!userPreferences.duration || !userPreferences.selectedCity) {
      navigation.navigate('PlannerTab', { screen: 'OnboardingChat' });
    }
  }, [userPreferences]);

  const handleDateSelection = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    
    if (selectedDates.includes(dateStr)) {
      setSelectedDates(selectedDates.filter(d => d !== dateStr));
    } else {
      if (selectedDates.length < userPreferences.duration) {
        setSelectedDates([...selectedDates, dateStr]);
      } else {
        Alert.alert(
          'Limite raggiunto',
          `Puoi selezionare massimo ${userPreferences.duration} giorni.`
        );
      }
    }
  };

  const handleGenerateItinerary = async () => {
    if (selectedDates.length === 0) {
      Alert.alert('Attenzione', 'Seleziona almeno un giorno per il tuo viaggio.');
      return;
    }

    setIsGenerating(true);
    actions.setLoading(true);

    try {
      // Update preferences with selected dates
      const updatedPreferences = {
        ...userPreferences,
        selectedDates: selectedDates.sort(),
      };
      
      actions.updatePreferences({ selectedDates: selectedDates.sort() });

      // Generate itinerary (mock implementation)
      const itinerary = await generateItinerary(updatedPreferences);
      
      actions.setGeneratedItinerary(itinerary);
      
      // Navigate to itinerary screen
      navigation.navigate('HybridItinerary');
      
    } catch (error) {
      console.error('Error generating itinerary:', error);
      actions.setError('Errore durante la generazione dell\'itinerario');
      Alert.alert('Errore', 'Non è stato possibile generare l\'itinerario. Riprova.');
    } finally {
      setIsGenerating(false);
      actions.setLoading(false);
    }
  };

  // Verifica se esiste già un itinerario generato
  const hasGeneratedItinerary = userPreferences.generatedItinerary;

  const renderGeneratedItinerary = () => {
    if (!hasGeneratedItinerary) return null;
    
    const itinerary = userPreferences.generatedItinerary;
    
    return (
      <ItineraryViewer
        itinerary={itinerary}
        onStartJourney={() => navigation.navigate('HybridItinerary', { itinerary })}
      />
    );
  };

  const renderPreferencesSummary = () => {
    const getCityName = (cityId) => {
      const city = require('../../data/cities').cities.find(c => c.id === cityId);
      return city ? city.name : 'Città sconosciuta';
    };

    const getBudgetLabel = (budget) => {
      switch (budget) {
        case 'low': return 'Economico';
        case 'medium': return 'Medio';
        case 'high': return 'Alto';
        default: return 'Non specificato';
      }
    };

    const getStyleLabel = (style) => {
      switch (style) {
        case 'relaxed': return 'Rilassato';
        case 'active': return 'Attivo';
        case 'mixed': return 'Bilanciato';
        default: return 'Non specificato';
      }
    };

    return (
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Il tuo viaggio</Text>
        
        <View style={styles.summaryRow}>
          <Ionicons name="location" size={20} color={theme.colors.primary} />
          <Text style={styles.summaryText}>
            {getCityName(userPreferences.selectedCity)}
          </Text>
        </View>
        
        <View style={styles.summaryRow}>
          <Ionicons name="time" size={20} color={theme.colors.primary} />
          <Text style={styles.summaryText}>
            {userPreferences.duration} {userPreferences.duration === 1 ? 'giorno' : 'giorni'}
          </Text>
        </View>
        
        <View style={styles.summaryRow}>
          <Ionicons name="wallet" size={20} color={theme.colors.primary} />
          <Text style={styles.summaryText}>
            Budget {getBudgetLabel(userPreferences.budget)}
          </Text>
        </View>
        
        <View style={styles.summaryRow}>
          <Ionicons name="person" size={20} color={theme.colors.primary} />
          <Text style={styles.summaryText}>
            Stile {getStyleLabel(userPreferences.travelStyle)}
          </Text>
        </View>
        
        {userPreferences.interests && userPreferences.interests.length > 0 && (
          <View style={styles.summaryRow}>
            <Ionicons name="heart" size={20} color={theme.colors.primary} />
            <Text style={styles.summaryText}>
              {userPreferences.interests.length} interessi selezionati
            </Text>
          </View>
        )}
      </View>
    );
  };

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
          <Text style={styles.headerTitle}>Pianifica le date</Text>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => navigation.navigate('PlannerTab', { screen: 'OnboardingChat' })}
          >
            <Ionicons name="create-outline" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          {/* Se esiste un itinerario generato, mostralo */}
          {hasGeneratedItinerary ? (
            renderGeneratedItinerary()
          ) : (
            <>
              {/* Preferences Summary */}
              {renderPreferencesSummary()}

              {/* Calendar Section */}
              <View style={styles.calendarSection}>
                <Text style={styles.sectionTitle}>
                  📅 Seleziona le date del tuo viaggio
                </Text>
                <Text style={styles.sectionSubtitle}>
                  {selectedDates.length === 0 
                    ? `Scegli ${userPreferences.duration} ${userPreferences.duration === 1 ? 'giorno' : 'giorni'} per il tuo viaggio`
                    : `${selectedDates.length}/${userPreferences.duration} giorni selezionati`
                  }
                </Text>
                
                <CalendarPicker
                  selectedDates={selectedDates}
                  onDateSelect={handleDateSelection}
                  maxDates={userPreferences.duration}
                />
              </View>

              {/* Selected Dates Display */}
              {selectedDates.length > 0 && (
                <View style={styles.selectedDatesContainer}>
                  <Text style={styles.selectedDatesTitle}>Date selezionate:</Text>
                  <View style={styles.selectedDatesGrid}>
                    {selectedDates.map((dateStr, index) => (
                      <View key={index} style={styles.selectedDateItem}>
                        <Text style={styles.selectedDateText}>
                          {new Date(dateStr).toLocaleDateString('it-IT', {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'short'
                          })}
                        </Text>
                        <TouchableOpacity
                          onPress={() => setSelectedDates(selectedDates.filter(d => d !== dateStr))}
                          style={styles.removeDateButton}
                        >
                          <Ionicons name="close" size={16} color={theme.colors.textSecondary} />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {/* Generate Button */}
              <TouchableOpacity
                style={[
                  styles.generateButton,
                  selectedDates.length === userPreferences.duration && styles.generateButtonActive
                ]}
                onPress={handleGenerateItinerary}
                disabled={selectedDates.length !== userPreferences.duration || isGenerating}
              >
                <LinearGradient
                  colors={selectedDates.length === userPreferences.duration 
                    ? theme.gradients.primary 
                    : [theme.colors.border, theme.colors.border]
                  }
                  style={styles.generateButtonGradient}
                >
                  {isGenerating ? (
                    <ActivityIndicator color={theme.colors.surface} />
                  ) : (
                    <Text style={[
                      styles.generateButtonText,
                      selectedDates.length === userPreferences.duration && styles.generateButtonTextActive
                    ]}>
                      Genera Itinerario
                    </Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
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
  editButton: {
    padding: theme.spacing.sm,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
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
  summaryTitle: {
    fontSize: theme.fonts.sizes.title,
    fontWeight: theme.fonts.weights.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.xs,
  },
  summaryText: {
    fontSize: theme.fonts.sizes.body,
    color: theme.colors.text,
    marginLeft: theme.spacing.md,
  },
  calendarSection: {
    margin: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.fonts.sizes.title,
    fontWeight: theme.fonts.weights.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  sectionSubtitle: {
    fontSize: theme.fonts.sizes.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  selectedDatesContainer: {
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
  selectedDatesTitle: {
    fontSize: theme.fonts.sizes.subheading,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  selectedDatesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  selectedDateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary + '20',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.medium,
  },
  selectedDateText: {
    fontSize: theme.fonts.sizes.body,
    color: theme.colors.primary,
    fontWeight: theme.fonts.weights.medium,
    marginRight: theme.spacing.sm,
  },
  removeDateButton: {
    padding: theme.spacing.xs,
  },
  bottomContainer: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  generateButton: {
    borderRadius: theme.borderRadius.medium,
    overflow: 'hidden',
  },
  generateButtonDisabled: {
    opacity: 0.5,
  },
  generateButtonActive: {
    opacity: 1,
  },
  generateButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
  },
  generateButtonText: {
    fontSize: theme.fonts.sizes.subheading,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.surface,
    marginLeft: theme.spacing.sm,
  },
  itineraryContainer: {
    margin: theme.spacing.lg,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.large,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: theme.spacing.xxl,
  },
  itineraryTitle: {
    fontSize: theme.fonts.sizes.title,
    fontWeight: theme.fonts.weights.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  itinerarySubtitle: {
    fontSize: theme.fonts.sizes.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  budgetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  budgetText: {
    fontSize: theme.fonts.sizes.body,
    color: theme.colors.text,
    marginLeft: theme.spacing.sm,
  },
  daysContainer: {
    maxHeight: 300,
    marginBottom: theme.spacing.md,
  },
  dayCard: {
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.medium,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  dayNumber: {
    fontSize: theme.fonts.sizes.subheading,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.text,
  },
  dayTheme: {
    fontSize: theme.fonts.sizes.body,
    color: theme.colors.textSecondary,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  activityTime: {
    width: 60,
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  timeText: {
    fontSize: theme.fonts.sizes.body,
    color: theme.colors.text,
  },
  activityContent: {
    flex: 1,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  activityIcon: {
    fontSize: 18,
    marginRight: theme.spacing.sm,
    color: theme.colors.primary,
  },
  activityName: {
    fontSize: theme.fonts.sizes.body,
    fontWeight: theme.fonts.weights.medium,
    color: theme.colors.text,
    flex: 1,
  },
  activityCost: {
    fontSize: theme.fonts.sizes.body,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.sm,
  },
  activityDescription: {
    fontSize: theme.fonts.sizes.body,
    color: theme.colors.textSecondary,
  },
  badgesSection: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.fonts.sizes.subheading,
    fontWeight: theme.fonts.weights.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  badgeItem: {
    fontSize: theme.fonts.sizes.body,
    color: theme.colors.text,
    marginLeft: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },
  tipsSection: {
    marginBottom: theme.spacing.lg,
  },
  tipItem: {
    fontSize: theme.fonts.sizes.body,
    color: theme.colors.text,
    marginLeft: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },
  startTripButton: {
    marginTop: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    overflow: 'hidden',
  },
  startTripGradient: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startTripText: {
    fontSize: theme.fonts.sizes.subheading,
    fontWeight: theme.fonts.weights.bold,
    color: theme.colors.surface,
  },
});

export default PlannerScreen;
