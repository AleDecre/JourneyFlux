import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import BadgeCard from '../components/BadgeCard';
import StatCard from '../components/StatCard';
import PassportBadge from '../components/PassportBadge';
import { getUserProfile } from '../data/user';
import { getEarnedBadges, getAvailableBadges, getBadgesByType, getBadgesByTypeWithCounts } from '../data/badges';
import { getCompletedChallenges } from '../data/challenges';
import { theme } from '../utils/theme';
import { usePlanner } from '../context/PlannerContext';

const ProfileScreen = ({ navigation }) => {
  const userProfile = getUserProfile();
  const earnedBadges = getEarnedBadges();
  const availableBadges = getAvailableBadges();
  const completedChallenges = getCompletedChallenges();
  const { state: plannerState } = usePlanner();
  const savedTrips = plannerState.savedTrips || [];
  
  // MVP 2.0 - Badge categories - Using helper functions
  const narrativeBadges = getBadgesByTypeWithCounts('narrativo');
  const partnerBadges = getBadgesByTypeWithCounts('partner');
  const communityBadges = getBadgesByTypeWithCounts('community');
  const rareBadges = earnedBadges.filter(badge => badge.rarity === 'raro' || badge.rarity === 'epico');

  const getProgressPercentage = () => {
    const totalContent = userProfile.stats.challengesTotal + 
                        userProfile.stats.narrativePathsTotal + 
                        userProfile.stats.itinerariesTotal;
    const completedContent = userProfile.stats.challengesCompleted + 
                           userProfile.stats.narrativePathsCompleted + 
                           userProfile.stats.itinerariesFollowed;
    return Math.round((completedContent / totalContent) * 100);
  };

  const renderBadgeItem = ({ item }) => (
    <BadgeCard badge={item} size="medium" />
  );

  const renderPassportBadge = ({ item }) => (
    <PassportBadge badge={item} size="medium" />
  );

  const renderCompletedChallenge = ({ item }) => (
    <TouchableOpacity
      style={styles.challengeItem}
      onPress={() => navigation.navigate('Challenge', { challengeId: item.id })}
    >
      <View style={styles.challengeContent}>
        <Text style={styles.challengeEmoji}>{item.image}</Text>
        <View style={styles.challengeDetails}>
          <Text style={styles.challengeTitle}>{item.title}</Text>
          <Text style={styles.challengeLocation}>{item.location}</Text>
          <Text style={styles.challengePoints}>{item.points} punti</Text>
        </View>
        <View style={styles.completedBadge}>
          <Text style={styles.completedText}>✓</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Profilo</Text>
            <Text style={styles.subtitle}>
              Benvenuto, {userProfile.username}
            </Text>
          </View>
          <View style={styles.headerInfoBox}>
            <Text style={styles.headerInfoLabel}>Story Points</Text>
            <Text style={styles.headerInfoValue}>{userProfile.stats.storyPoints}</Text>
          </View>
        </View>
      </LinearGradient>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Profile */}
        

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <StatCard
              title="Progresso Totale"
              value={`${getProgressPercentage()}%`}
              subtitle={`Esperienze completate`}
              icon="📊"
              colors={['#4ECDC4', '#44A08D']}
            />
            <StatCard
              title="Story Points"
              value={userProfile.stats.storyPoints}
              subtitle={`${userProfile.stats.totalPoints} punti totali`}
              icon="🌟"
              colors={['#667eea', '#764ba2']}
            />
          </View>
          <View style={styles.statsRow}>
            <StatCard
              title="Città Esplorate"
              value={userProfile.stats.citiesVisited}
              subtitle="Italia"
              icon="🏙️"
              colors={['#F06292', '#E91E63']}
            />
            <StatCard
              title="Badge Rari"
              value={rareBadges.length}
              subtitle={`${userProfile.stats.badgesEarned} totali`}
              icon="💎"
              colors={['#9C27B0', '#673AB7']}
            />
          </View>
        </View>

        {/* Passaporto Digitale - Featured Badges */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎫 Passaporto Digitale</Text>
          <Text style={styles.sectionSubtitle}>I tuoi badge più preziosi</Text>
          {rareBadges.length > 0 ? (
            <FlatList
              data={rareBadges}
              renderItem={renderPassportBadge}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.badgesContainer}
            />
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                Completa i Percorsi Narrativi per sbloccare badge esclusivi! 🎭
              </Text>
            </View>
          )}
        </View>

        {/* Badge Narrativi */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎭 Badge Narrativi ({narrativeBadges.earned.length}/{narrativeBadges.total.length})</Text>
          {narrativeBadges.earned.length > 0 ? (
            <FlatList
              data={narrativeBadges.earned}
              renderItem={renderBadgeItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.badgesContainer}
            />
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                Inizia un Percorso Narrativo per sbloccare i tuoi primi badge da esploratore! 
              </Text>
            </View>
          )}
        </View>

        {/* Badge Partner */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🍷 Badge Partner ({partnerBadges.earned.length}/{partnerBadges.total.length})</Text>
          {partnerBadges.earned.length > 0 ? (
            <FlatList
              data={partnerBadges.earned}
              renderItem={renderBadgeItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.badgesContainer}
            />
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                Visita i nostri partner locali per badge esclusivi e sconti speciali!
              </Text>
            </View>
          )}
        </View>

        {/* Badge Community */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🗺️ Badge Community ({communityBadges.earned.length}/{communityBadges.total.length})</Text>
          {communityBadges.earned.length > 0 ? (
            <FlatList
              data={communityBadges.earned}
              renderItem={renderBadgeItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.badgesContainer}
            />
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                Segui gli itinerari della community per sbloccare badge sociali!
              </Text>
            </View>
          )}
        </View>

        {/* Sezione Coupon e Loyalty */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎫 I tuoi Coupon</Text>
          {userProfile.couponsEarned && userProfile.couponsEarned.length > 0 ? (
            <View style={styles.couponsContainer}>
              {userProfile.couponsEarned.map((coupon, index) => (
                <TouchableOpacity
                  key={coupon.id}
                  style={[
                    styles.couponCard,
                    coupon.used && styles.couponCardUsed
                  ]}
                  onPress={() => {
                    if (!coupon.used) {
                      Alert.alert(
                        'Utilizza Coupon',
                        `${coupon.title}\n\nCodice: ${coupon.code}\nValore: ${coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `€${coupon.discountValue}`}\n\nMostra questo codice al partner per utilizzare l'offerta.`,
                        [
                          { text: 'Chiudi', style: 'cancel' },
                          { text: 'Copia Codice', onPress: () => console.log('Code copied:', coupon.code) }
                        ]
                      );
                    }
                  }}
                >
                  <LinearGradient
                    colors={coupon.used ? ['#BDC3C7', '#95A5A6'] : ['#FF6B6B', '#FF8E8E']}
                    style={styles.couponGradient}
                  >
                    <View style={styles.couponHeader}>
                      <Text style={styles.couponTitle}>{coupon.title}</Text>
                      <View style={styles.couponValue}>
                        <Text style={styles.couponValueText}>
                          {coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `€${coupon.discountValue}`}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.couponDescription}>{coupon.description}</Text>
                    <View style={styles.couponFooter}>
                      <Text style={styles.couponCode}>Codice: {coupon.code}</Text>
                      <Text style={styles.couponExpiry}>
                        Scade: {new Date(coupon.validUntil).toLocaleDateString('it-IT')}
                      </Text>
                    </View>
                    {coupon.used && (
                      <View style={styles.usedBadge}>
                        <Text style={styles.usedBadgeText}>UTILIZZATO</Text>
                      </View>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                Completa 3 viaggi per sbloccare i tuoi primi coupon partner!
              </Text>
            </View>
          )}
        </View>

        {/* Sezione Loyalty Progress */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏆 Programma Fedeltà</Text>
          <View style={styles.loyaltyContainer}>
            <View style={styles.loyaltyHeader}>
              <Text style={styles.loyaltyLevel}>
                Livello {userProfile.loyaltyProgress.currentLevel}
              </Text>
              <Text style={styles.loyaltyProgress}>
                {userProfile.loyaltyProgress.tripsCompleted} / {userProfile.loyaltyProgress.tripsCompleted + userProfile.loyaltyProgress.tripsToNextLevel} viaggi
              </Text>
            </View>
            
            <View style={styles.loyaltyProgressBar}>
              <View 
                style={[
                  styles.loyaltyProgressFill,
                  { 
                    width: `${(userProfile.loyaltyProgress.tripsCompleted / (userProfile.loyaltyProgress.tripsCompleted + userProfile.loyaltyProgress.tripsToNextLevel)) * 100}%` 
                  }
                ]}
              />
            </View>
            
            <Text style={styles.loyaltyNextLevel}>
              Prossimo livello: {userProfile.loyaltyProgress.tripsToNextLevel} viaggi rimanenti
            </Text>
            
            <View style={styles.loyaltyRewards}>
              <Text style={styles.loyaltyRewardsTitle}>Ricompense prossimo livello:</Text>
              {userProfile.loyaltyProgress.nextLevelRewards.map((reward, index) => (
                <Text key={index} style={styles.loyaltyReward}>• {reward}</Text>
              ))}
            </View>
          </View>
        </View>

        {/* User Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚙️ Preferenze</Text>
          <View style={styles.preferencesContainer}>
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>Tipologie preferite:</Text>
              <View style={styles.categoriesContainer}>
                {userProfile.preferences.favoriteCategories.map((category, index) => (
                  <View key={index} style={styles.categoryTag}>
                    <Text style={styles.categoryText}>{category}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>Difficoltà preferita:</Text>
              <Text style={styles.preferenceValue}>{userProfile.preferences.difficulty}</Text>
            </View>
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>Tempo medio per esperienza:</Text>
              <Text style={styles.preferenceValue}>{userProfile.preferences.averageTime} minuti</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
  },
  headerInfoBox: {
    alignItems: 'center',
    // nessun background opaco
  },
  headerInfoLabel: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: 'rgba(255,255,255,0.8)',
  },
  headerInfoValue: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
  },
  statsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    color: '#2C3E50',
    marginBottom: 16,
    marginHorizontal: 16,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#7F8C8D',
    marginBottom: 12,
    marginHorizontal: 16,
  },
  badgesContainer: {
    paddingHorizontal: 8,
  },
  challengeItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  challengeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  challengeEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  challengeDetails: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.semiBold,
    color: '#2C3E50',
    marginBottom: 4,
  },
  challengeLocation: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#7F8C8D',
    marginBottom: 4,
  },
  challengePoints: {
    fontSize: 14,
    color: '#4ECDC4',
    fontFamily: theme.fonts.semiBold,
  },
  completedBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#27AE60',
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: theme.fonts.bold,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 16,
  },
  startButton: {
    borderRadius: 12,
  },
  startButtonGradient: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: theme.fonts.semiBold,
  },
  preferencesContainer: {
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  preferenceItem: {
    marginBottom: 16,
  },
  preferenceLabel: {
    fontSize: 14,
    fontFamily: theme.fonts.semiBold,
    color: '#2C3E50',
    marginBottom: 8,
  },
  preferenceValue: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#7F8C8D',
  },
  
  // Nuovi stili per coupon e loyalty
  couponsContainer: {
    paddingHorizontal: 16,
  },
  couponCard: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  couponCardUsed: {
    opacity: 0.6,
  },
  couponGradient: {
    padding: 16,
  },
  couponHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  couponTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.semiBold,
    color: '#FFFFFF',
    flex: 1,
  },
  couponValue: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  couponValueText: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
  },
  couponDescription: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#FFFFFF',
    marginBottom: 12,
    opacity: 0.9,
  },
  couponFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  couponCode: {
    fontSize: 12,
    fontFamily: theme.fonts.semiBold,
    color: '#FFFFFF',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  couponExpiry: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  usedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  usedBadgeText: {
    fontSize: 10,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
  },
  
  // Stili per loyalty program
  loyaltyContainer: {
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  loyaltyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  loyaltyLevel: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#2C3E50',
  },
  loyaltyProgress: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#7F8C8D',
  },
  loyaltyProgressBar: {
    height: 8,
    backgroundColor: '#E9ECEF',
    borderRadius: 4,
    marginBottom: 8,
  },
  loyaltyProgressFill: {
    height: '100%',
    backgroundColor: '#4ECDC4',
    borderRadius: 4,
  },
  loyaltyNextLevel: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#7F8C8D',
    marginBottom: 16,
  },
  loyaltyRewards: {
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
    paddingTop: 12,
  },
  loyaltyRewardsTitle: {
    fontSize: 14,
    fontFamily: theme.fonts.semiBold,
    color: '#2C3E50',
    marginBottom: 8,
  },
  loyaltyReward: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#7F8C8D',
    marginBottom: 4,
  },
});

export default ProfileScreen;
