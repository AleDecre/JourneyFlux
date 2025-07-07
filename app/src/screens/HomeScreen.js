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
import NarrativePathCard from '../components/NarrativePathCard';
import ItineraryCard from '../components/ItineraryCard';
import PartnerExperienceCard from '../components/PartnerExperienceCard';
import CitySelector from '../components/CitySelector';
import { theme } from '../utils/theme';

// Data imports - MVP 2.0
import { challenges } from '../data/challenges';
import { cities, getFeaturedCities } from '../data/cities';
import { getUserProfile, getDisplayStats } from '../data/user';
import { getAllNarrativePaths, getFeaturedNarrativePaths, getNarrativePathsByCity } from '../data/narrativePaths';
import { getAllItineraries, getFeaturedItineraries, getItinerariesByCity } from '../data/itineraries';
import { getAllPartnerExperiences, getFeaturedPartnerExperiences, getPartnerExperiencesByCity } from '../data/partnerExperiences';

const CONTENT_TYPES = [
  { id: 'all', name: 'Tutti', icon: '🌟', color: '#667eea' },
  { id: 'narratives', name: 'Percorsi Narrativi', icon: '🎭', color: '#4ECDC4' },
  { id: 'itineraries', name: 'Itinerari', icon: '🗺️', color: '#FF6B6B' },
  { id: 'partners', name: 'Partner', icon: '🍷', color: '#45B7D1' },
  { id: 'challenges', name: 'Sfide', icon: '🏆', color: '#F06292' },
];

