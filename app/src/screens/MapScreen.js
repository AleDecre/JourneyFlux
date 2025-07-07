import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { getCitiesWithContent } from '../data/cities';
import { getUserProfile } from '../data/user';
import { getAllNarrativePaths } from '../data/narrativePaths';
import { getAllItineraries } from '../data/itineraries';
import { getAllPartnerExperiences } from '../data/partnerExperiences';
import { getAllChallenges } from '../data/challenges';
import { theme } from '../utils/theme';

const MapScreen = ({ navigation }) => {
  const [selectedContentType, setSelectedContentType] = useState('all');
  const userProfile = getUserProfile();
  
  // Content types for filtering
  const contentTypes = [
    { id: 'all', name: 'Tutti', icon: '🌟', color: '#667eea' },
    { id: 'narratives', name: 'Percorsi Narrativi', icon: '🎭', color: '#4ECDC4' },
    { id: 'itineraries', name: 'Itinerari', icon: '🗺️', color: '#FF6B6B' },
    { id: 'partners', name: 'Partner', icon: '🍷', color: '#45B7D1' },
    { id: 'challenges', name: 'Sfide', icon: '🏆', color: '#F06292' }
  ];

  // Get content counts for each city
  const getCityContentCount = (city) => {
    const narratives = getAllNarrativePaths().filter(n => n.city === city.name).length;
    const itineraries = getAllItineraries().filter(i => i.city === city.name).length;
    const partners = getAllPartnerExperiences().filter(p => p.city === city.name).length;
    const challenges = getAllChallenges().filter(c => c.location.includes(city.name)).length;
    
    return {
      narratives,
      itineraries,
      partners,
      challenges,
      total: narratives + itineraries + partners + challenges
    };
  };

  // Filter cities based on selected content type
  const getFilteredCities = () => {
    const cities = getCitiesWithContent();
    if (selectedContentType === 'all') {
      return cities.map(city => ({
        ...city,
        count: getCityContentCount(city).total
      }));
    }
    
    return cities.map(city => {
      const counts = getCityContentCount(city);
      let count = 0;
      
      switch (selectedContentType) {
        case 'narratives':
          count = counts.narratives;
          break;
        case 'itineraries':
          count = counts.itineraries;
          break;
        case 'partners':
          count = counts.partners;
          break;
        case 'challenges':
          count = counts.challenges;
          break;
      }
      
      return { ...city, count };
    }).filter(city => city.count > 0);
  };

  // Handle city press
  const handleCityPress = (city) => {
    const counts = getCityContentCount(city);
    
    if (counts.total > 0) {
      Alert.alert(
        `Contenuti disponibili a ${city.name}`,
        `🎭 ${counts.narratives} Percorsi Narrativi\n🗺️ ${counts.itineraries} Itinerari\n🍷 ${counts.partners} Partner Experiences\n🏆 ${counts.challenges} Sfide Classiche`,
        [
          { text: "Annulla", style: "cancel" },
          { text: "Esplora", onPress: () => navigation.navigate('HomeTab') }
        ]
      );
    } else {
      Alert.alert(
        `${city.name}`,
        "Al momento non ci sono contenuti disponibili in questa città, ma ne arriveranno presto!",
        [{ text: "OK", style: "default" }]
      );
    }
  };

  // Handle content type filter
  const handleContentTypePress = (contentType) => {
    setSelectedContentType(contentType.id);
  };

  // Get global stats
  const getGlobalStats = () => {
    const totalNarratives = getAllNarrativePaths().length;
    const totalItineraries = getAllItineraries().length;
    const totalPartners = getAllPartnerExperiences().length;
    const totalChallenges = getAllChallenges().length;
    
    return {
      totalNarratives,
      totalItineraries,
      totalPartners,
      totalChallenges,
      totalContent: totalNarratives + totalItineraries + totalPartners + totalChallenges
    };
  };

  const filteredCities = getFilteredCities();
  const globalStats = getGlobalStats();

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
            <Text style={styles.greeting}>Mappa JourneyFlux</Text>
            <Text style={styles.subtitle}>
              Esplora l'Italia attraverso {globalStats.totalContent} esperienze uniche
            </Text>
          </View>
          <View style={styles.headerInfoBox}>
            <Text style={styles.headerInfoLabel}>Città</Text>
            <Text style={styles.headerInfoValue}>{filteredCities.length}</Text>
          </View>
        </View>
      </LinearGradient>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Content Type Filters */}
        <View style={styles.filtersSection}>
          <Text style={styles.filtersTitle}>Filtra per tipologia:</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersContainer}
          >
            {contentTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.filterButton,
                  selectedContentType === type.id && styles.filterButtonActive
                ]}
                onPress={() => handleContentTypePress(type)}
              >
                <LinearGradient
                  colors={
                    selectedContentType === type.id
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
                    selectedContentType === type.id && styles.filterTextActive
                  ]}>
                    {type.name}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Legend */}
        <View style={styles.legendSection}>
          <Text style={styles.legendTitle}>Legenda Pin:</Text>
          <View style={styles.legendContainer}>
            <View style={styles.legendRow}>
              <View style={[styles.legendPin, { backgroundColor: '#4ECDC4' }]} />
              <Text style={styles.legendText}>Percorsi Narrativi</Text>
            </View>
            <View style={styles.legendRow}>
              <View style={[styles.legendPin, { backgroundColor: '#FF6B6B' }]} />
              <Text style={styles.legendText}>Itinerari Community</Text>
            </View>
            <View style={styles.legendRow}>
              <View style={[styles.legendPin, { backgroundColor: '#45B7D1' }]} />
              <Text style={styles.legendText}>Partner Experiences</Text>
            </View>
            <View style={styles.legendRow}>
              <View style={[styles.legendPin, { backgroundColor: '#F06292' }]} />
              <Text style={styles.legendText}>Sfide Classiche</Text>
            </View>
          </View>
        </View>

        {/* Cities Grid */}
        <View style={styles.citiesSection}>
          <Text style={styles.citiesTitle}>
            Città disponibili ({filteredCities.length})
          </Text>
          <View style={styles.citiesGrid}>
            {filteredCities.map((city) => {
              const totalCount = getCityContentCount(city);
              const filteredCount = city.count;
              
              return (
                <TouchableOpacity
                  key={city.id}
                  style={styles.cityCard}
                  onPress={() => handleCityPress(city)}
                >
                  <LinearGradient
                    colors={
                      city.featured
                        ? ['#4ECDC4', '#44A08D']
                        : ['#FFFFFF', '#F8F9FA']
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.cityCardGradient}
                  >
                    <Text style={styles.cityEmoji}>{city.image}</Text>
                    <Text style={styles.cityName}>{city.name}</Text>
                    <View style={styles.cityStats}>
                      <Text style={styles.cityStatsText}>
                        {selectedContentType === 'all' 
                          ? `${totalCount.total} contenuti` 
                          : `${filteredCount} ${contentTypes.find(t => t.id === selectedContentType)?.name?.toLowerCase()}`
                        }
                      </Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Global Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>Statistiche Globali MVP 2.0</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>🎭</Text>
              <Text style={styles.statValue}>{globalStats.totalNarratives}</Text>
              <Text style={styles.statLabel}>Percorsi Narrativi</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>🗺️</Text>
              <Text style={styles.statValue}>{globalStats.totalItineraries}</Text>
              <Text style={styles.statLabel}>Itinerari</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>🍷</Text>
              <Text style={styles.statValue}>{globalStats.totalPartners}</Text>
              <Text style={styles.statLabel}>Partner</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>🏆</Text>
              <Text style={styles.statValue}>{globalStats.totalChallenges}</Text>
              <Text style={styles.statLabel}>Sfide</Text>
            </View>
          </View>
        </View>

        {/* Coming Soon */}
        <View style={styles.comingSoonSection}>
          <Text style={styles.comingSoonTitle}>🚀 Prossimamente</Text>
          <Text style={styles.comingSoonText}>
            • Mappa interattiva GPS{'\n'}
            • Realtà Aumentata per scoperte{'\n'}
            • Chat community per ogni città{'\n'}
            • Itinerari personalizzati AI{'\n'}
            • Prenotazioni partner integrate
          </Text>
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
  filtersSection: {
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  filtersTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.semiBold,
    color: '#2C3E50',
    marginBottom: 12,
    marginHorizontal: 16,
  },
  filtersContainer: {
    paddingHorizontal: 16,
  },
  filterButton: {
    marginRight: 12,
    borderRadius: 20,
    overflow: 'hidden',
  },
  filterButtonActive: {
    // Active state handled by gradient
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
  legendSection: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    marginTop: 8,
  },
  legendTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.semiBold,
    color: '#2C3E50',
    marginBottom: 12,
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  legendPin: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: '#7F8C8D',
  },
  citiesSection: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    marginTop: 8,
  },
  citiesTitle: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    color: '#2C3E50',
    marginBottom: 16,
  },
  citiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  cityCard: {
    width: '48%',
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cityCardGradient: {
    padding: 16,
    alignItems: 'center',
    minHeight: 120,
  },
  cityEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  cityName: {
    fontSize: 16,
    fontFamily: theme.fonts.semiBold,
    color: '#2C3E50',
    marginBottom: 8,
    textAlign: 'center',
  },
  cityStats: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  cityStatsText: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: '#2C3E50',
    textAlign: 'center',
  },
  statsSection: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    marginTop: 8,
  },
  statsTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#2C3E50',
    marginBottom: 16,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    color: '#2C3E50',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: '#7F8C8D',
    textAlign: 'center',
    marginTop: 4,
  },
  comingSoonSection: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    marginTop: 8,
    marginBottom: 24,
  },
  comingSoonTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#2C3E50',
    marginBottom: 12,
    textAlign: 'center',
  },
  comingSoonText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#7F8C8D',
    lineHeight: 20,
  },
});

export default MapScreen;
