import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  RefreshControl,
  TouchableOpacity 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import ChallengeCard from '../components/ChallengeCard';
import CitySelector from '../components/CitySelector';
import { challenges } from '../data/challenges';
import { cities, getFeaturedCities } from '../data/cities';
import { getUserProfile } from '../data/user';

const HomeScreen = ({ navigation }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [showAllChallenges, setShowAllChallenges] = useState(false);
  
  const userProfile = getUserProfile();
  const featuredCities = getFeaturedCities();

  const filteredChallenges = selectedCity 
    ? challenges.filter(challenge => 
        challenge.location.toLowerCase().includes(selectedCity.name.toLowerCase())
      )
    : challenges;

  const displayedChallenges = showAllChallenges 
    ? filteredChallenges 
    : filteredChallenges.slice(0, 3);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleChallengePress = (challenge) => {
    navigation.navigate('Challenge', { challengeId: challenge.id });
  };

  const handleCitySelect = (city) => {
    setSelectedCity(selectedCity?.id === city.id ? null : city);
    setShowAllChallenges(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Ciao, {userProfile.username}! 👋</Text>
            <Text style={styles.subtitle}>
              Pronti per una nuova avventura?
            </Text>
          </View>
          <View style={styles.pointsContainer}>
            <Text style={styles.pointsLabel}>Punti</Text>
            <Text style={styles.pointsValue}>{userProfile.stats.totalPoints}</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <CitySelector
          cities={featuredCities}
          selectedCity={selectedCity}
          onCitySelect={handleCitySelect}
        />

        <View style={styles.challengesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedCity ? `Sfide a ${selectedCity.name}` : 'Sfide Popolari'}
            </Text>
            <Text style={styles.challengeCount}>
              {filteredChallenges.length} disponibili
            </Text>
          </View>

          {displayedChallenges.length > 0 ? (
            <>
              {displayedChallenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  onPress={() => handleChallengePress(challenge)}
                />
              ))}
              
              {filteredChallenges.length > 3 && (
                <TouchableOpacity
                  style={styles.showMoreButton}
                  onPress={() => setShowAllChallenges(!showAllChallenges)}
                >
                  <LinearGradient
                    colors={['#4ECDC4', '#44A08D']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.showMoreGradient}
                  >
                    <Text style={styles.showMoreText}>
                      {showAllChallenges ? 'Mostra meno' : `Mostra tutte (${filteredChallenges.length - 3} rimanenti)`}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                Nessuna sfida disponibile per {selectedCity?.name}
              </Text>
              <TouchableOpacity
                style={styles.clearFilterButton}
                onPress={() => setSelectedCity(null)}
              >
                <Text style={styles.clearFilterText}>
                  Mostra tutte le sfide
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.quickStats}>
          <Text style={styles.quickStatsTitle}>I tuoi progressi</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userProfile.stats.challengesCompleted}</Text>
              <Text style={styles.statLabel}>Completate</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userProfile.stats.badgesEarned}</Text>
              <Text style={styles.statLabel}>Badge</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userProfile.stats.currentStreak}</Text>
              <Text style={styles.statLabel}>Streak</Text>
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
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
  },
  pointsContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  pointsLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  pointsValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  challengesSection: {
    marginTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  challengeCount: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  showMoreButton: {
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 12,
  },
  showMoreGradient: {
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  showMoreText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 16,
  },
  clearFilterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#4ECDC4',
    borderRadius: 8,
  },
  clearFilterText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  quickStats: {
    marginHorizontal: 16,
    marginVertical: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  quickStatsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 16,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4ECDC4',
  },
  statLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 4,
  },
});

export default HomeScreen;
