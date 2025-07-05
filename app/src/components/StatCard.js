import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../utils/theme';

const StatCard = ({ title, value, subtitle, icon, colors = ['#4ECDC4', '#44A08D'] }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.icon}>{icon}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
        
        <Text style={styles.value}>{value}</Text>
        
        {subtitle && (
          <Text style={styles.subtitle}>{subtitle}</Text>
        )}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 4,
    marginVertical: 8,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  gradient: {
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 24,
    marginBottom: 4,
  },
  title: {
    fontSize: 12,
    fontFamily: theme.fonts.semiBold,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  value: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 10,
    fontFamily: theme.fonts.regular,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 4,
  },
});

export default StatCard;
