import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Share,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../utils/theme';
import { usePlanner } from '../../context/PlannerContext';
import PassportBadge from '../../components/PassportBadge';

const { width } = Dimensions.get('window');

const DiaryScreen = ({ navigation }) => {
  const { state } = usePlanner();
  const { tripHistory, currentTrip } = state;
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'timeline'

  const savedTrips = state.savedTrips || [];

  useEffect(() => {
    // Se c'è un viaggio corrente, mostralo in cima
    if (currentTrip.isActive && currentTrip.completedSteps.length > 0) {
      // Questo sarà il "viaggio in corso"
    }
  }, [currentTrip]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getTripDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleShareTrip = async (trip) => {
    try {
      const message = `🎭 Ho appena completato "${trip.itinerary.title}" con JourneyFlux!\n\n` +
        `📍 ${trip.completedSteps.length} tappe completate\n` +
        `🏆 ${trip.totalPoints} punti guadagnati\n` +
        `🎖️ ${trip.badges.length} badge sbloccati\n\n` +
        `#JourneyFlux #TravelItaly #EsploratoreDigitale`;

      await Share.share({
        message,
        title: 'Il mio viaggio con JourneyFlux',
      });
    } catch (error) {
      console.error('Errore nella condivisione:', error);
    }
  };

  const renderCurrentTrip = () => {
    if (!currentTrip.isActive || currentTrip.completedSteps.length === 0) return null;

    return (
      <View style={styles.currentTripContainer}>
        <View style={styles.currentTripHeader}>
          <View style={styles.currentTripBadge}>
            <Ionicons name="navigation" size={16} color={theme.colors.success} />
            <Text style={styles.currentTripBadgeText}>Viaggio in corso</Text>
          </View>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => navigation.navigate('HybridItinerary')}
          >
            <Text style={styles.continueButtonText}>Continua</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.currentTripTitle}>
          {state.generatedItinerary.title || 'Viaggio in corso'}
        </Text>

        <View style={styles.currentTripStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{currentTrip.completedSteps.length}</Text>
            <Text style={styles.statLabel}>Tappe completate</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {currentTrip.completedSteps.reduce((sum, step) => sum + (step.points || 0), 0)}
            </Text>
            <Text style={styles.statLabel}>Punti guadagnati</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {currentTrip.completedSteps.filter(step => step.badge).length}
            </Text>
            <Text style={styles.statLabel}>Badge sbloccati</Text>
          </View>
        </View>

        {/* Recent badges */}
        {currentTrip.completedSteps.filter(step => step.badge).length > 0 && (
          <View style={styles.recentBadgesContainer}>
            <Text style={styles.recentBadgesTitle}>Badge recenti:</Text>
            <View style={styles.recentBadgesGrid}>
              {currentTrip.completedSteps
                .filter(step => step.badge)
                .slice(-3)
                .map((step, index) => (
                  <PassportBadge
                    key={index}
                    badge={{ name: step.badge, earned: true }}
                    size="small"
                  />
                ))}
            </View>
          </View>
        )}
      </View>
    );
  };

  const renderTripCard = (trip, index) => {
    const isExpanded = selectedTrip === trip.id;

    return (
      <TouchableOpacity
        key={trip.id}
        style={[
          styles.tripCard,
          isExpanded && styles.tripCardExpanded,
        ]}
        onPress={() => setSelectedTrip(isExpanded ? null : trip.id)}
      >
        <LinearGradient
          colors={['#FFFFFF', '#F8F9FA']}
          style={styles.tripCardGradient}
        >
          {/* Header */}
          <View style={styles.tripCardHeader}>
            <View style={styles.tripCardHeaderLeft}>
              <Text style={styles.tripCardTitle}>{trip.itinerary.title}</Text>
              <Text style={styles.tripCardDate}>
                {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
              </Text>
            </View>
            <View style={styles.tripCardHeaderRight}>
              <View style={styles.tripCardPoints}>
                <Ionicons name="star" size={16} color={theme.colors.warning} />
                <Text style={styles.tripCardPointsText}>{trip.totalPoints}</Text>
              </View>
            </View>
          </View>

          {/* Stats */}
          <View style={styles.tripCardStats}>
            <View style={styles.tripCardStat}>
              <Ionicons name="location" size={16} color={theme.colors.primary} />
              <Text style={styles.tripCardStatText}>
                {trip.completedSteps.length} tappe
              </Text>
            </View>
            <View style={styles.tripCardStat}>
              <Ionicons name="time" size={16} color={theme.colors.primary} />
              <Text style={styles.tripCardStatText}>
                {getTripDuration(trip.startDate, trip.endDate)} {getTripDuration(trip.startDate, trip.endDate) === 1 ? 'giorno' : 'giorni'}
              </Text>
            </View>
            <View style={styles.tripCardStat}>
              <Ionicons name="trophy" size={16} color={theme.colors.primary} />
              <Text style={styles.tripCardStatText}>
                {trip.badges.length} badge
              </Text>
            </View>
          </View>

          {/* Badges preview */}
          {trip.badges.length > 0 && (
            <View style={styles.tripCardBadges}>
              <Text style={styles.tripCardBadgesTitle}>Badge ottenuti:</Text>
              <View style={styles.tripCardBadgesGrid}>
                {trip.badges.slice(0, 6).map((badge, badgeIndex) => (
                  <PassportBadge
                    key={badgeIndex}
                    badge={{ name: badge, earned: true }}
                    size="small"
                  />
                ))}
                {trip.badges.length > 6 && (
                  <View style={styles.moreBadgesIndicator}>
                    <Text style={styles.moreBadgesText}>+{trip.badges.length - 6}</Text>
                  </View>
                )}
              </View>
            </View>
          )}

          {/* Expanded content */}
          {isExpanded && (
            <View style={styles.tripCardExpandedContent}>
              <Text style={styles.expandedTitle}>Tappe completate:</Text>
              {trip.completedSteps.map((step, stepIndex) => (
                <View key={stepIndex} style={styles.completedStep}>
                  <View style={styles.completedStepHeader}>
                    <Ionicons 
                      name="checkmark-circle" 
                      size={16} 
                      color={theme.colors.success} 
                    />
                    <Text style={styles.completedStepTitle}>{step.title || `Tappa ${stepIndex + 1}`}</Text>
                  </View>
                  <Text style={styles.completedStepDate}>
                    {new Date(step.completedAt).toLocaleDateString('it-IT', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Actions */}
          <View style={styles.tripCardActions}>
            <TouchableOpacity
              style={styles.tripCardAction}
              onPress={() => handleShareTrip(trip)}
            >
              <Ionicons name="share-outline" size={20} color={theme.colors.primary} />
              <Text style={styles.tripCardActionText}>Condividi</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.tripCardAction}
              onPress={() => setSelectedTrip(isExpanded ? null : trip.id)}
            >
              <Ionicons 
                name={isExpanded ? "chevron-up" : "chevron-down"} 
                size={20} 
                color={theme.colors.primary} 
              />
              <Text style={styles.tripCardActionText}>
                {isExpanded ? 'Comprimi' : 'Dettagli'}
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="map-outline" size={64} color={theme.colors.textLight} />
      <Text style={styles.emptyTitle}>Nessun viaggio completato</Text>
      <Text style={styles.emptySubtitle}>
        Inizia a esplorare e i tuoi viaggi appariranno qui
      </Text>
      <TouchableOpacity
        style={styles.emptyAction}
        onPress={() => navigation.navigate('PlannerTab', { screen: 'OnboardingChat' })}
      >
        <LinearGradient
          colors={theme.gradients.primary}
          style={styles.emptyActionGradient}
        >
          <Ionicons name="add" size={24} color={theme.colors.surface} />
          <Text style={styles.emptyActionText}>Pianifica un viaggio</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#F8F9FA', '#E9ECEF']}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Il mio diario</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.headerAction}
              onPress={() => setViewMode(viewMode === 'grid' ? 'timeline' : 'grid')}
            >
              <Ionicons 
                name={viewMode === 'grid' ? "list" : "grid"} 
                size={24} 
                color={theme.colors.primary} 
              />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Current Trip */}
          {renderCurrentTrip()}

          {/* Trip History */}
          {tripHistory.length > 0 ? (
            <View style={styles.historyContainer}>
              <Text style={styles.historyTitle}>Viaggi completati</Text>
              {tripHistory.map((trip, index) => renderTripCard(trip, index))}
            </View>
          ) : (
            renderEmptyState()
          )}

          {/* VIAGGI SALVATI (MVP 2.0) */}
          {savedTrips.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🧳 I miei viaggi salvati</Text>
              {savedTrips.map((trip) => (
                <TouchableOpacity
                  key={trip.id}
                  style={styles.savedTripCard}
                  onPress={() => setSelectedTrip(trip.id)}
                >
                  <LinearGradient colors={["#4ECDC4", "#667eea"]} style={styles.savedTripGradient}>
                    <Text style={styles.savedTripTitle}>{trip.titolo || 'Viaggio senza titolo'}</Text>
                    <Text style={styles.savedTripSubtitle}>{trip.sottotitolo || ''}</Text>
                    <Text style={styles.savedTripMeta}>
                      {[
                        trip.durata_giorni ? `${trip.durata_giorni} giorni` : null,
                        trip.budget_totale ? `• ${trip.budget_totale}` : null
                      ].filter(Boolean).join(' ')}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}

              {/* Dettaglio viaggio salvato (modal-like inline) */}
              {savedTrips.map((trip) =>
                selectedTrip === trip.id && (
                  <View key={trip.id + '-detail'} style={styles.savedTripDetailBox}>
                    <Text style={styles.savedTripDetailTitle}>Dettaglio viaggio</Text>
                    {trip.tappe && trip.tappe.length > 0 ? (
                      trip.tappe.map((tappa, idx) => (
                        <View key={idx} style={styles.savedTripTappaRow}>
                          <Text style={styles.savedTripTappaType}>
                            {tappa.type === 'narrative' ? '🎭' : tappa.type === 'itinerary' ? '🗺️' : '🍷'}
                          </Text>
                          <View style={{flex:1}}>
                            <Text style={styles.savedTripTappaTitle}>
                              {tappa.title ? tappa.title : 'Titolo non disponibile'}
                            </Text>
                            <Text style={styles.savedTripTappaDesc}>
                              {tappa.descrizione ? tappa.descrizione : 'Descrizione non disponibile'}
                            </Text>
                            <Text style={styles.savedTripTappaMeta}>
                              {tappa.orario ? tappa.orario : 'Orario non disponibile'}
                              {tappa.luogo ? ` • ${tappa.luogo}` : ''}
                            </Text>
                          </View>
                        </View>
                      ))
                    ) : (
                      <Text style={styles.savedTripTappaEmpty}>Nessuna tappa disponibile</Text>
                    )}
                    <TouchableOpacity style={styles.closeDetailBtn} onPress={() => setSelectedTrip(null)}>
                      <Text style={styles.closeDetailBtnText}>Chiudi</Text>
                    </TouchableOpacity>
                  </View>
                )
              )}
            </View>
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
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  headerTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: theme.fonts.sizes.heading,
    fontWeight: theme.fonts.weights.bold,
    color: theme.colors.text,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerAction: {
    padding: theme.spacing.sm,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xxl,
  },
  currentTripContainer: {
    margin: theme.spacing.lg,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.large,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.success,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  currentTripHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  currentTripBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.success + '20',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.small,
  },
  currentTripBadgeText: {
    fontSize: theme.fonts.sizes.small,
    fontWeight: theme.fonts.weights.medium,
    color: theme.colors.success,
    marginLeft: theme.spacing.xs,
  },
  continueButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.medium,
  },
  continueButtonText: {
    fontSize: theme.fonts.sizes.body,
    fontWeight: theme.fonts.weights.medium,
    color: theme.colors.surface,
  },
  currentTripTitle: {
    fontSize: theme.fonts.sizes.title,
    fontWeight: theme.fonts.weights.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  currentTripStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: theme.spacing.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: theme.fonts.sizes.title,
    fontWeight: theme.fonts.weights.bold,
    color: theme.colors.primary,
  },
  statLabel: {
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  recentBadgesContainer: {
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  recentBadgesTitle: {
    fontSize: theme.fonts.sizes.subheading,
    fontWeight: theme.fonts.weights.medium,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  recentBadgesGrid: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  historyContainer: {
    paddingHorizontal: theme.spacing.lg,
  },
  historyTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: theme.fonts.sizes.subheading,
    fontWeight: theme.fonts.weights.bold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  tripCard: {
    marginBottom: theme.spacing.lg,
    borderRadius: theme.borderRadius.large,
    overflow: 'hidden',
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tripCardExpanded: {
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  tripCardGradient: {
    padding: theme.spacing.lg,
  },
  tripCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  tripCardHeaderLeft: {
    flex: 1,
  },
  tripCardTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: theme.fonts.sizes.body,
    fontWeight: theme.fonts.weights.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  tripCardDate: {
    fontFamily: 'Nunito-Regular',
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.textSecondary,
  },
  tripCardHeaderRight: {
    alignItems: 'flex-end',
  },
  tripCardPoints: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.warning + '20',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.small,
  },
  tripCardPointsText: {
    fontSize: theme.fonts.sizes.body,
    fontWeight: theme.fonts.weights.medium,
    color: theme.colors.warning,
    marginLeft: theme.spacing.xs,
  },
  tripCardStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: theme.spacing.md,
  },
  tripCardStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tripCardStatText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
  },
  tripCardBadges: {
    marginBottom: theme.spacing.md,
  },
  tripCardBadgesTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  tripCardBadgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  moreBadgesIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.textLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreBadgesText: {
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.surface,
    fontWeight: theme.fonts.weights.medium,
  },
  tripCardExpandedContent: {
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    marginBottom: theme.spacing.md,
  },
  expandedTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 15,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
  },
  completedStep: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  completedStepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  completedStepTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginLeft: theme.spacing.sm,
  },
  completedStepDate: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  tripCardActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  tripCardAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tripCardActionText: {
    fontSize: theme.fonts.sizes.body,
    color: theme.colors.primary,
    marginLeft: theme.spacing.xs,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.huge,
  },
  emptyTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: theme.fonts.sizes.subheading,
    fontWeight: theme.fonts.weights.bold,
    color: theme.colors.text,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontFamily: 'Nunito-Regular',
    fontSize: theme.fonts.sizes.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  emptyAction: {
    borderRadius: theme.borderRadius.medium,
    overflow: 'hidden',
  },
  emptyActionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
  },
  emptyActionText: {
    fontSize: theme.fonts.sizes.body,
    fontWeight: theme.fonts.weights.medium,
    color: theme.colors.surface,
    marginLeft: theme.spacing.sm,
  },
  section: {
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
  },
  sectionTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: theme.fonts.sizes.subheading,
    fontWeight: theme.fonts.weights.bold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  savedTripCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
  },
  savedTripGradient: {
    padding: 16,
    borderRadius: 16,
  },
  savedTripTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: theme.fonts.sizes.body,
    fontWeight: theme.fonts.weights.bold,
    color: '#fff',
    textAlign: 'center',
  },
  savedTripSubtitle: {
    fontFamily: 'Nunito-Regular',
    fontSize: theme.fonts.sizes.body,
    color: '#fff',
    marginTop: 2,
    textAlign: 'center',
    opacity: 0.9,
  },
  savedTripMeta: {
    fontFamily: 'Nunito-Regular',
    fontSize: theme.fonts.sizes.small,
    color: '#fff',
    marginTop: 6,
    opacity: 0.8,
    textAlign: 'center',
  },
  savedTripDetailBox: {
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  savedTripDetailTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 10,
    textAlign: 'center',
  },
  savedTripTappaRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  savedTripTappaType: {
    fontSize: 22,
    marginRight: 10,
    width: 32,
    textAlign: 'center',
  },
  savedTripTappaTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 15,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  savedTripTappaDesc: {
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
    color: theme.colors.textSecondary,
  },
  savedTripTappaMeta: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    color: theme.colors.textLight,
    marginTop: 2,
  },
  savedTripTappaEmpty: {
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
    color: theme.colors.textLight,
    fontStyle: 'italic',
    marginBottom: 10,
    textAlign: 'center',
  },
  closeDetailBtn: {
    marginTop: 10,
    alignSelf: 'flex-end',
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 18,
  },
  closeDetailBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default DiaryScreen;
