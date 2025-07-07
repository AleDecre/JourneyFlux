import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { getPartnerExperienceById } from '../data/partnerExperiences';
import { getBadgeById } from '../data/badges';
import { theme } from '../utils/theme';
import PassportBadge from '../components/PassportBadge';
import QRCode from 'react-native-qrcode-svg';

export default function PartnerExperienceScreen({ navigation }) {
  const route = useRoute();
  const { partnerExperienceId } = route.params;
  const partner = getPartnerExperienceById(partnerExperienceId);
  const [showQRCode, setShowQRCode] = React.useState(false);

  if (!partner) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Partner Experience non trovata</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Recupera il badge dall'ID
  const badge = getBadgeById(partner.rewards?.badge);

  const handleRedeemOffer = () => {
    setShowQRCode(true);
  };

  const handleCompletePartnerExperience = () => {
    // Navigate to experience complete screen
    navigation.navigate('ExperienceComplete', {
      contentId: partner.id,
      contentType: 'partner_experience',
      pointsEarned: partner.rewards?.points || 100,
      badgeEarned: partner.rewards?.badge || 'badge_partner_explorer',
      socialShareData: {
        title: partner.name,
        description: partner.experience?.description,
        partnerName: partner.partner?.name
      }
    });
  };

  const getPartnerTypeColors = () => {
    switch (partner.partner?.type) {
      case 'bar':
        return ['#FF6B6B', '#FF8E8E'];
      case 'ristorante':
        return ['#27AE60', '#2ECC71'];
      case 'bottega':
        return ['#8B5CF6', '#A78BFA'];
      case 'laboratorio':
        return ['#F59E0B', '#FBBF24'];
      default:
        return ['#4ECDC4', '#7ED5D1'];
    }
  };

  const getPartnerTypeIcon = () => {
    switch (partner.partner?.type) {
      case 'bar':
        return 'wine-outline';
      case 'ristorante':
        return 'restaurant-outline';
      case 'bottega':
        return 'storefront-outline';
      case 'laboratorio':
        return 'construct-outline';
      default:
        return 'business-outline';
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={getPartnerTypeColors()}
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
            <View style={styles.partnerTypeContainer}>
              <Ionicons name={getPartnerTypeIcon()} size={32} color="#FFFFFF" />
              <Text style={styles.partnerType}>{partner.partner?.type?.toUpperCase()}</Text>
            </View>
            <Text style={styles.title}>{partner.name}</Text>
            <Text style={styles.partnerName}>{partner.partner?.name}</Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={16} color="rgba(255, 255, 255, 0.9)" />
              <Text style={styles.location}>{partner.partner?.address}</Text>
            </View>
          </View>
        </LinearGradient>
        <View style={styles.content}>
          {/* Offerta Speciale */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎯 Offerta Speciale</Text>
            <View style={styles.offerCard}>
              <View style={styles.offerHeader}>
                <Text style={styles.offerTitle}>{partner.experience?.title}</Text>
                <Text style={styles.offerDiscount}>{partner.experience?.discountPercentage ? `-${partner.experience.discountPercentage}%` : ''}</Text>
              </View>
              <Text style={styles.offerDescription}>{partner.experience?.description}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.originalPrice}>{partner.experience?.originalPrice || ''}</Text>
                <Text style={styles.discountedPrice}>{partner.experience?.discountedPrice || ''}</Text>
                {partner.experience?.originalPrice && partner.experience?.discountedPrice &&
                  typeof partner.experience.originalPrice === 'string' &&
                  typeof partner.experience.discountedPrice === 'string' ? (
                  <Text style={styles.savings}>
                    Risparmi €{(
                      parseFloat(partner.experience.originalPrice.replace('€', '')) -
                      parseFloat(partner.experience.discountedPrice.replace('€', ''))
                    ).toFixed(0)}
                  </Text>
                ) : null}
              </View>
              
              {/* Validità */}
              <View style={styles.validityContainer}>
                <Ionicons name="calendar-outline" size={16} color="#7F8C8D" />
                <Text style={styles.validityText}>
                  Valido: {partner.experience?.validDays?.join(', ') || 'tutti i giorni'}
                </Text>
              </View>
              <View style={styles.hoursContainer}>
                <Ionicons name="time-outline" size={16} color="#7F8C8D" />
                <Text style={styles.hoursText}>
                  Orari: {partner.experience?.validHours || '18:00-20:00'}
                </Text>
              </View>
            </View>
          </View>

          {/* Come Riscattare */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📱 Come Riscattare</Text>
            <View style={styles.redemptionCard}>
              {!showQRCode ? (
                <>
                  <Text style={styles.instructionsTitle}>Riscatta l'offerta</Text>
                  <Text style={styles.instructionsText}>
                    {partner.redemption?.instructions || "Mostra questo QR al personale e menziona 'JourneyFlux'"}
                  </Text>
                  <TouchableOpacity 
                    style={styles.qrConfirmButton} 
                    onPress={handleRedeemOffer}
                  >
                    <Text style={styles.qrConfirmButtonText}>Genera QR Code</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <View style={styles.qrContainer}>
                  <Text style={styles.qrTitle}>Mostra questo QR al personale</Text>
                  <QRCode
                    value={partner.redemption?.code || 'JOURNEYFLUX_PARTNER'}
                    size={150}
                    color="#2C3E50"
                    backgroundColor="#FFFFFF"
                  />
                  <Text style={styles.qrCodeText}>Codice: {partner.redemption?.code || 'JOURNEYFLUX_PARTNER'}</Text>
                  <TouchableOpacity 
                    style={styles.qrConfirmButton} 
                    onPress={handleCompletePartnerExperience}
                  >
                    <Text style={styles.qrConfirmButtonText}>Ho Utilizzato l'Offerta</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>

          {/* Dettagli Partner */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ℹ️ Dettagli Partner</Text>
            <View style={styles.detailsCard}>
              <View style={styles.detailRow}>
                <Ionicons name="business-outline" size={20} color="#4ECDC4" />
                <Text style={styles.detailText}>{partner.partner?.name}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="location-outline" size={20} color="#4ECDC4" />
                <Text style={styles.detailText}>{partner.partner?.address}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="restaurant-outline" size={20} color="#4ECDC4" />
                <Text style={styles.detailText}>{partner.partner?.type?.charAt(0).toUpperCase() + partner.partner?.type?.slice(1)}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="star-outline" size={20} color="#4ECDC4" />
                <Text style={styles.detailText}>Partner verificato JourneyFlux</Text>
              </View>
            </View>
          </View>

          {/* Ricompensa */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🏆 Ricompensa</Text>
            <View style={styles.rewardsCard}>
              <View style={styles.pointsContainer}>
                <Ionicons name="diamond-outline" size={24} color="#4ECDC4" />
                <Text style={styles.pointsText}>{partner.rewards?.points} punti</Text>
              </View>
              {badge && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeLabel}>Badge da sbloccare:</Text>
                  <PassportBadge badge={badge} size="large" />
                </View>
              )}
              <View style={styles.unlockContainer}>
                <Ionicons name="lock-closed-outline" size={16} color="#7F8C8D" />
                <Text style={styles.unlockText}>
                  Ricompensa sbloccata dopo aver utilizzato l'offerta
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
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
  partnerTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
  },
  partnerType: {
    fontSize: 14,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  title: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  partnerName: {
    fontSize: 18,
    fontFamily: theme.fonts.semiBold,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  location: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: 'rgba(255, 255, 255, 0.9)',
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
  offerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  offerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  offerTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#2C3E50',
    flex: 1,
    marginRight: 12,
  },
  offerDiscount: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: '#E74C3C',
  },
  offerDescription: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#34495E',
    lineHeight: 20,
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  originalPrice: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: '#7F8C8D',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  discountedPrice: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: '#27AE60',
    marginRight: 8,
  },
  savings: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: '#27AE60',
    backgroundColor: '#D5EDDA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  validityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  validityText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#34495E',
    marginLeft: 8,
  },
  hoursContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hoursText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#34495E',
    marginLeft: 8,
  },
  redemptionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  qrCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  qrCodeText: {
    fontSize: 12,
    fontFamily: theme.fonts.medium,
    color: '#7F8C8D',
    marginTop: 4,
  },
  codeContainer: {
    flex: 1,
  },
  codeLabel: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: '#7F8C8D',
    marginBottom: 4,
  },
  codeValue: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#2C3E50',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  instructionsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
    paddingTop: 16,
  },
  instructionsTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.semiBold,
    color: '#2C3E50',
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#34495E',
    lineHeight: 20,
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
  },
  unlockText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#7F8C8D',
    marginLeft: 8,
    fontStyle: 'italic',
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#34495E',
    marginLeft: 12,
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
  qrContainer: {
    alignItems: 'center',
    marginVertical: 32,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  qrTitle: {
    fontSize: 16,
    fontFamily: 'Nunito_700Bold',
    color: '#2C3E50',
    marginBottom: 16,
    textAlign: 'center',
  },
  qrCodeText: {
    fontSize: 14,
    fontFamily: 'Nunito_600SemiBold',
    color: '#7F8C8D',
    marginTop: 12,
    marginBottom: 8,
  },
  qrConfirmButton: {
    backgroundColor: '#4ECDC4',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 32,
    marginTop: 16,
  },
  qrConfirmButtonText: {
    color: '#fff',
    fontFamily: 'Nunito_700Bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
