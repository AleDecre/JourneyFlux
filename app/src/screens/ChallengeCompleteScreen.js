import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Animated,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { getChallengeById } from '../data/challenges';
import { getBadgeById } from '../data/badges';

const { width } = Dimensions.get('window');

const ChallengeCompleteScreen = ({ route, navigation }) => {
  const { challengeId, pointsEarned, badgeEarned } = route.params;
  const challenge = getChallengeById(challengeId);
  
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.5));
  const [slideAnim] = useState(new Animated.Value(50));

  useEffect(() => {
    // Animazione di entrata
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handleGoHome = () => {
    navigation.navigate('Home');
  };

  const handleNextChallenge = () => {
    navigation.navigate('Home');
  };

  const handleViewProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}
      >
        <Animated.View 
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          {/* Congratulations Section */}
          <View style={styles.congratsSection}>
            <Animated.View 
              style={[
                styles.successIcon,
                {
                  transform: [{ scale: scaleAnim }]
                }
              ]}
            >
              <Text style={styles.successEmoji}>🎉</Text>
            </Animated.View>
            
            <Text style={styles.congratsTitle}>Sfida Completata!</Text>
            <Text style={styles.congratsSubtitle}>
              Complimenti! Hai completato con successo la sfida "{challenge?.title}"
            </Text>
          </View>

          {/* Points Earned */}
          <Animated.View 
            style={[
              styles.pointsSection,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }]
              }
            ]}
          >
            <LinearGradient
              colors={['#FFD700', '#FFA500']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.pointsCard}
            >
              <Text style={styles.pointsIcon}>⭐</Text>
              <Text style={styles.pointsEarned}>+{pointsEarned}</Text>
              <Text style={styles.pointsLabel}>Punti Ottenuti</Text>
            </LinearGradient>
          </Animated.View>

          {/* Badge Earned */}
          {badgeEarned && (
            <Animated.View 
              style={[
                styles.badgeSection,
                {
                  opacity: fadeAnim,
                  transform: [{ scale: scaleAnim }]
                }
              ]}
            >
              <Text style={styles.badgeTitle}>Nuovo Badge Sbloccato!</Text>
              <LinearGradient
                colors={['#4ECDC4', '#44A08D']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.badgeCard}
              >
                <Text style={styles.badgeIcon}>🏆</Text>
                <Text style={styles.badgeName}>{challenge?.badge}</Text>
              </LinearGradient>
            </Animated.View>
          )}

          {/* Achievement Stats */}
          <View style={styles.statsSection}>
            <Text style={styles.statsTitle}>Statistiche aggiornate</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>+1</Text>
                <Text style={styles.statLabel}>Sfida completata</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>+{pointsEarned}</Text>
                <Text style={styles.statLabel}>Punti totali</Text>
              </View>
              {badgeEarned && (
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>+1</Text>
                  <Text style={styles.statLabel}>Badge ottenuto</Text>
                </View>
              )}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsSection}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleNextChallenge}
            >
              <LinearGradient
                colors={['#27AE60', '#2ECC71']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.primaryButtonGradient}
              >
                <Text style={styles.primaryButtonText}>Prossima Sfida</Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.secondaryButtonsRow}>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={handleViewProfile}
              >
                <Text style={styles.secondaryButtonText}>Vedi Profilo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={handleGoHome}
              >
                <Text style={styles.secondaryButtonText}>Torna alla Home</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Motivational Message */}
          <View style={styles.motivationSection}>
            <Text style={styles.motivationText}>
              "Ogni viaggio inizia con un singolo passo. Continua a esplorare!"
            </Text>
          </View>
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  congratsSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  successIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  successEmoji: {
    fontSize: 64,
  },
  congratsTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  congratsSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  pointsSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  pointsCard: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    minWidth: 200,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  pointsIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  pointsEarned: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  pointsLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
  },
  badgeSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  badgeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  badgeCard: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    minWidth: 180,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  badgeIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  badgeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  statsSection: {
    marginBottom: 30,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 4,
  },
  actionsSection: {
    marginBottom: 20,
  },
  primaryButton: {
    borderRadius: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  primaryButtonGradient: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  motivationSection: {
    alignItems: 'center',
    paddingTop: 20,
  },
  motivationText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 24,
  },
});

export default ChallengeCompleteScreen;
