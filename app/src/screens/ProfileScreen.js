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
import { getUserProfile } from '../data/user';
import { getEarnedBadges, getAvailableBadges } from '../data/badges';
import { getCompletedChallenges } from '../data/challenges';
import { theme } from '../utils/theme';

const ProfileScreen = ({ navigation }) => {
  const userProfile = getUserProfile();
  const earnedBadges = getEarnedBadges();
  const availableBadges = getAvailableBadges();
  const completedChallenges = getCompletedChallenges();

  const getProgressPercentage = () => {
    return Math.round((userProfile.stats.challengesCompleted / userProfile.stats.challengesTotal) * 100);
  };

  const renderBadgeItem = ({ item }) => (
    <BadgeCard badge={item} size="medium" />
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
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Profile */}
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatar}>{userProfile.profileImage}</Text>
            </View>
            <Text style={styles.username}>{userProfile.username}</Text>
            <Text style={styles.joinDate}>
              Membro dal {new Date(userProfile.joinDate).toLocaleDateString('it-IT', {
                month: 'long',
                year: 'numeric'
              })}
            </Text>
          </View>

          <View style={styles.quickStats}>
            <View style={styles.quickStatItem}>
              <Text style={styles.quickStatValue}>{userProfile.stats.totalPoints}</Text>
              <Text style={styles.quickStatLabel}>Punti Totali</Text>
            </View>
            <View style={styles.quickStatItem}>
              <Text style={styles.quickStatValue}>{userProfile.stats.challengesCompleted}</Text>
              <Text style={styles.quickStatLabel}>Sfide Completate</Text>
            </View>
            <View style={styles.quickStatItem}>
              <Text style={styles.quickStatValue}>{userProfile.stats.badgesEarned}</Text>
              <Text style={styles.quickStatLabel}>Badge Ottenuti</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <StatCard
              title="Progresso"
              value={`${getProgressPercentage()}%`}
              subtitle={`${userProfile.stats.challengesCompleted}/${userProfile.stats.challengesTotal} sfide`}
              icon="📊"
              colors={['#4ECDC4', '#44A08D']}
            />
            <StatCard
              title="Streak"
              value={userProfile.stats.currentStreak}
              subtitle={`Record: ${userProfile.stats.longestStreak}`}
              icon="🔥"
              colors={['#FFB74D', '#FF9800']}
            />
          </View>
          <View style={styles.statsRow}>
            <StatCard
              title="Città visitate"
              value={userProfile.stats.citiesVisited}
              subtitle="Italia"
              icon="🏙️"
              colors={['#F06292', '#E91E63']}
            />
            <StatCard
              title="Livello"
              value={Math.floor(userProfile.stats.totalPoints / 100) + 1}
              subtitle={`${userProfile.stats.totalPoints % 100}/100 al prossimo`}
              icon="⭐"
              colors={['#9C27B0', '#673AB7']}
            />
          </View>
        </View>

        {/* Earned Badges */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Badge Ottenuti ({earnedBadges.length})</Text>
          {earnedBadges.length > 0 ? (
            <FlatList
              data={earnedBadges}
              renderItem={renderBadgeItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.badgesContainer}
            />
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                Nessun badge ottenuto ancora. Completa le sfide per sbloccare i primi badge!
              </Text>
            </View>
          )}
        </View>

        {/* Available Badges */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Badge Disponibili ({availableBadges.length})</Text>
          <FlatList
            data={availableBadges.slice(0, 6)}
            renderItem={renderBadgeItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.badgesContainer}
          />
        </View>

        {/* Completed Challenges */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sfide Completate ({completedChallenges.length})</Text>
          {completedChallenges.length > 0 ? (
            <FlatList
              data={completedChallenges}
              renderItem={renderCompletedChallenge}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
            />
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                Nessuna sfida completata ancora. Inizia la tua prima avventura!
              </Text>
              <TouchableOpacity
                style={styles.startButton}
                onPress={() => navigation.navigate('Home')}
              >
                <LinearGradient
                  colors={['#4ECDC4', '#44A08D']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.startButtonGradient}
                >
                  <Text style={styles.startButtonText}>Inizia Ora</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* User Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferenze</Text>
          <View style={styles.preferencesContainer}>
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>Categorie preferite:</Text>
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
              <Text style={styles.preferenceLabel}>Città di origine:</Text>
              <Text style={styles.preferenceValue}>{userProfile.location.homeCity}</Text>
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
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatar: {
    fontSize: 48,
  },
  username: {
    fontSize: 28,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  joinDate: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
  },
  quickStatItem: {
    alignItems: 'center',
  },
  quickStatValue: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
  },
  quickStatLabel: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 4,
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
});

export default ProfileScreen;
