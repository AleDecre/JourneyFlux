import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../utils/theme';
import { usePlanner } from '../../context/PlannerContext';

const ItineraryDetailScreen = ({ route, navigation }) => {
  const { itinerary } = route.params || {};
  const { actions } = usePlanner();
  
  if (!itinerary) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.errorText}>Nessun itinerario trovato.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleSaveTrip = () => {
    actions.saveTrip(itinerary);
    navigation.navigate('DiaryTab');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#F8F9FA', '#E9ECEF']} style={styles.gradient}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>{itinerary.titolo}</Text>
            <Text style={styles.headerSubtitle}>{itinerary.sottotitolo}</Text>
          </View>
        </View>

        <ScrollView 
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Giorni e Attività */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📅 Giorni e Attività</Text>
            {itinerary.giorni?.map((giorno, idx) => (
              <View key={idx} style={styles.dayCard}>
                <Text style={styles.dayTitle}>Giorno {giorno.giorno}: {giorno.tema}</Text>
                {giorno.attivita?.map((att, i) => (
                  <View key={i} style={styles.activityCard}>
                    <View style={styles.activityHeader}>
                      <Text style={styles.activityTime}>{att.orario}</Text>
                      <Text style={styles.activityIcon}>{att.icon}</Text>
                    </View>
                    <Text style={styles.activityName}>{att.nome}</Text>
                    <Text style={styles.activityDesc}>{att.descrizione}</Text>
                    <Text style={styles.activityMeta}>📍 {att.location} • {att.categoria} • {att.costo}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>

          {/* Badge Ottenibili */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🏆 Badge Ottenibili</Text>
            <View style={styles.badgeContainer}>
              {itinerary.badge_ottenibili?.map((badge, i) => (
                <View key={i} style={styles.badgeCard}>
                  <Text style={styles.badgeText}>{badge}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Highlights */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>✨ Highlights</Text>
            <View style={styles.listContainer}>
              {itinerary.highlights?.map((h, i) => (
                <Text key={i} style={styles.listItem}>• {h}</Text>
              ))}
            </View>
          </View>

          {/* Consigli */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>💡 Consigli</Text>
            <View style={styles.listContainer}>
              {itinerary.consigli?.map((c, i) => (
                <Text key={i} style={styles.listItem}>- {c}</Text>
              ))}
            </View>
          </View>

          {/* Budget */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>💰 Budget</Text>
            <Text style={styles.budgetText}>{itinerary.budget_totale}</Text>
          </View>

          {/* Pulsante Salva */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveTrip}>
            <LinearGradient colors={theme.gradients.primary} style={styles.saveButtonGradient}>
              <Ionicons name="bookmark" size={20} color="#fff" />
              <Text style={styles.saveButtonText}>Salva viaggio</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 0,
    backgroundColor: 'transparent',
    zIndex: 2,
  },
  backButton: {
    padding: theme.spacing.sm,
    marginRight: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: theme.fonts.sizes.title,
    fontWeight: theme.fonts.weights.bold,
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
    letterSpacing: 0.2,
  },
  headerSubtitle: {
    fontFamily: 'Nunito-Regular',
    fontSize: theme.fonts.sizes.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: theme.fonts.sizes.subheading,
    fontWeight: theme.fonts.weights.bold,
    color: theme.colors.accent,
    marginBottom: theme.spacing.md,
    letterSpacing: 0.2,
  },
  dayCard: {
    backgroundColor: '#fff',
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
  },
  dayTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: theme.fonts.sizes.body,
    fontWeight: theme.fonts.weights.bold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
  },
  activityCard: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.accent,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  activityTime: {
    fontFamily: 'Nunito-Bold',
    fontSize: theme.fonts.sizes.body,
    fontWeight: theme.fonts.weights.bold,
    color: theme.colors.primary,
  },
  activityIcon: {
    fontSize: 20,
  },
  activityName: {
    fontFamily: 'Nunito-Bold',
    fontSize: theme.fonts.sizes.body,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  activityDesc: {
    fontFamily: 'Nunito-Regular',
    fontSize: theme.fonts.sizes.body,
    color: theme.colors.textSecondary,
    lineHeight: 20,
    marginBottom: theme.spacing.xs,
  },
  activityMeta: {
    fontFamily: 'Nunito-Regular',
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.textLight,
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  badgeCard: {
    backgroundColor: theme.colors.accent + '22',
    borderRadius: theme.borderRadius.medium,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.accent + '40',
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  badgeText: {
    fontFamily: 'Nunito-Bold',
    fontSize: theme.fonts.sizes.small,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.accent,
  },
  listContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.lg,
  },
  listItem: {
    fontFamily: 'Nunito-Regular',
    fontSize: theme.fonts.sizes.body,
    color: theme.colors.text,
    lineHeight: 22,
    marginBottom: theme.spacing.sm,
  },
  budgetText: {
    fontFamily: 'Nunito-Bold',
    fontSize: theme.fonts.sizes.title,
    fontWeight: theme.fonts.weights.bold,
    color: theme.colors.success,
    textAlign: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.lg,
    marginTop: theme.spacing.sm,
  },
  saveButton: {
    marginTop: theme.spacing.lg,
    borderRadius: theme.borderRadius.large,
    overflow: 'hidden',
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  saveButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
  },
  saveButtonText: {
    fontFamily: 'Nunito-Bold',
    fontSize: theme.fonts.sizes.body,
    fontWeight: theme.fonts.weights.bold,
    color: theme.colors.surface,
    marginLeft: theme.spacing.sm,
    letterSpacing: 0.2,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontFamily: 'Nunito-Regular',
    fontSize: theme.fonts.sizes.body,
    color: theme.colors.textSecondary,
  },
});

export default ItineraryDetailScreen;
