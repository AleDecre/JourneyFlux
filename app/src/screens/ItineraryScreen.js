import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { getItineraryById } from '../data/itineraries';
import { theme } from '../utils/theme';

export default function ItineraryScreen({ navigation }) {
  const route = useRoute();
  const { itineraryId } = route.params;
  const itinerary = getItineraryById(itineraryId);

  if (!itinerary) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Itinerario non trovato</Text>
        </View>
      </SafeAreaView>
    );
  }

  const creator = itinerary.creator || {};
  const reviews = itinerary.reviews || [];
  const reviewsCount = creator.reviewsCount || itinerary.totalReviews || reviews.length;
  const rating = creator.rating || itinerary.rating;

  const getCategoryColors = () => {
    if (itinerary.itineraryType === 'community') {
      return ['#4ECDC4', '#7ED5D1'];
    } else {
      return ['#667eea', '#764ba2'];
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={getCategoryColors()}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
            <Text style={styles.backButtonText}>Indietro</Text>
          </TouchableOpacity>
          
          <View style={styles.headerContent}>
            <Text style={styles.typeLabel}>
              {itinerary.itineraryType === 'community' ? '👥 Community' : '🏢 Tour Operator'}
            </Text>
            <Text style={styles.title}>{itinerary.title}</Text>
            <Text style={styles.subtitle}>{itinerary.subtitle}</Text>
            
            <View style={styles.creatorInfo}>
              <Text style={styles.creatorAvatar}>{creator.avatar || '👤'}</Text>
              <View style={styles.creatorDetails}>
                <Text style={styles.creatorName}>{creator.name}</Text>
                <Text style={styles.creatorType}>
                  {creator.type === 'local_ambassador' ? 'Local Ambassador' : creator.type}
                </Text>
              </View>
              {creator.verified && (
                <View style={styles.verifiedBadge}>
                  <Ionicons name="checkmark-circle" size={16} color="#27AE60" />
                </View>
              )}
            </View>
            
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{rating} ({reviewsCount} recensioni)</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          {/* Informazioni generali */}
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={24} color="#4ECDC4" />
              <Text style={styles.infoLabel}>Durata</Text>
              <Text style={styles.infoValue}>{itinerary.duration}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="cash-outline" size={24} color="#4ECDC4" />
              <Text style={styles.infoLabel}>Costo</Text>
              <Text style={styles.infoValue}>{itinerary.estimatedCost}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="fitness-outline" size={24} color="#4ECDC4" />
              <Text style={styles.infoLabel}>Difficoltà</Text>
              <Text style={styles.infoValue}>{itinerary.difficulty}</Text>
            </View>
          </View>

          {/* Timeline */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📍 Timeline dell'itinerario</Text>
            {itinerary.timeline && itinerary.timeline.length > 0 ? (
              itinerary.timeline.map((step, idx) => (
                <View key={step.id || idx} style={styles.timelineItem}>
                  <View style={styles.timelineMarker}>
                    <Text style={styles.timelineNumber}>{idx + 1}</Text>
                  </View>
                  <View style={styles.timelineContent}>
                    <View style={styles.timelineHeader}>
                      <Text style={styles.timelineTime}>{step.time}</Text>
                      <Text style={styles.timelineType}>{step.type}</Text>
                    </View>
                    <Text style={styles.timelineTitle}>{step.title || step.location}</Text>
                    <Text style={styles.timelineDescription}>{step.description}</Text>
                    {step.estimatedCost && (
                      <Text style={styles.timelineCost}>💰 {step.estimatedCost}</Text>
                    )}
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>Nessuna tappa disponibile</Text>
            )}
          </View>

          {/* Prenotazione */}
          {itinerary.booking && itinerary.booking.required && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🎫 Prenotazione</Text>
              <View style={styles.bookingCard}>
                <Text style={styles.bookingTitle}>Prenotazione richiesta</Text>
                <Text style={styles.bookingInfo}>
                  Link: {itinerary.booking.link || 'Non disponibile'}
                </Text>
                <Text style={styles.bookingInfo}>
                  Prezzo: {itinerary.booking.price || 'Incluso'}
                </Text>
              </View>
            </View>
          )}

          {/* Recensioni */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>⭐ Recensioni</Text>
            {reviews.length > 0 ? (
              reviews.map((review, idx) => (
                <View key={review.id || idx} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <Text style={styles.reviewAvatar}>{review.user?.avatar || '👤'}</Text>
                    <View style={styles.reviewUser}>
                      <Text style={styles.reviewUsername}>{review.user?.username || 'Utente'}</Text>
                      <View style={styles.reviewRating}>
                        {[...Array(5)].map((_, i) => (
                          <Ionicons
                            key={i}
                            name="star"
                            size={12}
                            color={i < review.rating ? '#FFD700' : '#E0E0E0'}
                          />
                        ))}
                      </View>
                    </View>
                    {review.user?.verified && (
                      <Ionicons name="checkmark-circle" size={16} color="#27AE60" />
                    )}
                  </View>
                  <Text style={styles.reviewComment}>"{review.comment}"</Text>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>Nessuna recensione disponibile</Text>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Footer con azione */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.actionButton}>
          <LinearGradient
            colors={getCategoryColors()}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.actionButtonGradient}
          >
            <Text style={styles.actionButtonText}>
              {itinerary.itineraryType === 'community' ? 'Segui Itinerario' : 'Prenota Tour'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#E74C3C',
    textAlign: 'center',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: theme.fonts.semiBold,
    marginLeft: 4,
  },
  headerContent: {
    alignItems: 'center',
  },
  typeLabel: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 16,
  },
  creatorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
  },
  creatorAvatar: {
    fontSize: 24,
    marginRight: 12,
  },
  creatorDetails: {
    flex: 1,
  },
  creatorName: {
    fontSize: 16,
    fontFamily: theme.fonts.semiBold,
    color: '#FFFFFF',
  },
  creatorType: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  verifiedBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: '#FFFFFF',
    marginLeft: 4,
  },
  content: {
    padding: 16,
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  infoItem: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flex: 1,
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  infoLabel: {
    fontSize: 12,
    fontFamily: theme.fonts.medium,
    color: '#7F8C8D',
    marginTop: 4,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: theme.fonts.semiBold,
    color: '#2C3E50',
    textAlign: 'center',
    marginTop: 2,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    color: '#2C3E50',
    marginBottom: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timelineMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4ECDC4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  timelineNumber: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
  },
  timelineContent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timelineTime: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: '#4ECDC4',
  },
  timelineType: {
    fontSize: 12,
    fontFamily: theme.fonts.medium,
    color: '#7F8C8D',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  timelineTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.semiBold,
    color: '#2C3E50',
    marginBottom: 4,
  },
  timelineDescription: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#34495E',
    lineHeight: 20,
  },
  timelineCost: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: '#27AE60',
    marginTop: 8,
  },
  bookingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  bookingTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.semiBold,
    color: '#2C3E50',
    marginBottom: 8,
  },
  bookingInfo: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#34495E',
    marginBottom: 4,
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewAvatar: {
    fontSize: 24,
    marginRight: 12,
  },
  reviewUser: {
    flex: 1,
  },
  reviewUsername: {
    fontSize: 16,
    fontFamily: theme.fonts.semiBold,
    color: '#2C3E50',
  },
  reviewRating: {
    flexDirection: 'row',
    marginTop: 2,
  },
  reviewComment: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#34495E',
    lineHeight: 20,
    marginBottom: 8,
    fontStyle: 'italic',
  },
  reviewDate: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: '#7F8C8D',
  },
  emptyText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#7F8C8D',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
  },
  actionButton: {
    borderRadius: 12,
  },
  actionButtonGradient: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: theme.fonts.bold,
  },
});
