import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { getNarrativePathById } from '../data/narrativePaths';
import { getBadgeById } from '../data/badges';
import { theme } from '../utils/theme';
import PassportBadge from '../components/PassportBadge';

export default function NarrativePathScreen({ navigation }) {
  const route = useRoute();
  const { narrativePathId } = route.params;
  const narrativePath = getNarrativePathById(narrativePathId);
  
  const [isNearLocation, setIsNearLocation] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const scrollViewRef = useRef();

  if (!narrativePath) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Percorso Narrativo non trovato</Text>
        </View>
      </SafeAreaView>
    );
  }

  const badge = getBadgeById(narrativePath.rewards?.badge);

  const getCategoryColors = () => {
    switch (narrativePath.category) {
      case 'mistero':
        return ['#8B5CF6', '#A78BFA'];
      case 'leggenda':
        return ['#3B82F6', '#60A5FA'];
      case 'storia':
        return ['#F59E0B', '#FBBF24'];
      case 'arte':
        return ['#EF4444', '#F87171'];
      case 'gastronomia':
        return ['#10B981', '#34D399'];
      default:
        return ['#6B7280', '#9CA3AF'];
    }
  };

  const getDifficultyColor = () => {
    switch (narrativePath.difficulty) {
      case 'facile':
        return '#10B981';
      case 'media':
        return '#F59E0B';
      case 'difficile':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const handleStartPath = () => {
    Alert.alert(
      "Inizia il Percorso Narrativo",
      "Sei pronto a svelare i segreti nascosti?",
      [
        { text: "Annulla", style: "cancel" },
        { text: "Inizia!", onPress: () => setIsNearLocation(true) }
      ]
    );
  };

  const handleCompleteStep = (stepIndex) => {
    if (!completedSteps.includes(stepIndex)) {
      const newCompletedSteps = [...completedSteps, stepIndex];
      setCompletedSteps(newCompletedSteps);
      if (stepIndex < narrativePath.steps.length - 1) {
        setCurrentStepIndex(stepIndex + 1);
        setTimeout(() => {
          if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: (indexToScrollTo(stepIndex + 1)), animated: true });
          }
        }, 300);
      }
      // Check if all steps are completed
      if (newCompletedSteps.length === narrativePath.steps.length) {
        setTimeout(() => {
          handleCompleteNarrativePath();
        }, 500);
      }
    } else if (stepIndex < narrativePath.steps.length - 1) {
      setCurrentStepIndex(stepIndex + 1);
    }
  };

  // Calcola la posizione Y della tappa da scrollare (approssimazione)
  const indexToScrollTo = (stepIdx) => {
    // Ogni stepCard ha circa 220px di altezza + margini
    return 400 + stepIdx * 240;
  };

  const handleCompleteNarrativePath = () => {
    // Navigate to experience complete screen
    navigation.navigate('ExperienceComplete', {
      contentId: narrativePath.id,
      contentType: 'narrative_path',
      pointsEarned: narrativePath.rewards?.points || 250,
      badgeEarned: narrativePath.rewards?.badge || 'badge_narrativo_generico',
      socialShareData: {
        title: narrativePath.title,
        description: narrativePath.description,
        category: narrativePath.category
      }
    });
  };

  const isStepCompleted = (stepIndex) => completedSteps.includes(stepIndex);
  const isStepActive = (stepIndex) => stepIndex === currentStepIndex;
  const isStepAccessible = (stepIndex) => stepIndex <= currentStepIndex;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView ref={scrollViewRef} style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={getCategoryColors()}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
            <Text style={styles.backButtonText}>Indietro</Text>
          </TouchableOpacity>
          
          <View style={styles.headerContent}>
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryEmoji}>
                {narrativePath.category === 'mistero' ? '🔍' :
                 narrativePath.category === 'leggenda' ? '📚' :
                 narrativePath.category === 'storia' ? '🏛️' :
                 narrativePath.category === 'arte' ? '🎨' :
                 narrativePath.category === 'gastronomia' ? '🍽️' : '✨'}
              </Text>
              <Text style={styles.categoryText}>{narrativePath.category.toUpperCase()}</Text>
            </View>
            
            <Text style={styles.title}>{narrativePath.title}</Text>
            
            <View style={styles.infoContainer}>
              <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor() }]}>
                <Text style={styles.difficultyText}>{narrativePath.difficulty}</Text>
              </View>
              <View style={styles.durationBadge}>
                <Ionicons name="time-outline" size={16} color="#FFFFFF" />
                <Text style={styles.durationText}>{narrativePath.duration}</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          {/* Introduzione */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📜 La Storia Inizia...</Text>
            <View style={styles.introductionCard}>
              <Text style={styles.introductionText}>
                {typeof narrativePath.introduction === 'string' 
                  ? narrativePath.introduction 
                  : narrativePath.introduction?.text || narrativePath.description
                }
              </Text>
            </View>
          </View>

          {/* Percorso delle Tappe */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🗺️ Il Percorso</Text>
            {narrativePath.steps && narrativePath.steps.map((step, index) => (
              <View key={step.id || index} style={styles.stepContainer}>
                <View style={styles.stepTimeline}>
                  <View style={[
                    styles.stepMarker,
                    isStepCompleted(index) && styles.stepMarkerCompleted,
                    isStepActive(index) && styles.stepMarkerActive
                  ]}>
                    {isStepCompleted(index) ? (
                      <Ionicons name="checkmark" size={20} color="#FFFFFF" />
                    ) : (
                      <Text style={styles.stepNumber}>{index + 1}</Text>
                    )}
                  </View>
                  {index < narrativePath.steps.length - 1 && (
                    <View style={[
                      styles.stepLine,
                      isStepCompleted(index) && styles.stepLineCompleted
                    ]} />
                  )}
                </View>
                
                <View style={[
                  styles.stepCard,
                  isStepActive(index) && styles.stepCardActive,
                  !isStepAccessible(index) && styles.stepCardDisabled
                ]}>
                  <View style={styles.stepHeader}>
                    <Text style={styles.stepTitle}>{step.title}</Text>
                    <Text style={styles.stepDistance}>📍 {step.distance || '0.5 km'}</Text>
                  </View>
                  
                  <Text style={styles.stepDescription}>{step.description}</Text>
                  
                  {step.storyContent && (
                    <View style={styles.storyContent}>
                      <Text style={styles.storyLabel}>💫 Racconto:</Text>
                      <Text style={styles.storyText}>{step.storyContent}</Text>
                    </View>
                  )}
                  
                  {isStepAccessible(index) && !isStepCompleted(index) && (
                    <TouchableOpacity
                      style={styles.completeStepButton}
                      onPress={() => handleCompleteStep(index)}
                    >
                      <LinearGradient
                        colors={['#10B981', '#34D399']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.completeStepGradient}
                      >
                        <Text style={styles.completeStepText}>
                          {index === narrativePath.steps.length - 1 ? 'Completa Percorso' : 'Completa Tappa'}
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </View>

          {/* Sfida Finale */}
          {narrativePath.finalChallenge && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🎯 Sfida Finale</Text>
              <View style={styles.finalChallengeCard}>
                <Text style={styles.finalChallengeTitle}>{narrativePath.finalChallenge.title}</Text>
                <Text style={styles.finalChallengeDescription}>{narrativePath.finalChallenge.description}</Text>
                
                {narrativePath.finalChallenge.hint && (
                  <View style={styles.hintContainer}>
                    <Ionicons name="bulb-outline" size={16} color="#F59E0B" />
                    <Text style={styles.hintText}>{narrativePath.finalChallenge.hint}</Text>
                  </View>
                )}
              </View>
            </View>
          )}

          {/* Ricompense */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🏆 Ricompense</Text>
            <View style={styles.rewardsCard}>
              <View style={styles.pointsContainer}>
                <Ionicons name="diamond-outline" size={24} color="#4ECDC4" />
                <Text style={styles.pointsText}>{narrativePath.rewards?.points} punti</Text>
              </View>
              
              {badge && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeLabel}>Badge da sbloccare:</Text>
                  <PassportBadge badge={badge} size="large" />
                </View>
              )}
              
              {narrativePath.rewards?.unlockContent && (
                <View style={styles.unlockContainer}>
                  <Ionicons name="lock-closed-outline" size={16} color="#7F8C8D" />
                  <Text style={styles.unlockTitle}>Contenuto Segreto:</Text>
                  <Text style={styles.unlockText}>
                    {typeof narrativePath.rewards.unlockContent === 'string'
                      ? narrativePath.rewards.unlockContent
                      : narrativePath.rewards.unlockContent?.title || 'Contenuto esclusivo da sbloccare'
                    }
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer con azione */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleStartPath}
        >
          <LinearGradient
            colors={getCategoryColors()}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.actionButtonGradient}
          >
            <Text style={styles.actionButtonText}>
              {completedSteps.length === 0 ? 'Inizia il Percorso' : 'Continua il Percorso'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#E74C3C',
    textAlign: 'center',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: theme.fonts.semiBold,
    marginLeft: 4,
  },
  headerContent: {
    alignItems: 'center',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
  },
  categoryEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  difficultyBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  difficultyText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: theme.fonts.semiBold,
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: theme.fonts.semiBold,
    marginLeft: 4,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    color: '#2C3E50',
    marginBottom: 16,
  },
  introductionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  introductionText: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: '#34495E',
    lineHeight: 24,
    fontStyle: 'italic',
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  stepTimeline: {
    alignItems: 'center',
    marginRight: 16,
  },
  stepMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepMarkerActive: {
    backgroundColor: '#4ECDC4',
  },
  stepMarkerCompleted: {
    backgroundColor: '#10B981',
  },
  stepNumber: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: '#7F8C8D',
  },
  stepLine: {
    width: 2,
    height: 40,
    backgroundColor: '#E0E0E0',
    marginTop: 8,
  },
  stepLineCompleted: {
    backgroundColor: '#10B981',
  },
  stepCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  stepCardActive: {
    borderWidth: 2,
    borderColor: '#4ECDC4',
  },
  stepCardDisabled: {
    opacity: 0.6,
  },
  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.semiBold,
    color: '#2C3E50',
    flex: 1,
  },
  stepDistance: {
    fontSize: 12,
    fontFamily: theme.fonts.medium,
    color: '#7F8C8D',
  },
  stepDescription: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#34495E',
    lineHeight: 20,
    marginBottom: 8,
  },
  storyContent: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  storyLabel: {
    fontSize: 14,
    fontFamily: theme.fonts.semiBold,
    color: '#8B5CF6',
    marginBottom: 4,
  },
  storyText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#34495E',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  completeStepButton: {
    borderRadius: 8,
  },
  completeStepGradient: {
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  completeStepText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: theme.fonts.semiBold,
  },
  finalChallengeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  finalChallengeTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#2C3E50',
    marginBottom: 8,
  },
  finalChallengeDescription: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#34495E',
    lineHeight: 20,
    marginBottom: 12,
  },
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3CD',
    borderRadius: 8,
    padding: 12,
  },
  hintText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: '#92400E',
    marginLeft: 8,
    fontStyle: 'italic',
  },
  rewardsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  pointsText: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#4ECDC4',
    marginLeft: 8,
  },
  badgeContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  badgeLabel: {
    fontSize: 16,
    fontFamily: theme.fonts.semiBold,
    color: '#2C3E50',
    marginBottom: 12,
  },
  unlockContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
  },
  unlockTitle: {
    fontSize: 14,
    fontFamily: theme.fonts.semiBold,
    color: '#7F8C8D',
    marginLeft: 8,
    marginBottom: 4,
  },
  unlockText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#7F8C8D',
    marginLeft: 8,
    fontStyle: 'italic',
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
  },
  actionButton: {
    borderRadius: 12,
  },
  actionButtonGradient: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: theme.fonts.bold,
  },
});
