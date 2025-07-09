import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Markdown from 'react-native-markdown-display';
import { theme } from '../utils/theme';

const { width } = Dimensions.get('window');

const ItineraryViewer = ({ itinerary, onStartJourney }) => {
  const [expandedDay, setExpandedDay] = useState(null);

  if (!itinerary) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nessun itinerario disponibile</Text>
      </View>
    );
  }

  const toggleDayExpanded = (dayIndex) => {
    setExpandedDay(expandedDay === dayIndex ? null : dayIndex);
  };

  const renderActivity = (activity, index) => {
    const getCategoryColor = (category) => {
      const colors = {
        cultura: ['#667eea', '#764ba2'],
        gastronomia: ['#f093fb', '#f5576c'],
        arte: ['#4facfe', '#00f2fe'],
        natura: ['#43e97b', '#38f9d7'],
        shopping: ['#fa709a', '#fee140'],
        vita_notturna: ['#a8edea', '#fed6e3'],
        logistica: ['#91a7ff', '#73a5ff'],
        default: ['#667eea', '#764ba2']
      };
      return colors[category] || colors.default;
    };

    const categoryColors = getCategoryColor(activity.categoria);

    return (
      <View key={index} style={styles.activityContainer}>
        <View style={styles.activityHeader}>
          <View style={styles.timeContainer}>
            <Text style={styles.activityTime}>{activity.orario}</Text>
            <Text style={styles.activityDuration}>{activity.durata}</Text>
          </View>
          <LinearGradient
            colors={categoryColors}
            style={styles.activityIcon}
          >
            <Text style={styles.activityEmoji}>{activity.icon}</Text>
          </LinearGradient>
        </View>
        
        <View style={styles.activityContent}>
          <Text style={styles.activityTitle}>{activity.nome}</Text>
          <Text style={styles.activityDescription}>{activity.descrizione}</Text>
          
          <View style={styles.activityDetails}>
            <View style={styles.activityDetail}>
              <Text style={styles.detailLabel}>💰 Costo:</Text>
              <Text style={styles.detailValue}>{activity.costo}</Text>
            </View>
            {activity.location && (
              <View style={styles.activityDetail}>
                <Text style={styles.detailLabel}>📍 Dove:</Text>
                <Text style={styles.detailValue}>{activity.location}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

  const renderDay = (day, index) => {
    const isExpanded = expandedDay === index;
    const dayGradient = index % 2 === 0 
      ? ['#667eea', '#764ba2'] 
      : ['#f093fb', '#f5576c'];

    return (
      <View key={index} style={styles.dayContainer}>
        <TouchableOpacity
          style={styles.dayHeader}
          onPress={() => toggleDayExpanded(index)}
        >
          <LinearGradient
            colors={dayGradient}
            style={styles.dayHeaderGradient}
          >
            <View style={styles.dayHeaderContent}>
              <View style={styles.dayHeaderLeft}>
                <Text style={styles.dayNumber}>Giorno {day.giorno}</Text>
                <Text style={styles.dayTheme}>{day.tema}</Text>
              </View>
              <View style={styles.dayHeaderRight}>
                <Text style={styles.activityCount}>
                  {day.attivita.length} attività
                </Text>
                <Text style={styles.expandIcon}>
                  {isExpanded ? '▼' : '▶'}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.dayContent}>
            {day.attivita.map(renderActivity)}
          </View>
        )}
      </View>
    );
  };

  const renderHighlights = () => {
    if (!itinerary.highlights || itinerary.highlights.length === 0) return null;

    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>✨ Highlights</Text>
        <View style={styles.highlightsList}>
          {itinerary.highlights.map((highlight, index) => (
            <View key={index} style={styles.highlightItem}>
              <Text style={styles.highlightBullet}>•</Text>
              <Text style={styles.highlightText}>{highlight}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderBadges = () => {
    if (!itinerary.badge_ottenibili || itinerary.badge_ottenibili.length === 0) return null;

    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>🏆 Badge Ottenibili</Text>
        <View style={styles.badgesContainer}>
          {itinerary.badge_ottenibili.map((badge, index) => (
            <LinearGradient
              key={index}
              colors={['#ffd89b', '#19547b']}
              style={styles.badgeItem}
            >
              <Text style={styles.badgeText}>{badge}</Text>
            </LinearGradient>
          ))}
        </View>
      </View>
    );
  };

  const renderTips = () => {
    if (!itinerary.consigli || itinerary.consigli.length === 0) return null;

    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>💡 Consigli Utili</Text>
        <View style={styles.tipsList}>
          {itinerary.consigli.map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <LinearGradient
                colors={['#84fab0', '#8fd3f4']}
                style={styles.tipBullet}
              >
                <Text style={styles.tipBulletText}>!</Text>
              </LinearGradient>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <Text style={styles.title}>{itinerary.titolo}</Text>
        <Text style={styles.subtitle}>{itinerary.sottotitolo}</Text>
        <View style={styles.headerStats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{itinerary.durata_giorni}</Text>
            <Text style={styles.statLabel}>Giorni</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{itinerary.giorni?.length || 0}</Text>
            <Text style={styles.statLabel}>Tappe</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{itinerary.budget_totale}</Text>
            <Text style={styles.statLabel}>Budget</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Highlights */}
      {renderHighlights()}

      {/* Days */}
      <View style={styles.daysContainer}>
        <Text style={styles.sectionTitle}>📅 Programma Dettagliato</Text>
        {itinerary.giorni.map(renderDay)}
      </View>

      {/* Badges */}
      {renderBadges()}

      {/* Tips */}
      {renderTips()}

      {/* Start Journey Button */}
      <TouchableOpacity
        style={styles.startButton}
        onPress={onStartJourney}
      >
        <LinearGradient
          colors={['#11998e', '#38ef7d']}
          style={styles.startButtonGradient}
        >
          <Text style={styles.startButtonText}>🚀 Inizia il Viaggio</Text>
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.textLight,
    textAlign: 'center',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.white,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.white,
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: 20,
  },
  headerStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.white,
    opacity: 0.8,
    marginTop: 4,
  },
  sectionContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 15,
  },
  highlightsList: {
    backgroundColor: theme.colors.white,
    borderRadius: 15,
    padding: 15,
    ...theme.elevation.medium,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  highlightBullet: {
    fontSize: 16,
    color: theme.colors.primary,
    marginRight: 8,
    marginTop: 2,
  },
  highlightText: {
    fontSize: 15,
    color: theme.colors.text,
    flex: 1,
    lineHeight: 20,
  },
  daysContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  dayContainer: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    ...theme.elevation.medium,
  },
  dayHeader: {
    borderRadius: 15,
  },
  dayHeaderGradient: {
    padding: 16,
    borderRadius: 15,
  },
  dayHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayHeaderLeft: {
    flex: 1,
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
  dayTheme: {
    fontSize: 14,
    color: theme.colors.white,
    opacity: 0.9,
    marginTop: 2,
  },
  dayHeaderRight: {
    alignItems: 'flex-end',
  },
  activityCount: {
    fontSize: 12,
    color: theme.colors.white,
    opacity: 0.8,
  },
  expandIcon: {
    fontSize: 16,
    color: theme.colors.white,
    marginTop: 4,
  },
  dayContent: {
    backgroundColor: theme.colors.white,
    padding: 16,
  },
  activityContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  activityHeader: {
    alignItems: 'center',
    marginRight: 15,
  },
  timeContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  activityTime: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  activityDuration: {
    fontSize: 10,
    color: theme.colors.textLight,
    marginTop: 2,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityEmoji: {
    fontSize: 20,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 6,
  },
  activityDescription: {
    fontSize: 14,
    color: theme.colors.textLight,
    lineHeight: 20,
    marginBottom: 10,
  },
  activityDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  activityDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 5,
  },
  detailLabel: {
    fontSize: 12,
    color: theme.colors.textLight,
    marginRight: 4,
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.text,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  badgeItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    margin: 2,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.white,
  },
  tipsList: {
    backgroundColor: theme.colors.white,
    borderRadius: 15,
    padding: 15,
    ...theme.elevation.medium,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tipBullet: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  tipBulletText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
  tipText: {
    fontSize: 14,
    color: theme.colors.text,
    flex: 1,
    lineHeight: 20,
  },
  startButton: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 25,
    overflow: 'hidden',
    ...theme.elevation.large,
  },
  startButtonGradient: {
    padding: 18,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
  bottomSpacing: {
    height: 30,
  },
});

export default ItineraryViewer;
