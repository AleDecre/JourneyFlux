import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ItineraryViewer from '../../components/ItineraryViewer';
import { usePlanner } from '../../context/PlannerContext';

const ItineraryPreviewModal = ({ visible, onClose, onConfirm }) => {
  const { state } = usePlanner();
  const itinerary = state.userPreferences?.generatedItinerary;

  if (!itinerary) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Anteprima Viaggio</Text>
          <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <ItineraryViewer itinerary={itinerary} onStartJourney={onConfirm} />
          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={onConfirm}>
              <LinearGradient colors={["#4ECDC4", "#667eea"]} style={styles.saveButtonGradient}>
                <Text style={styles.saveButtonText}>Salva viaggio</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.closeButtonGradient}>
                <Text style={styles.closeButtonText}>Chiudi</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '92%',
    maxHeight: '90%',
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4ECDC4',
    textAlign: 'center',
    marginBottom: 10,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 10,
  },
  buttonContainer: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  saveButton: {
    marginTop: 10,
    borderRadius: 16,
    overflow: 'hidden',
  },
  saveButtonGradient: {
    padding: 14,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  closeButtonGradient: {
    padding: 14,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ItineraryPreviewModal;
