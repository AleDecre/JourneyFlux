import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

// Data imports - MVP 2.0
import { challenges } from '../data/challenges';
import { cities } from '../data/cities';
import { getAllNarrativePaths, getNarrativePathsByCity } from '../data/narrativePaths';
import { getAllItineraries, getItinerariesByCity } from '../data/itineraries';
import { getAllPartnerExperiences, getPartnerExperiencesByCity } from '../data/partnerExperiences';
import { CONTENT_TYPES } from '../data/contentTypes';
import { theme } from '../utils/theme';

const MapScreen = ({ navigation }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedContentType, setSelectedContentType] = useState('all');

  // Get all content data
  const allNarrativePaths = getAllNarrativePaths();
  const allItineraries = getAllItineraries();
  const allPartnerExperiences = getAllPartnerExperiences();

  // Content type filters
  const contentTypes = [
    { id: 'all', name: 'Tutto', icon: 'apps-outline', color: '#667eea' },
    { id: 'narrative', name: 'Narrativi', icon: 'book-outline', color: '#FF6B6B' },
    { id: 'itinerary', name: 'Itinerari', icon: 'map-outline', color: '#4ECDC4' },
    { id: 'partner', name: 'Partner', icon: 'restaurant-outline', color: '#F06292' },
    { id: 'challenge', name: 'Sfide', icon: 'trophy-outline', color: '#45B7D1' }
  ];

  // Get content count for city
  const getCityContentCount = (city) => {
    const narratives = getNarrativePathsByCity(city.name).length;
    const itineraries = getItinerariesByCity(city.name).length;
    const partners = getPartnerExperiencesByCity(city.name).length;
    const cityNativeChallenges = challenges.filter(challenge => 
      challenge.location.toLowerCase().includes(city.name.toLowerCase())
    ).length;

    return {
      narratives,
      itineraries,
      partners,
      challenges: cityNativeChallenges,
      total: narratives + itineraries + partners + cityNativeChallenges
    };
  };

  // Get filtered content for city
  const getFilteredContent = (city) => {
    const counts = getCityContentCount(city);
    
    if (selectedContentType === 'all') {
      return counts.total;
    } else if (selectedContentType === 'narrative') {
      return counts.narratives;
    } else if (selectedContentType === 'itinerary') {
      return counts.itineraries;
    } else if (selectedContentType === 'partner') {
      return counts.partners;
    } else if (selectedContentType === 'challenge') {
      return counts.challenges;
    }
    return 0;
  };

  const handleCityPress = (city) => {
    setSelectedCity(city);
    const counts = getCityContentCount(city);
    
    if (counts.total > 0) {
      Alert.alert(
        `Contenuti disponibili a ${city.name}`,
        `🎭 ${counts.narratives} Percorsi Narrativi\n🗺️ ${counts.itineraries} Itinerari\n🍷 ${counts.partners} Partner Experiences\n🏆 ${counts.challenges} Sfide Classiche`,
        [
          { text: "Annulla", style: "cancel" },
          { text: "Esplora", onPress: () => navigation.navigate('Home') }
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

  const handleContentTypePress = (contentType) => {
    setSelectedContentType(contentType.id);
  };

  const getCityColor = (city) => {
    const counts = getCityContentCount(city);
    
    // Color based on content richness
    if (counts.total >= 8) {
      return ['#FFD700', '#FFA500']; // Gold for rich content
    } else if (counts.total >= 5) {
      return ['#FF6B6B', '#FF8E8E']; // Red for good content
    } else if (counts.total >= 3) {
      return ['#4ECDC4', '#7ED5D1']; // Teal for moderate content
    } else if (counts.total >= 1) {
      return ['#45B7D1', '#6AC5E5']; // Blue for some content
    } else {
      return ['#95A5A6', '#B2BFC6']; // Gray for no content
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Mappa Italia MVP 2.0</Text>
        <Text style={styles.headerSubtitle}>Scopri percorsi, itinerari e partner experiences</Text>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Content Type Filters */}
        <View style={styles.filtersSection}>
          <Text style={styles.sectionTitle}>Filtra per Tipo</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
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
                  colors={selectedContentType === type.id ? [type.color, type.color] : ['#F8F9FA', '#E9ECEF']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.filterGradient}
                >
                  <Ionicons 
                    name={type.icon} 
                    size={20} 
                    color={selectedContentType === type.id ? '#FFFFFF' : '#6B7280'} 
                  />
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

        {/* Map Placeholder */}
        <View style={styles.mapContainer}>
          <LinearGradient
            colors={['#E8F5E8', '#F0F8F0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.mapPlaceholder}
          >
            <Text style={styles.mapEmoji}>🗺️</Text>
            <Text style={styles.mapText}>Mappa Interattiva</Text>
            <Text style={styles.mapSubtext}>
              Pin colorati per ogni tipo di contenuto
            </Text>
            <View style={styles.legendContainer}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#FF6B6B' }]} />
                <Text style={styles.legendText}>Narrativi</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#4ECDC4' }]} />
                <Text style={styles.legendText}>Itinerari</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#F06292' }]} />
                <Text style={styles.legendText}>Partner</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#45B7D1' }]} />
                <Text style={styles.legendText}>Sfide</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Cities Grid */}
        <View style={styles.citiesSection}>
          <Text style={styles.sectionTitle}>
            Città Disponibili
            {selectedContentType !== 'all' && (
              <Text style={styles.filterIndicator}>
                {' '}(filtrato: {contentTypes.find(t => t.id === selectedContentType)?.name})
              </Text>
            )}
          </Text>
          <View style={styles.citiesGrid}>
            {cities.map((city) => {
              const filteredCount = getFilteredContent(city);
              const totalCount = getCityContentCount(city);
              
              return (
                <TouchableOpacity
                  key={city.id}
                  style={styles.cityCard}
                  onPress={() => handleCityPress(city)}
                >
                  <LinearGradient
                    colors={getCityColor(city)}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.cityGradient}
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
                    
                    {/* Content type indicators */}
                    {selectedContentType === 'all' && (
                      <View style={styles.contentIndicators}>
                        {totalCount.narratives > 0 && (
                          <View style={[styles.indicator, { backgroundColor: '#FF6B6B' }]}>
                            <Text style={styles.indicatorText}>{totalCount.narratives}</Text>
                          </View>
                        )}
                        {totalCount.itineraries > 0 && (
                          <View style={[styles.indicator, { backgroundColor: '#4ECDC4' }]}>
                            <Text style={styles.indicatorText}>{totalCount.itineraries}</Text>
                          </View>
                        )}
                        {totalCount.partners > 0 && (
                          <View style={[styles.indicator, { backgroundColor: '#F06292' }]}>
                            <Text style={styles.indicatorText}>{totalCount.partners}</Text>
                          </View>
                        )}
                        {totalCount.challenges > 0 && (
                          <View style={[styles.indicator, { backgroundColor: '#45B7D1' }]}>
                            <Text style={styles.indicatorText}>{totalCount.challenges}</Text>
                          </View>
                        )}
                      </View>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Statistiche Globali MVP 2.0 */}
        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>Statistiche Globali MVP 2.0</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{allNarrativePaths.length}</Text>
              <Text style={styles.statLabel}>Percorsi Narrativi</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{allItineraries.length}</Text>
              <Text style={styles.statLabel}>Itinerari</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{allPartnerExperiences.length}</Text>
              <Text style={styles.statLabel}>Partner Experiences</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{challenges.length}</Text>
              <Text style={styles.statLabel}>Sfide Classiche</Text>
            </View>
          </View>
        </View>

        {/* Coming Soon */}
        <View style={styles.comingSoonSection}>
          <LinearGradient
            colors={['#FFB74D', '#FF9800']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.comingSoonContainer}
          >
            <Text style={styles.comingSoonEmoji}>🚀</Text>
            <Text style={styles.comingSoonTitle}>Prossimamente</Text>
            <Text style={styles.comingSoonText}>
              Mappa interattiva con geolocalizzazione in tempo reale, 
              realtà aumentata e molte altre città italiane!
            </Text>
          </LinearGradient>
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
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  
  // Filters Section
  filtersSection: {
    marginVertical: 16,
  },
  filtersContainer: {
    paddingHorizontal: 16,
  },
  filterButton: {
    marginRight: 12,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
      },
    }),
  },
  filterButtonActive: {
    ...Platform.select({
      ios: {
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      },
    }),
  },
  filterGradient: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  filterText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: '#6B7280',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  
  // Map Section
  mapContainer: {
    marginHorizontal: 16,
    marginVertical: 20,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      },
    }),
  },
  mapPlaceholder: {
    borderRadius: 16,
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  mapText: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    color: '#2C3E50',
    marginBottom: 6,
  },
  mapSubtext: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 16,
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: '#6B7280',
  },
  
  // Cities Section
  citiesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    color: '#2C3E50',
    marginBottom: 16,
    marginHorizontal: 16,
  },
  filterIndicator: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#7F8C8D',
  },
  citiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },
  cityCard: {
    width: '48%',
    marginHorizontal: '1%',
    marginVertical: 8,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      },
    }),
  },
  cityGradient: {
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 160,
  },
  cityEmoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  cityName: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  cityStats: {
    marginBottom: 8,
  },
  cityStatsText: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  contentIndicators: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 4,
  },
  indicator: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    minWidth: 20,
    alignItems: 'center',
  },
  indicatorText: {
    fontSize: 10,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
  },
  
  // Stats Section
  statsSection: {
    marginHorizontal: 16,
    marginVertical: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      },
    }),
  },
  statsTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  statItem: {
    alignItems: 'center',
    minWidth: '22%',
    marginVertical: 8,
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
    textAlign: 'center',
  },
  
  // Coming Soon Section
  comingSoonSection: {
    marginHorizontal: 16,
    marginVertical: 20,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      },
    }),
  },
  comingSoonContainer: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  comingSoonEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  comingSoonTitle: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  comingSoonText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default MapScreen;

