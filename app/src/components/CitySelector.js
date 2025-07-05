import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const CitySelector = ({ cities, selectedCity, onCitySelect }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scegli la tua destinazione</Text>
      <View style={styles.citiesContainer}>
        {cities.map((city) => (
          <TouchableOpacity
            key={city.id}
            style={styles.cityItem}
            onPress={() => onCitySelect(city)}
          >
            <LinearGradient
              colors={selectedCity?.id === city.id ? ['#4ECDC4', '#44A08D'] : ['#F8F9FA', '#E9ECEF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cityGradient}
            >
              <Text style={styles.cityEmoji}>{city.image}</Text>
              <Text style={[
                styles.cityName,
                selectedCity?.id === city.id && styles.selectedCityName
              ]}>
                {city.name}
              </Text>
              <Text style={[
                styles.challengeCount,
                selectedCity?.id === city.id && styles.selectedChallengeCount
              ]}>
                {city.challengesCount} sfide
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 16,
    marginHorizontal: 16,
  },
  citiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },
  cityItem: {
    width: '48%',
    marginHorizontal: '1%',
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cityGradient: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  cityEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  cityName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    textAlign: 'center',
  },
  selectedCityName: {
    color: '#FFFFFF',
  },
  challengeCount: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
    marginTop: 4,
  },
  selectedChallengeCount: {
    color: 'rgba(255, 255, 255, 0.9)',
  },
});

export default CitySelector;
