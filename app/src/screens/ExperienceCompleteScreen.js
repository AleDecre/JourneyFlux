import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
  Share,
  Alert,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { getChallengeById } from '../data/challenges';
import { getNarrativePathById } from '../data/narrativePaths';
import { getItineraryById } from '../data/itineraries';
import { getPartnerExperienceById } from '../data/partnerExperiences';
import { getBadgeById } from '../data/badges';
import PassportBadge from '../components/PassportBadge';
import { theme } from '../utils/theme';

const { width } = Dimensions.get('window');

const ExperienceCompleteScreen = ({ route, navigation }) => {
  const { 
    contentId, 
    contentType, 
    pointsEarned, 
    badgeEarned,
    socialShareData 
  } = route.params;
  
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.5));
  const [slideAnim] = useState(new Animated.Value(50));
  const [showSocialPreview, setShowSocialPreview] = useState(false);

  // Recupera il contenuto in base al tipo
  const getContentByType = () => {
    switch (contentType) {
      case 'challenge':
        return getChallengeById(contentId);
      case 'narrative_path':
        return getNarrativePathById(contentId);
      case 'itinerary':
        return getItineraryById(contentId);
      case 'partner_experience':
        return getPartnerExperienceById(contentId);
      default:
        return null;
    }
  };

  const content = getContentByType();
  const badge = badgeEarned ? getBadgeById(badgeEarned) : null;

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

  const getContentTypeIcon = (type) => {
    switch (type) {
      case 'challenge': return '🎯';
      case 'narrative_path': return '🎭';
      case 'itinerary': return '🗺️';
      case 'partner_experience': return '🍷';
      default: return '✨';
    }
  };

  const getContentTypeLabel = (type) => {
    switch (type) {
      case 'challenge': return 'Sfida';
      case 'narrative_path': return 'Percorso Narrativo';
      case 'itinerary': return 'Itinerario';
      case 'partner_experience': return 'Esperienza Partner';
      default: return 'Esperienza';
    }
  };

  const generateSocialShareText = () => {
    const emoji = getContentTypeIcon(contentType);
    const typeLabel = getContentTypeLabel(contentType);
    
    return `${emoji} Ho completato "${content?.title || content?.name}" su JourneyFlux! ${typeLabel} incredibile che svela i segreti nascosti d'Italia. 🇮🇹✨ #JourneyFlux #ItaliaSegreta`;
  };

  const handleShare = async () => {
    try {
      const shareText = generateSocialShareText();
      await Share.share({
        message: shareText,
        url: 'https://journeyflux.it' // URL placeholder
      });
    } catch (error) {
      Alert.alert('Errore', 'Impossibile condividere in questo momento');
    }
  };

  const handleContinue = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeTab' }],
    });
  };

  const handleViewProfile = () => {
    navigation.navigate('ProfileTab');
  };

  const toggleSocialPreview = () => {
    setShowSocialPreview(!showSocialPreview);
  };

  if (!content) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Contenuto non trovato</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Animated.View 
            style={[
              styles.content,
              { 
                opacity: fadeAnim,
                transform: [
                  { scale: scaleAnim },
                  { translateY: slideAnim }
                ]
              }
            ]}
          >
            {/* Header Success */}
            <View style={styles.successHeader}>
              <Text style={styles.successIcon}>🎉</Text>
              <Text style={styles.successTitle}>Complimenti!</Text>
              <Text style={[styles.successSubtitle, {fontFamily: 'Nunito_400Regular'}]}>
                Hai completato {getContentTypeLabel(contentType).toLowerCase()}
              </Text>
            </View>

            {/* Content Info */}
            <View style={styles.contentCard}>
              <View style={styles.contentHeader}>
                <Text style={[styles.contentIcon, {fontFamily: 'Nunito_700Bold'}]}>{getContentTypeIcon(contentType)}</Text>
                <Text style={styles.contentType}>{getContentTypeLabel(contentType)}</Text>
              </View>
              <Text style={styles.contentTitle}>
                {content.title || content.name}
              </Text>
              <Text style={styles.contentDescription}>
                {content.description}
              </Text>
            </View>

            {/* Rewards Section */}
            <View style={styles.rewardsSection}>
              <Text style={styles.rewardsTitle}>Le tue ricompense</Text>
              
              {/* Points */}
              <View style={styles.rewardCard}>
                <Text style={[styles.rewardIcon, {fontFamily: 'Nunito_700Bold'}]}>⭐</Text>
                <View style={styles.rewardContent}>
                  <Text style={styles.rewardTitle}>Punti Esperienza</Text>
                  <Text style={styles.rewardValue}>+{pointsEarned} punti</Text>
                </View>
              </View>

              {/* Badge */}
              {badge && (
                <View style={styles.rewardCard}>
                  <PassportBadge badge={badge} size="medium" />
                  <View style={styles.rewardContent}>
                    <Text style={styles.rewardTitle}>Nuovo Badge</Text>
                    <Text style={styles.rewardName}>{badge.name}</Text>
                    <Text style={styles.rewardDescription}>{badge.description}</Text>
                  </View>
                </View>
              )}
            </View>

            {/* Social Preview */}
            <TouchableOpacity 
              style={styles.socialPreviewButton}
              onPress={toggleSocialPreview}
            >
              <Ionicons name="share-social" size={20} color="#fff" />
              <Text style={styles.socialPreviewText}>
                {showSocialPreview ? 'Nascondi' : 'Anteprima'} Stories
              </Text>
            </TouchableOpacity>

            {showSocialPreview && (
              <Animated.View style={styles.socialPreview}>
                <View style={styles.storyCard}>
                  <LinearGradient
                    colors={['#FF6B6B', '#4ECDC4']}
                    style={styles.storyGradient}
                  >
                    <Text style={styles.storyEmoji}>{getContentTypeIcon(contentType)}</Text>
                    <Text style={styles.storyTitle}>{content.title || content.name}</Text>
                    {badge && (
                      <View style={styles.storyBadge}>
                        <Text style={styles.storyBadgeText}>{badge.icon} {badge.name}</Text>
                      </View>
                    )}
                    <Text style={styles.storyFooter}>JourneyFlux</Text>
                  </LinearGradient>
                </View>
                <Text style={styles.socialPreviewNote}>
                  Perfetto per Instagram Stories! 📸
                </Text>
              </Animated.View>
            )}

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                <Ionicons name="share" size={20} color="#fff" />
                <Text style={styles.shareButtonText}>Condividi</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.profileButton} onPress={handleViewProfile}>
                <Ionicons name="person" size={20} color="#667eea" />
                <Text style={styles.profileButtonText}>Vedi Profilo</Text>
              </TouchableOpacity>
            </View>

            {/* Continue Button */}
            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
              <Text style={styles.continueButtonText}>Continua Esplorazione</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  successHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  successIcon: {
    fontSize: 60,
    marginBottom: 10,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Nunito_700Bold',
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 16,
    color: '#E2E8F0',
    fontFamily: 'Nunito_400Regular',
    textAlign: 'center',
    marginTop: 5,
  },
  contentCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  contentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contentIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  contentType: {
    fontSize: 14,
    color: '#667eea',
    fontFamily: 'Nunito_600SemiBold',
    textTransform: 'uppercase',
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    fontFamily: 'Nunito_700Bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  contentDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    fontFamily: 'Nunito_400Regular',
    textAlign: 'center',
    lineHeight: 20,
  },
  rewardsSection: {
    width: '100%',
    marginBottom: 20,
  },
  rewardsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Nunito_700Bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  rewardCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  rewardIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  rewardContent: {
    flex: 1,
  },
  rewardTitle: {
    fontSize: 14,
    color: '#667eea',
    fontFamily: 'Nunito_600SemiBold',
    textTransform: 'uppercase',
  },
  rewardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    fontFamily: 'Nunito_700Bold',
  },
  rewardName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    fontFamily: 'Nunito_700Bold',
  },
  rewardDescription: {
    fontSize: 12,
    color: '#7F8C8D',
    fontFamily: 'Nunito_400Regular',
    marginTop: 2,
  },
  socialPreviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 15,
  },
  socialPreviewText: {
    color: '#fff',
    fontFamily: 'Nunito_600SemiBold',
    marginLeft: 8,
  },
  socialPreview: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  storyCard: {
    width: 200,
    height: 300,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 10,
  },
  storyGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  storyEmoji: {
    fontSize: 48,
    marginBottom: 20,
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Nunito_700Bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  storyBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 20,
  },
  storyBadgeText: {
    color: '#fff',
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 12,
  },
  storyFooter: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Nunito_700Bold',
    position: 'absolute',
    bottom: 20,
  },
  socialPreviewNote: {
    fontSize: 12,
    color: '#E2E8F0',
    fontFamily: 'Nunito_400Regular',
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
  },
  shareButton: {
    flex: 1,
    backgroundColor: '#4ECDC4',
    borderRadius: 12,
    paddingVertical: 15,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButtonText: {
    color: '#fff',
    fontFamily: 'Nunito_600SemiBold',
    marginLeft: 8,
  },
  profileButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 15,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileButtonText: {
    color: '#667eea',
    fontFamily: 'Nunito_600SemiBold',
    marginLeft: 8,
  },
  continueButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 40,
    alignItems: 'center',
    width: '100%',
  },
  continueButtonText: {
    color: '#667eea',
    fontSize: 16,
    fontFamily: 'Nunito_700Bold',
  },
  errorText: {
    fontSize: 16,
    color: '#E74C3C',
    fontFamily: 'Nunito_400Regular',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default ExperienceCompleteScreen;
