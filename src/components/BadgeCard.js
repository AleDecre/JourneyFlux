import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const BadgeCard = ({ badge, size = 'medium' }) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return { container: 60, icon: 24, title: 10 };
      case 'large':
        return { container: 100, icon: 40, title: 14 };
      default:
        return { container: 80, icon: 32, title: 12 };
    }
  };

  const sizes = getSize();

  return (
    <View style={[styles.container, { width: sizes.container, height: sizes.container }]}>
      <LinearGradient
        colors={badge.earned ? [badge.color, badge.color + '80'] : ['#E0E0E0', '#BDBDBD']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Text style={[styles.icon, { fontSize: sizes.icon }]}>
          {badge.earned ? badge.icon : '🔒'}
        </Text>
      </LinearGradient>
      
      <Text 
        style={[
          styles.title, 
          { fontSize: sizes.title },
          !badge.earned && styles.disabledTitle
        ]} 
        numberOfLines={2}
      >
        {badge.name}
      </Text>
      
      {badge.earned && badge.earnedDate && (
        <Text style={styles.date}>
          {new Date(badge.earnedDate).toLocaleDateString('it-IT')}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 8,
  },
  gradient: {
    borderRadius: 50,
    width: '100%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: '600',
    color: '#2C3E50',
    marginTop: 4,
    paddingHorizontal: 4,
  },
  disabledTitle: {
    color: '#95A5A6',
  },
  date: {
    fontSize: 10,
    color: '#7F8C8D',
    marginTop: 2,
  },
});

export default BadgeCard;
