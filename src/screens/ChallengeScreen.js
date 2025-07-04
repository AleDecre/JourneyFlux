import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { getChallengeById } from '../data/challenges';
import { getBadgeById } from '../data/badges';

const ChallengeScreen = ({ route, navigation }) => {
  const { challengeId } = route.params;
  const challenge = getChallengeById(challengeId);
  const badge = getBadgeById(challengeId);
  
  const [isNearLocation, setIsNearLocation] = useState(true); // Mock GPS
  const [photoUploaded, setPhotoUploaded] = useState(false);

  if (!challenge) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Sfida non trovata</Text>
      </SafeAreaView>
    );
  }

  const handleStartChallenge = () => {
    Alert.alert(
      "Inizia la sfida",
      "Sei pronto per iniziare questa avventura?",
      [
        { text: "Annulla", style: "cancel" },
        { text: "Inizia!", onPress: () => setIsNearLocation(true) }
      ]
    );
  };

  const handlePhotoUpload = () => {
    Alert.alert(
      "Carica Foto",
      "Questa funzione aprirà la fotocamera per scattare una foto della sfida.",
      [
        { text: "Annulla", style: "cancel" },
        { text: "Scatta Foto", onPress: () => setPhotoUploaded(true) }
      ]
    );
  };

  const handleCompleteChallenge = () => {
    if (!isNearLocation) {
      Alert.alert("Errore", "Devi essere vicino alla location per completare la sfida!");
      return;
    }
    
    if (!photoUploaded) {
      Alert.alert("Errore", "Devi caricare una foto per completare la sfida!");
      return;
    }

    navigation.navigate('ChallengeComplete', { 
      challengeId: challenge.id,
      pointsEarned: challenge.points,
      badgeEarned: badge
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'facile':
        return '#4ECDC4';
      case 'media':
        return '#FFB74D';
      case 'difficile':
        return '#FF6B6B';
      default:
        return '#95A5A6';
    }
  };

  const getCategoryColors = (category) => {
    switch (category.toLowerCase()) {
      case 'gastronomia':
        return ['#FF6B6B', '#FF8E8E'];
      case 'cultura':
        return ['#4ECDC4', '#7ED5D1'];
      case 'natura':
        return ['#45B7D1', '#6AC5E5'];
      case 'arte':
        return ['#F06292', '#F48FB1'];
      default:
        return ['#95A5A6', '#B2BFC6'];
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={getCategoryColors(challenge.category)}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Indietro</Text>
          </TouchableOpacity>
          
          <View style={styles.headerContent}>
            <Text style={styles.challengeEmoji}>{challenge.image}</Text>
            <Text style={styles.challengeTitle}>{challenge.title}</Text>
            <Text style={styles.challengeLocation}>{challenge.location}</Text>
            
            <View style={styles.challengeInfo}>
              <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(challenge.difficulty) }]}>
                <Text style={styles.difficultyText}>{challenge.difficulty}</Text>
              </View>
              <View style={styles.pointsBadge}>
                <Text style={styles.pointsText}>{challenge.points} punti</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Descrizione</Text>
            <Text style={styles.description}>{challenge.description}</Text>
          </View>

          <View style={styles.requirementsSection}>
            <Text style={styles.sectionTitle}>Requisiti per completare</Text>
            {challenge.requirements.map((requirement, index) => (
              <View key={index} style={styles.requirementItem}>
                <Text style={styles.requirementBullet}>•</Text>
                <Text style={styles.requirementText}>{requirement}</Text>
              </View>
            ))}
          </View>

          <View style={styles.verificationSection}>
            <Text style={styles.sectionTitle}>Verifica Sfida</Text>
            
            <View style={styles.verificationItem}>
              <View style={styles.verificationHeader}>
                <Text style={styles.verificationTitle}>📍 Posizione GPS</Text>
                <Text style={[
                  styles.verificationStatus,
                  { color: isNearLocation ? '#27AE60' : '#E74C3C' }
                ]}>
                  {isNearLocation ? '✅ Posizione verificata' : '❌ Troppo lontano'}
                </Text>
              </View>
              <Text style={styles.verificationSubtitle}>
                {isNearLocation 
                  ? 'Sei nella zona giusta per completare la sfida!'
                  : 'Avvicinati alla location per procedere'
                }
              </Text>
            </View>

            <View style={styles.verificationItem}>
              <View style={styles.verificationHeader}>
                <Text style={styles.verificationTitle}>📸 Foto richiesta</Text>
                <Text style={[
                  styles.verificationStatus,
                  { color: photoUploaded ? '#27AE60' : '#7F8C8D' }
                ]}>
                  {photoUploaded ? '✅ Foto caricata' : '⏳ In attesa'}
                </Text>
              </View>
              
              <TouchableOpacity
                style={[
                  styles.photoUploadButton,
                  photoUploaded && styles.photoUploadButtonDisabled
                ]}
                onPress={handlePhotoUpload}
                disabled={photoUploaded}
              >
                <Text style={styles.photoUploadText}>
                  {photoUploaded ? 'Foto caricata con successo' : 'Scatta o carica foto'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.badgePreview}>
            <Text style={styles.sectionTitle}>Badge da sbloccare</Text>
            <View style={styles.badgeCard}>
              <LinearGradient
                colors={[challenge.category === 'gastronomia' ? '#FF6B6B' : '#4ECDC4', '#FFFFFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.badgeGradient}
              >
                <Text style={styles.badgeIcon}>🏆</Text>
                <Text style={styles.badgeName}>{challenge.badge}</Text>
              </LinearGradient>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {challenge.completed ? (
          <View style={styles.completedContainer}>
            <Text style={styles.completedText}>✅ Sfida completata!</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={[
              styles.actionButton,
              (!isNearLocation || !photoUploaded) && styles.actionButtonDisabled
            ]}
            onPress={handleCompleteChallenge}
            disabled={!isNearLocation || !photoUploaded}
          >
            <LinearGradient
              colors={
                isNearLocation && photoUploaded
                  ? ['#27AE60', '#2ECC71']
                  : ['#BDC3C7', '#95A5A6']
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.actionButtonGradient}
            >
              <Text style={styles.actionButtonText}>
                {isNearLocation && photoUploaded ? 'Completa Sfida' : 'Completa i requisiti'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
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
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 16,
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  headerContent: {
    alignItems: 'center',
  },
  challengeEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  challengeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  challengeLocation: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 16,
  },
  challengeInfo: {
    flexDirection: 'row',
    gap: 12,
  },
  difficultyBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  difficultyText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  pointsBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  pointsText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  descriptionSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#34495E',
    lineHeight: 24,
  },
  requirementsSection: {
    marginBottom: 24,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  requirementBullet: {
    fontSize: 16,
    color: '#4ECDC4',
    marginRight: 8,
    marginTop: 2,
  },
  requirementText: {
    fontSize: 14,
    color: '#34495E',
    flex: 1,
    lineHeight: 20,
  },
  verificationSection: {
    marginBottom: 24,
  },
  verificationItem: {
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
  verificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  verificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  verificationStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
  verificationSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  photoUploadButton: {
    backgroundColor: '#4ECDC4',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  photoUploadButtonDisabled: {
    backgroundColor: '#27AE60',
  },
  photoUploadText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  badgePreview: {
    marginBottom: 24,
  },
  badgeCard: {
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  badgeGradient: {
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  badgeIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  badgeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
  },
  completedContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  completedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27AE60',
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
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: '#E74C3C',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default ChallengeScreen;