const HomeScreen = ({ navigation }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [showAllChallenges, setShowAllChallenges] = useState(false);
  const [showAllNarrativePaths, setShowAllNarrativePaths] = useState(false);
  const [showAllItineraries, setShowAllItineraries] = useState(false);
  const [showAllPartnerExperiences, setShowAllPartnerExperiences] = useState(false);
  const [experienceFilter, setExperienceFilter] = useState('all');
  
  const userProfile = getUserProfile();
  const featuredCities = getFeaturedCities();

  // Get content for all types
  const allNarrativePaths = getAllNarrativePaths();
  const allItineraries = getAllItineraries();
  const allPartnerExperiences = getAllPartnerExperiences();

  // Featured content
  const featuredNarrativePaths = getFeaturedNarrativePaths();
  const featuredItineraries = getFeaturedItineraries();
  const featuredPartnerExperiences = getFeaturedPartnerExperiences();

  // City-filtered content
  const narrativePathsToShow = selectedCity 
    ? getNarrativePathsByCity(selectedCity.name)
    : featuredNarrativePaths;

  const itinerariesToShow = selectedCity 
    ? getItinerariesByCity(selectedCity.name)
    : featuredItineraries;

  const partnerExperiencesToShow = selectedCity 
    ? getPartnerExperiencesByCity(selectedCity.name)
    : featuredPartnerExperiences;

  // Legacy challenges (maintained for compatibility)
  const filteredChallenges = selectedCity 
    ? challenges.filter(challenge => 
        challenge.location.toLowerCase().includes(selectedCity.name.toLowerCase())
      )
    : challenges;

  const displayedChallenges = showAllChallenges 
    ? filteredChallenges 
    : filteredChallenges.slice(0, 3);

  // Display logic for new content types
  const displayedNarrativePaths = showAllNarrativePaths 
    ? narrativePathsToShow 
    : narrativePathsToShow.slice(0, 3);

  const displayedItineraries = showAllItineraries 
    ? itinerariesToShow 
    : itinerariesToShow.slice(0, 3);

  const displayedPartnerExperiences = showAllPartnerExperiences 
    ? partnerExperiencesToShow 
    : partnerExperiencesToShow.slice(0, 3);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleChallengePress = (challenge) => {
    navigation.navigate('Challenge', { challengeId: challenge.id });
  };

  const handleNarrativePathPress = (path) => {
    navigation.navigate('NarrativePath', { narrativePathId: path.id });
  };

  const handleItineraryPress = (itinerary) => {
    navigation.navigate('Itinerary', { itineraryId: itinerary.id });
  };

  const handlePartnerExperiencePress = (experience) => {
    navigation.navigate('PartnerExperience', { partnerExperienceId: experience.id });
  };

  const handleCitySelect = (city) => {
    setSelectedCity(selectedCity?.id === city.id ? null : city);
    setShowAllChallenges(false);
    setShowAllNarrativePaths(false);
    setShowAllItineraries(false);
    setShowAllPartnerExperiences(false);
  };

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

        {/* Filtro tipologia stile MapScreen */}
        <View style={styles.filtersSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersContainer}
          >
            {CONTENT_TYPES.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={styles.filterButton}
                onPress={() => setExperienceFilter(type.id)}
              >
                <LinearGradient
                  colors={
                    experienceFilter === type.id
                      ? [type.color, type.color + '80']
                      : ['#F8F9FA', '#FFFFFF']
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.filterButtonGradient}
                >
                  <Text style={styles.filterIcon}>{type.icon}</Text>
                  <Text style={[
                    styles.filterText,
                    experienceFilter === type.id && styles.filterTextActive,
                  ]}>
                    {type.name}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* SEZIONE 1: PERCORSI NARRATIVI */}
        {(experienceFilter === 'all' || experienceFilter === 'narratives') && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                🎭 {selectedCity ? `Percorsi a ${selectedCity.name}` : 'Percorsi Narrativi'}
              </Text>
              <Text style={styles.contentCount}>
                {narrativePathsToShow.length} disponibili
              </Text>
            </View>

            {displayedNarrativePaths.length > 0 ? (
              <>
                {displayedNarrativePaths.map((path) => (
                  <NarrativePathCard
                    key={`narrative-${path.id}`}
                    narrativePath={path}
                    onPress={() => handleNarrativePathPress(path)}
                  />
                ))}
                
                {narrativePathsToShow.length > 3 && (
                  <TouchableOpacity
                    style={styles.showMoreButton}
                    onPress={() => setShowAllNarrativePaths(!showAllNarrativePaths)}
                  >
                    <LinearGradient
                      colors={['#FF6B6B', '#FF8E8E']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.showMoreGradient}
                    >
                      <Text style={styles.showMoreText}>
                        {showAllNarrativePaths ? 'Mostra meno' : `Mostra tutti (${narrativePathsToShow.length - 3} rimanenti)`}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  Nessun percorso narrativo disponibile per {selectedCity?.name}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* SEZIONE 2: ITINERARI CONSIGLIATI */}
        {(experienceFilter === 'all' || experienceFilter === 'itineraries') && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                🗺️ {selectedCity ? `Itinerari a ${selectedCity.name}` : 'Itinerari Consigliati'}
              </Text>
              <Text style={styles.contentCount}>
                {itinerariesToShow.length} disponibili
              </Text>
            </View>

            {displayedItineraries.length > 0 ? (
              <>
                {displayedItineraries.map((itinerary) => (
                  <ItineraryCard
                    key={`itinerary-${itinerary.id}`}
                    itinerary={itinerary}
                    onPress={() => handleItineraryPress(itinerary)}
                  />
                ))}
                
                {itinerariesToShow.length > 3 && (
                  <TouchableOpacity
                    style={styles.showMoreButton}
                    onPress={() => setShowAllItineraries(!showAllItineraries)}
                  >
                    <LinearGradient
                      colors={['#4ECDC4', '#7ED5D1']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.showMoreGradient}
                    >
                      <Text style={styles.showMoreText}>
                        {showAllItineraries ? 'Mostra meno' : `Mostra tutti (${itinerariesToShow.length - 3} rimanenti)`}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  Nessun itinerario disponibile per {selectedCity?.name}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* SEZIONE 3: FOOD & DRINK PARTNER */}
        {(experienceFilter === 'all' || experienceFilter === 'partners') && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                🤝 {selectedCity ? `Partners a ${selectedCity.name}` : 'Partners'}
              </Text>
              <Text style={styles.contentCount}>
                {partnerExperiencesToShow.length} disponibili
              </Text>
            </View>

            {displayedPartnerExperiences.length > 0 ? (
              <>
                {displayedPartnerExperiences.map((experience) => (
                  <PartnerExperienceCard
                    key={`partner-${experience.id}`}
                    partnerExperience={experience}
                    onPress={() => handlePartnerExperiencePress(experience)}
                  />
                ))}
                
                {partnerExperiencesToShow.length > 3 && (
                  <TouchableOpacity
                    style={styles.showMoreButton}
                    onPress={() => setShowAllPartnerExperiences(!showAllPartnerExperiences)}
                  >
                    <LinearGradient
                      colors={['#F06292', '#F48FB1']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.showMoreGradient}
                    >
                      <Text style={styles.showMoreText}>
                        {showAllPartnerExperiences ? 'Mostra meno' : `Mostra tutti (${partnerExperiencesToShow.length - 3} rimanenti)`}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  Nessuna esperienza partner disponibile per {selectedCity?.name}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* SEZIONE LEGACY: SFIDE CLASSICHE (mantenuta per compatibilità) */}
        {(experienceFilter === 'all' || experienceFilter === 'challenges') && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                🏆 {selectedCity ? `Sfide Classiche a ${selectedCity.name}` : 'Sfide Classiche'}
              </Text>
              <Text style={styles.contentCount}>
                {filteredChallenges.length} disponibili
              </Text>
            </View>

            {displayedChallenges.length > 0 ? (
              <>
                {displayedChallenges.map((challenge) => (
                  <ChallengeCard
                    key={`challenge-${challenge.id}`}
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
                      colors={['#45B7D1', '#6AC5E5']}
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
                  Nessuna sfida classica disponibile per {selectedCity?.name}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* STATISTICHE UTENTE AGGIORNATE */}
        <View style={styles.quickStats}>
          <Text style={styles.quickStatsTitle}>I tuoi progressi MVP 2.0</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {userProfile.stats.narrativePathsCompleted + 
                   userProfile.stats.itinerariesFollowed + 
                   userProfile.stats.partnersVisited + 
                   userProfile.stats.challengesCompleted}
                </Text>
                <Text style={styles.statLabel}>Esperienze Totali</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{userProfile.stats.narrativePathsCompleted}</Text>
                <Text style={styles.statLabel}>Percorsi</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{userProfile.stats.itinerariesFollowed}</Text>
                <Text style={styles.statLabel}>Itinerari</Text>
              </View>
            </View>
            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{userProfile.stats.partnersVisited}</Text>
                <Text style={styles.statLabel}>Partner</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{userProfile.stats.challengesCompleted}</Text>
                <Text style={styles.statLabel}>Sfide</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{userProfile.stats.badgesEarned}</Text>
                <Text style={styles.statLabel}>Badge</Text>
              </View>
            </View>
          </View>
        </View>

        {selectedCity && (
          <TouchableOpacity
            style={styles.clearFilterButton}
            onPress={() => setSelectedCity(null)}
          >
            <Text style={styles.clearFilterText}>
              Mostra tutti i contenuti
            </Text>
          </TouchableOpacity>
        )}
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
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
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
    fontFamily: theme.fonts.regular,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  pointsValue: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  section: {
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
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#2C3E50',
  },
  contentCount: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
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
    fontFamily: theme.fonts.semiBold,
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
  clearFilterButton: {
    marginHorizontal: 16,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#4ECDC4',
    borderRadius: 12,
    alignItems: 'center',
  },
  clearFilterText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: theme.fonts.semiBold,
  },
  quickStats: {
    marginHorizontal: 16,
    marginVertical: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quickStatsTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#2C3E50',
    marginBottom: 16,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'column',
    gap: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: '#4ECDC4',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: '#7F8C8D',
    marginTop: 4,
  },
  // Nuovi stili per il filtro tipologia
  filtersSection: {
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 4,
  },
  filtersContainer: {
    paddingHorizontal: 16,
  },
  filterButton: {
    marginRight: 12,
    borderRadius: 20,
    overflow: 'hidden',
  },
  filterButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  filterIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  filterText: {
    fontSize: 14,
    fontFamily: theme.fonts.semiBold,
    color: '#2C3E50',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
});

export default HomeScreen;
