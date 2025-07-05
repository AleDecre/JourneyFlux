import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { challenges } from '../data/challenges';
import { cities } from '../data/cities';

const MapScreen = ({ navigation }) => {
  const [selectedCity, setSelectedCity] = useState(null);

  const handleCityPress = (city) => {
    setSelectedCity(city);
    const cityChallenges = challenges.filter(challenge => 
      challenge.location.toLowerCase().includes(city.name.toLowerCase())
    );
    
    if (cityChallenges.length > 0) {
      Alert.alert(
        `Sfide a ${city.name}`,
        `Trovate ${cityChallenges.length} sfide in questa città. Vuoi esplorarle?`,
        [
          { text: "Annulla", style: "cancel" },
          { text: "Esplora", onPress: () => navigation.navigate('Home') }
        ]
      );
    } else {
      Alert.alert(
        `${city.name}`,
        "Al momento non ci sono sfide disponibili in questa città, ma ne arriveranno presto!",
        [{ text: "OK", style: "default" }]
      );
    }
  };

  const getCityColor = (city) => {
    const cityColors = {
      'Milano': ['#FF6B6B', '#FF8E8E'],
      'Roma': ['#4ECDC4', '#7ED5D1'],
      'Napoli': ['#FFB74D', '#FFCC80'],
      'Firenze': ['#F06292', '#F48FB1'],
      'Toscana': ['#45B7D1', '#6AC5E5'],
    };
    return cityColors[city.name] || ['#95A5A6', '#B2BFC6'];
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Mappa Italia</Text>
        <Text style={styles.headerSubtitle}>Scopri le sfide nelle tue città preferite</Text>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
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
              Tocca le città per scoprire le sfide disponibili
            </Text>
          </LinearGradient>
        </View>

        {/* Cities Grid */}
        <View style={styles.citiesSection}>
          <Text style={styles.sectionTitle}>Città Disponibili</Text>
          <View style={styles.citiesGrid}>
            {cities.map((city) => (
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

        {/* Map Legend */}
        <View style={styles.legendSection}>
          <Text style={styles.legendTitle}>Legenda</Text>
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#4ECDC4' }]} />
              <Text style={styles.legendText}>Sfide Culturali</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#FF6B6B' }]} />
              <Text style={styles.legendText}>Sfide Gastronomiche</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#45B7D1' }]} />
              <Text style={styles.legendText}>Sfide Naturalistiche</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#F06292' }]} />
              <Text style={styles.legendText}>Sfide Artistiche</Text>
            </View>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>Statistiche Globali</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{challenges.length}</Text>
              <Text style={styles.statLabel}>Sfide Totali</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{cities.length}</Text>
              <Text style={styles.statLabel}>Città Coperte</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{cities.filter(c => c.featured).length}</Text>
              <Text style={styles.statLabel}>Città in Evidenza</Text>
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
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
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
    paddingVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  mapText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  mapSubtext: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  citiesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 16,
    marginHorizontal: 16,
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
    minHeight: 140,
  },
  cityEmoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  cityName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  cityRegion: {
    fontSize: 12,
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
    fontWeight: '600',
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
    fontWeight: 'bold',
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
    color: '#2C3E50',
  },
  statsSection: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
    fontWeight: 'bold',
    color: '#4ECDC4',
  },
  statLabel: {
    fontSize: 12,
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
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  comingSoonText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default MapScreen;
