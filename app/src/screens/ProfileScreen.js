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

const ProfileScreen = ({ navigation }) => {
  const userProfile = getUserProfile();
  const earnedBadges = getEarnedBadges();
  const availableBadges = getAvailableBadges();
  const completedChallenges = getCompletedChallenges();
  
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
                Segui gli itinerari della community per badges collaborativi!
              </Text>
            </View>
          )}
        </View>

        {/* Attività Recenti */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Attività Recenti</Text>
          <View style={styles.activityContainer}>
            <View style={styles.activityItem}>
              <Text style={styles.activityIcon}>🎭</Text>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Percorsi Narrativi</Text>
                <Text style={styles.activitySubtitle}>
                  {userProfile.stats.narrativePathsCompleted} completati
                </Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <Text style={styles.activityIcon}>🗺️</Text>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Itinerari Seguiti</Text>
                <Text style={styles.activitySubtitle}>
                  {userProfile.stats.itinerariesFollowed} esplorati
                </Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <Text style={styles.activityIcon}>🍷</Text>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Partner Visitati</Text>
                <Text style={styles.activitySubtitle}>
                  {userProfile.stats.partnersVisited} locali scoperti
                </Text>
              </View>
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
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryTag: {
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: theme.fonts.semiBold,
  },
  activityContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  activityIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.semiBold,
    color: '#2C3E50',
    marginBottom: 2,
  },
  activitySubtitle: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#7F8C8D',
  },
});

export default ProfileScreen;