const MapScreen = ({ navigation }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedContentType, setSelectedContentType] = useState('all');

  // Get all content data
  const allNarrativePaths = getAllNarrativePaths();
  const allItineraries = getAllItineraries();
  const allPartnerExperiences = getAllPartnerExperiences();

  // Content type filters
  const contentTypes = [
    { id: 'all', name: 'Tutto', icon: 'apps-outline', color: '#667eea' },
    { id: 'narrative', name: 'Narrativi', icon: 'book-outline', color: '#FF6B6B' },
    { id: 'itinerary', name: 'Itinerari', icon: 'map-outline', color: '#4ECDC4' },
    { id: 'partner', name: 'Partner', icon: 'restaurant-outline', color: '#F06292' },
    { id: 'challenge', name: 'Sfide', icon: 'trophy-outline', color: '#45B7D1' }
  ];

  // Get content count for city
  const getCityContentCount = (city) => {
    const narratives = getNarrativePathsByCity(city.name).length;
    const itineraries = getItinerariesByCity(city.name).length;
    const partners = getPartnerExperiencesByCity(city.name).length;
    const cityNativeChallenges = challenges.filter(challenge => 
      challenge.location.toLowerCase().includes(city.name.toLowerCase())
    ).length;

    return {
      narratives,
      itineraries,
      partners,
      challenges: cityNativeChallenges,
      total: narratives + itineraries + partners + cityNativeChallenges
    };
  };

  // Get filtered content for city
  const getFilteredContent = (city) => {
    const counts = getCityContentCount(city);
    
    if (selectedContentType === 'all') {
      return counts.total;
    } else if (selectedContentType === 'narrative') {
      return counts.narratives;
    } else if (selectedContentType === 'itinerary') {
      return counts.itineraries;
    } else if (selectedContentType === 'partner') {
      return counts.partners;
    } else if (selectedContentType === 'challenge') {
      return counts.challenges;
    }
    return 0;
  };

  const handleCityPress = (city) => {
    setSelectedCity(city);
    const counts = getCityContentCount(city);
    
    if (counts.total > 0) {
      Alert.alert(
        `Contenuti disponibili a ${city.name}`,
        `🎭 ${counts.narratives} Percorsi Narrativi\n🗺️ ${counts.itineraries} Itinerari\n🍷 ${counts.partners} Partner Experiences\n🏆 ${counts.challenges} Sfide Classiche`,
        [
          { text: "Annulla", style: "cancel" },
          { text: "Esplora", onPress: () => navigation.navigate('Home') }
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

  const handleContentTypePress = (contentType) => {
    setSelectedContentType(contentType.id);
  };

  const getCityColor = (city) => {
    const counts = getCityContentCount(city);
    
    // Color based on content richness
    if (counts.total >= 8) {
      return ['#FFD700', '#FFA500']; // Gold for rich content
    } else if (counts.total >= 5) {
      return ['#FF6B6B', '#FF8E8E']; // Red for good content
    } else if (counts.total >= 3) {
      return ['#4ECDC4', '#7ED5D1']; // Teal for moderate content
    } else if (counts.total >= 1) {
      return ['#45B7D1', '#6AC5E5']; // Blue for some content
    } else {
      return ['#95A5A6', '#B2BFC6']; // Gray for no content
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Mappa Italia MVP 2.0</Text>
        <Text style={styles.headerSubtitle}>Scopri percorsi, itinerari e partner experiences</Text>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Content Type Filters */}
        <View style={styles.filtersSection}>
          <Text style={styles.sectionTitle}>Filtra per Tipo</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
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
                  colors={selectedContentType === type.id ? [type.color, type.color] : ['#F8F9FA', '#E9ECEF']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.filterGradient}
                >
                  <Ionicons 
                    name={type.icon} 
                    size={20} 
                    color={selectedContentType === type.id ? '#FFFFFF' : '#6B7280'} 
                  />
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

        {/* Map Placeholder */}
        <View style={styles.mapContainer}>
          <LinearGradient
            colors={['#E8F5E8', '#F0F8F0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.mapPlaceholder}
          >
            <Text style={styles.mapEmoji}>🗺️</Text>
            <Text style={styles.mapText}>Mappa Interattiva</Text>
            <Text style={styles.mapSubtext}>
              Pin colorati per ogni tipo di contenuto
            </Text>
            <View style={styles.legendContainer}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#FF6B6B' }]} />
                <Text style={styles.legendText}>Narrativi</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#4ECDC4' }]} />
                <Text style={styles.legendText}>Itinerari</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#F06292' }]} />
                <Text style={styles.legendText}>Partner</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#45B7D1' }]} />
                <Text style={styles.legendText}>Sfide</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Cities Grid */}
        <View style={styles.citiesSection}>
          <Text style={styles.sectionTitle}>
            Città Disponibili
            {selectedContentType !== 'all' && (
              <Text style={styles.filterIndicator}>
                {' '}(filtrato: {contentTypes.find(t => t.id === selectedContentType)?.name})
              </Text>
            )}
          </Text>
          <View style={styles.citiesGrid}>
            {cities.map((city) => {
              const filteredCount = getFilteredContent(city);
              const totalCount = getCityContentCount(city);
              
              return (
                <TouchableOpacity
                  key={city.id}
                  style={styles.cityCard}
                  onPress={() => handleCityPress(city)}
                >
                  <LinearGradient
                    colors={getCityColor(city)}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.cityGradient}
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
                    
                    {/* Content type indicators */}
                    {selectedContentType === 'all' && (
                      <View style={styles.contentIndicators}>
                        {totalCount.narratives > 0 && (
                          <View style={[styles.indicator, { backgroundColor: '#FF6B6B' }]}>
                            <Text style={styles.indicatorText}>{totalCount.narratives}</Text>
                          </View>
                        )}
                        {totalCount.itineraries > 0 && (
                          <View style={[styles.indicator, { backgroundColor: '#4ECDC4' }]}>
                            <Text style={styles.indicatorText}>{totalCount.itineraries}</Text>
                          </View>
                        )}
                        {totalCount.partners > 0 && (
                          <View style={[styles.indicator, { backgroundColor: '#F06292' }]}>
                            <Text style={styles.indicatorText}>{totalCount.partners}</Text>
                          </View>
                        )}
                        {totalCount.challenges > 0 && (
                          <View style={[styles.indicator, { backgroundColor: '#45B7D1' }]}>
                            <Text style={styles.indicatorText}>{totalCount.challenges}</Text>
                          </View>
                        )}
                      </View>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
                  <Text style={styles.cityRegion}>{city.region}</Text>
                  <View style={styles.challengesInfo}>
                    <Text style={styles.challengesCount}>
                      {city.challengesCount} sfide
                    </Text>
                    {city.featured && (
                      <View style={styles.featuredBadge}>
                        <Text style={styles.featuredText}>⭐</Text>
                      </View>
                    )}
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Statistiche Globali MVP 2.0 */}
        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>Statistiche Globali MVP 2.0</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{allNarrativePaths.length}</Text>
              <Text style={styles.statLabel}>Percorsi Narrativi</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{allItineraries.length}</Text>
              <Text style={styles.statLabel}>Itinerari</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{allPartnerExperiences.length}</Text>
              <Text style={styles.statLabel}>Partner Experiences</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{challenges.length}</Text>
              <Text style={styles.statLabel}>Sfide Classiche</Text>
            </View>
          </View>
        </View>

        {/* Coming Soon */}
        <View style={styles.comingSoonSection}>
          <LinearGradient
            colors={['#FFB74D', '#FF9800']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.comingSoonContainer}
          >
            <Text style={styles.comingSoonEmoji}>🚀</Text>
            <Text style={styles.comingSoonTitle}>Prossimamente</Text>
            <Text style={styles.comingSoonText}>
              Mappa interattiva con geolocalizzazione in tempo reale, 
              realtà aumentata e molte altre città italiane!
            </Text>
          </LinearGradient>
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
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  
  // Filters Section
  filtersSection: {
    marginVertical: 16,
  },
  filtersContainer: {
    paddingHorizontal: 16,
  },
  filterButton: {
    marginRight: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  filterButtonActive: {
    elevation: 4,
    shadowOpacity: 0.2,
  },
  filterGradient: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  filterText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: '#6B7280',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  
  // Map Section
  mapContainer: {
    marginHorizontal: 16,
    marginVertical: 20,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mapPlaceholder: {
    borderRadius: 16,
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  mapText: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    color: '#2C3E50',
    marginBottom: 6,
  },
  mapSubtext: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 16,
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: '#6B7280',
  },
  
  // Cities Section
  citiesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    color: '#2C3E50',
    marginBottom: 16,
    marginHorizontal: 16,
  },
  filterIndicator: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#7F8C8D',
  },
  citiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },
  cityCard: {
    width: '48%',
    marginHorizontal: '1%',
    marginVertical: 8,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cityGradient: {
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 160,
  },
  cityEmoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  cityName: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  cityStats: {
    marginBottom: 8,
  },
  cityStatsText: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  contentIndicators: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 4,
  },
  indicator: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    minWidth: 20,
    alignItems: 'center',
  },
  indicatorText: {
    fontSize: 10,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
  },
  
  // Stats Section
  statsSection: {
    marginHorizontal: 16,
    marginVertical: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statsTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  statItem: {
    alignItems: 'center',
    minWidth: '22%',
    marginVertical: 8,
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
    textAlign: 'center',
  },
  
  // Coming Soon Section
  comingSoonSection: {
    marginHorizontal: 16,
    marginVertical: 20,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  comingSoonContainer: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  comingSoonEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  comingSoonTitle: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  comingSoonText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 20,
  },
});
  citiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },
  cityCard: {
    width: '48%',
    marginHorizontal: '1%',
    marginVertical: 8,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cityGradient: {
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 140,
  },
  cityEmoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  cityName: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  cityRegion: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 8,
  },
  challengesInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  challengesCount: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    fontFamily: theme.fonts.semiBold,
  },
  featuredBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredText: {
    fontSize: 12,
  },
  legendSection: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  legendTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#2C3E50',
    marginBottom: 16,
  },
  legendContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  legendText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#2C3E50',
  },
  statsSection: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  statsTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#2C3E50',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statItem: {
    alignItems: 'center',
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
  comingSoonSection: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  comingSoonContainer: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  comingSoonEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  comingSoonTitle: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  comingSoonText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default MapScreen;
