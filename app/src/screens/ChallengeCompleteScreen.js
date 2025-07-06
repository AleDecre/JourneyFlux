import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { getChallengeById } from '../data/challenges';
import { getBadgeById } from '../data/badges';
import { theme } from '../utils/theme';

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

  const handleContinue = () => {
    navigation.navigate('HomeTab');
  };

  const handleNewChallenge = () => {
    navigation.navigate('HomeTab');
  };

  const badge = badgeEarned ? getBadgeById(badgeEarned) : null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim }
              ]
            }
          ]}
        >
          {/* Success Header */}
          <View style={styles.successHeader}>
            <Text style={styles.successIcon}>🎉</Text>
            <Text style={styles.successTitle}>Sfida Completata!</Text>
            <Text style={styles.successSubtitle}>
              Hai completato con successo la sfida "{challenge?.title}"
            </Text>
          </View>

          {/* Challenge Info */}
          <View style={styles.challengeInfo}>
            <Text style={styles.challengeEmoji}>{challenge?.image}</Text>
            <Text style={styles.challengeTitle}>{challenge?.title}</Text>
            <Text style={styles.challengeLocation}>{challenge?.location}</Text>
          </View>

          {/* Rewards Section */}
          <View style={styles.rewardsSection}>
            <Text style={styles.rewardsTitle}>Ricompense Ottenute</Text>
            
            {/* Points Earned */}
            <View style={styles.rewardCard}>
              <LinearGradient
                colors={['#4ECDC4', '#44A08D']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.rewardGradient}
              >
                <Text style={styles.rewardIcon}>💎</Text>
                <Text style={styles.rewardTitle}>Punti Guadagnati</Text>
                <Text style={styles.rewardValue}>+{pointsEarned}</Text>
              </LinearGradient>
            </View>

            {/* Badge Earned */}
            {badge && (
              <View style={styles.rewardCard}>
                <LinearGradient
                  colors={['#F06292', '#E91E63']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.rewardGradient}
                >
                  <Text style={styles.rewardIcon}>🏆</Text>
                  <Text style={styles.rewardTitle}>Badge Sbloccato</Text>
                  <Text style={styles.badgeName}>{badge.name}</Text>
                  <Text style={styles.badgeDescription}>{badge.description}</Text>
                </LinearGradient>
              </View>
            )}
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleContinue}
            >
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Continua</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleNewChallenge}
            >
              <Text style={styles.secondaryButtonText}>Nuova Sfida</Text>
            </TouchableOpacity>
          </View>

          {/* Motivational Quote */}
          <View style={styles.quoteContainer}>
            <Text style={styles.quote}>
              "Ogni viaggio inizia con un singolo passo... e tu ne hai appena fatto uno fantastico!"
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  content: {
    alignItems: 'center',
  },
  successHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  successIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 32,
    fontFamily: theme.fonts.bold,
    color: '#2C3E50',
    marginBottom: 8,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: '#7F8C8D',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  challengeInfo: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  challengeEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  challengeTitle: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    color: '#2C3E50',
    marginBottom: 8,
    textAlign: 'center',
  },
  challengeLocation: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  rewardsSection: {
    width: '100%',
    marginBottom: 30,
  },
  rewardsTitle: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: '#2C3E50',
    marginBottom: 16,
    textAlign: 'center',
  },
  rewardCard: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  rewardGradient: {
    padding: 20,
    alignItems: 'center',
  },
  rewardIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  rewardTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.semiBold,
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  rewardValue: {
    fontSize: 28,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  badgeName: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  badgeDescription: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  primaryButton: {
    width: '100%',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: theme.fonts.semiBold,
    color: '#FFFFFF',
  },
  secondaryButton: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#4ECDC4',
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 18,
    fontFamily: theme.fonts.semiBold,
    color: '#4ECDC4',
  },
  quoteContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 20,
    borderRadius: 16,
    width: '100%',
  },
  quote: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: '#7F8C8D',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default ChallengeCompleteScreen;
