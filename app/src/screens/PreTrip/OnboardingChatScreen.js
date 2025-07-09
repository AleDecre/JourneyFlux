import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../utils/theme';
import { usePlanner } from '../../context/PlannerContext';
import { cities } from '../../data/cities';
import ItineraryPreviewModal from './ItineraryPreviewModal'; // Importa il tuo componente di modal
import { Ionicons } from '@expo/vector-icons';

const CHAT_STEPS = [
  {
    id: 'welcome',
    type: 'bot',
    message: '👋 Ciao! Sono il tuo assistente di viaggio personalizzato. Ti aiuterò a creare un itinerario perfetto per te!',
    nextStep: 'duration',
  },
  {
    id: 'duration',
    type: 'question',
    message: '📅 Quanto durerà il tuo viaggio?',
    options: [
      { value: 1, label: '1 giorno', icon: '⏰' },
      { value: 2, label: '2-3 giorni', icon: '📅' },
      { value: 5, label: '4-7 giorni', icon: '🗓️' },
      { value: 10, label: 'Più di una settimana', icon: '📊' },
    ],
    nextStep: 'city',
  },
  {
    id: 'city',
    type: 'question',
    message: '🏛️ Quale città italiana vuoi esplorare?',
    options: cities.map(city => ({
      value: city.id,
      label: city.name,
      icon: city.emoji,
    })),
    nextStep: 'interests',
  },
  {
    id: 'interests',
    type: 'question',
    message: '🎯 Quali sono i tuoi interessi principali? (Seleziona tutti quelli che ti interessano)',
    multiSelect: true,
    options: [
      { value: 'cultura', label: 'Cultura & Storia', icon: '🏛️' },
      { value: 'gastronomia', label: 'Gastronomia', icon: '🍕' },
      { value: 'arte', label: 'Arte & Musei', icon: '🎨' },
      { value: 'natura', label: 'Natura & Parchi', icon: '🌳' },
      { value: 'avventura', label: 'Avventura', icon: '🏃' },
      { value: 'shopping', label: 'Shopping', icon: '🛍️' },
      { value: 'vita_notturna', label: 'Vita Notturna', icon: '🌙' },
      { value: 'architettura', label: 'Architettura', icon: '🏗️' },
    ],
    nextStep: 'budget',
  },
  {
    id: 'budget',
    type: 'question',
    message: '💰 Qual è il tuo budget approssimativo per persona?',
    options: [
      { value: 'low', label: 'Economico (€20-50/giorno)', icon: '💵' },
      { value: 'medium', label: 'Medio (€50-100/giorno)', icon: '💴' },
      { value: 'high', label: 'Alto (€100+/giorno)', icon: '💸' },
    ],
    nextStep: 'travelStyle',
  },
  {
    id: 'travelStyle',
    type: 'question',
    message: '🎭 Che tipo di viaggiatore sei?',
    options: [
      { value: 'relaxed', label: 'Rilassato - Poche tappe, tempo per esplorare', icon: '😌' },
      { value: 'active', label: 'Attivo - Tante attività, sempre in movimento', icon: '🏃' },
      { value: 'mixed', label: 'Bilanciato - Mix di relax e avventura', icon: '⚖️' },
    ],
    nextStep: 'complete',
  },
  {
    id: 'complete',
    type: 'bot',
    message: '🎉 Perfetto! Ho tutte le informazioni necessarie. Ora creerò un itinerario personalizzato per te!',
    nextStep: null,
  },
];

const OnboardingChatScreen = ({ navigation }) => {
  const { actions, state } = usePlanner();
  const [currentStep, setCurrentStep] = useState(0);
  const [chatMessages, setChatMessages] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  // Stato per mostrare il pulsante "Vai al planner" e il modal
  const [showPlannerButton, setShowPlannerButton] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [itineraryGenerated, setItineraryGenerated] = useState(false);
  const scrollViewRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      const firstStep = CHAT_STEPS[0];
      if (firstStep && firstStep.message) {
        addMessage(firstStep);
        setCurrentStep(1);
      }
    }, 500);
  }, []);

  useEffect(() => {
    // Quando arrivi allo step "complete", genera e mostra l’itinerario se non già fatto
    if (
      CHAT_STEPS[currentStep]?.id === 'complete' &&
      !itineraryGenerated
    ) {
      (async () => {
        setIsTyping(true);
        const structuredItinerary = await generateStructuredItinerary(selectedAnswers);
        if (structuredItinerary) {
          actions.setUserPreferences({ ...selectedAnswers, generatedItinerary: structuredItinerary });
          const preview = `🎯 ${structuredItinerary.titolo}\n\n` +
            `📅 ${structuredItinerary.giorni?.length || 0} giorni di avventure\n` +
            `💰 Budget: ${structuredItinerary.budget_totale}\n` +
            `🏆 ${structuredItinerary.badge_ottenibili?.length || 0} badge ottenibili\n` +
            `✨ ${structuredItinerary.highlights?.length || 0} highlights speciali\n\n` +
            `Premi il pulsante qui sotto per vedere tutti i dettagli!`;
          addMessage({ type: 'bot', message: preview });
          setTimeout(() => {
            setShowPlannerButton(true);
          }, 800);
        } else {
          addMessage({ type: 'bot', message: '⚠️ Errore nella generazione dell’itinerario. Riprova più tardi.' });
          actions.setUserPreferences(selectedAnswers);
        }
        setItineraryGenerated(true);
        setIsTyping(false);
      })();
    }
  }, [currentStep, itineraryGenerated, selectedAnswers, actions]);

  const addMessage = (stepOrMsg, answer = null) => {
    if (!stepOrMsg) return;
    
    // Se arriva una stringa pura, wrappala come oggetto bot
    const msgObj = typeof stepOrMsg === 'string'
      ? { type: 'bot', message: stepOrMsg }
      : stepOrMsg;
    
    // Validazione che il messaggio sia una stringa
    if (!msgObj.message || typeof msgObj.message !== 'string') {
      console.warn('Messaggio non valido:', msgObj);
      return;
    }
    
    setChatMessages(prev => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        type: msgObj.type || 'bot',
        message: msgObj.message,
        answer: answer,
        timestamp: new Date(),
      },
    ]);
  };

  // MOCK: Risposta chat locale
  const fetchLLMResponse = async (userMessage, context, question) => {
    // Risposte simulate in base al tipo di domanda
    if (question?.toLowerCase().includes('città')) {
      return 'Ottima scelta! Questa città ha tantissimo da offrire. ✨';
    }
    if (question?.toLowerCase().includes('interessi')) {
      return 'Perfetto, terrò conto dei tuoi interessi per personalizzare il viaggio!';
    }
    if (question?.toLowerCase().includes('budget')) {
      return 'Budget impostato! Troverò esperienze adatte alla tua fascia di spesa.';
    }
    if (question?.toLowerCase().includes('viaggiatore')) {
      return 'Stile di viaggio selezionato! Preparo un itinerario su misura.';
    }
    if (question?.toLowerCase().includes('durata')) {
      return 'Durata impostata! Più giorni, più avventure!';
    }
    return 'Informazione ricevuta! Procediamo con la prossima domanda.';
  };

  // MOCK: Generazione itinerario locale
  const generateStructuredItinerary = async (preferences) => {
    // Simula un itinerario statico coerente con le preferenze
    const cityName = preferences.city ? (typeof preferences.city === 'string' ? preferences.city : 'Roma') : 'Roma';
    const duration = preferences.duration || 2;
    const interests = Array.isArray(preferences.interests) ? preferences.interests.join(', ') : 'cultura, gastronomia';
    const travelStyle = preferences.travelStyle || 'mixed';
    const budget = preferences.budget || 'medium';

    return {
      titolo: `Itinerario ${duration} giorni a ${cityName}`,
      sottotitolo: `${travelStyle} • ${budget} budget • ${interests}`,
      durata_giorni: duration,
      giorni: Array.from({ length: duration }).map((_, i) => ({
        giorno: i + 1,
        tema: i === 0 ? 'Benvenuto e primo assaggio' : 'Scoperta locale',
        attivita: [
          {
            orario: '09:00',
            nome: 'Colazione tipica',
            descrizione: 'Inizia la giornata con una colazione locale.',
            costo: '€8',
            categoria: 'gastronomia',
            icon: '☕',
            durata: '1 ora',
            location: 'Centro città'
          },
          {
            orario: '11:00',
            nome: 'Tour guidato',
            descrizione: 'Scopri i segreti della città con una guida.',
            costo: '€15',
            categoria: 'cultura',
            icon: '🏛️',
            durata: '2 ore',
            location: 'Piazza principale'
          },
          {
            orario: '13:00',
            nome: 'Pranzo tipico',
            descrizione: 'Assaggia la cucina tradizionale.',
            costo: '€25',
            categoria: 'gastronomia',
            icon: '🍝',
            durata: '1.5 ore',
            location: 'Trattoria storica'
          }
        ]
      })),
      budget_totale: budget === 'low' ? '€20-50/giorno' : budget === 'high' ? '€100+/giorno' : '€50-100/giorno',
      consigli: [
        'Porta scarpe comode!',
        'Prenota i ristoranti in anticipo.',
        'Scarica JourneyFlux per badge esclusivi.'
      ],
      badge_ottenibili: [
        `Esploratore di ${cityName}`,
        'Foodie Locale',
        'Cacciatore di Cultura'
      ],
      highlights: [
        'Esperienze autentiche',
        'Guide locali',
        'Degustazioni esclusive'
      ]
    };
  };

  // --- FIX: Blocca input durante isTyping ---
  const handleAnswer = async (stepId, answer) => {
    if (isTyping) return; // Blocca doppio click
    // Trova lo step corrente in modo sicuro
    const step = CHAT_STEPS.find(s => s.id === stepId);
    if (step && step.multiSelect) {
      const currentAnswers = selectedAnswers[stepId] || [];
      const newAnswers = currentAnswers.includes(answer.value)
        ? currentAnswers.filter(a => a !== answer.value)
        : [...currentAnswers, answer.value];
      setSelectedAnswers(prev => ({ ...prev, [stepId]: newAnswers }));
      return;
    }
    setSelectedAnswers(prev => ({ ...prev, [stepId]: answer.value }));
    addMessage({ type: 'user', message: answer.label });
    setIsTyping(true);
    const llmResponse = await fetchLLMResponse(answer.label, selectedAnswers, step.message);
    addMessage({ type: 'bot', message: llmResponse });
    setTimeout(() => {
      setIsTyping(false);
      proceedToNextStep(step);
    }, 1200);
  };

  // --- FIX: Blocca doppio click anche su multiSelect ---
  const handleMultiSelectConfirm = async (stepId) => {
    if (isTyping) return;
    const step = CHAT_STEPS.find(s => s.id === stepId);
    const selectedValues = selectedAnswers[stepId] || [];
    if (selectedValues.length === 0) {
      Alert.alert('Attenzione', 'Seleziona almeno un interesse prima di continuare.');
      return;
    }
    const selectedLabels = step.options
      .filter(opt => selectedValues.includes(opt.value))
      .map(opt => opt.label)
      .join(', ');
    addMessage({ type: 'user', message: selectedLabels });
    setIsTyping(true);
    const llmResponse = await fetchLLMResponse(selectedLabels, selectedAnswers, step.message);
    addMessage({ type: 'bot', message: llmResponse });
    setTimeout(() => {
      setIsTyping(false);
      proceedToNextStep(step);
    }, 1200);
  };

  // --- FIX: Avanza step solo con oggetto step, mai stringa ---
  const proceedToNextStep = async (currentStepData) => {
    if (currentStepData.nextStep) {
      const nextStep = CHAT_STEPS.find(s => s.id === currentStepData.nextStep);
      if (nextStep) {
        setTimeout(() => {
          // Mostra la domanda come messaggio del bot
          if (nextStep.type === 'question') addMessage({ type: 'bot', message: nextStep.message });
          const nextStepIndex = CHAT_STEPS.findIndex(s => s.id === currentStepData.nextStep);
          setCurrentStep(nextStepIndex);
        }, 500);
      }
    } else {
      // FINE: Genera sempre itinerario mock e mostra in chat
      setIsTyping(true);
      addMessage({ type: 'bot', message: '🎉 Perfetto! Sto creando il tuo itinerario personalizzato...' });
      const structuredItinerary = await generateStructuredItinerary(selectedAnswers);
      if (structuredItinerary) {
        actions.setUserPreferences({ ...selectedAnswers, generatedItinerary: structuredItinerary });
        // Mostra anteprima itinerario in chat
        const preview = `🎯 ${structuredItinerary.titolo}\n\n` +
          `📅 ${structuredItinerary.giorni?.length || 0} giorni di avventure\n` +
          `💰 Budget: ${structuredItinerary.budget_totale}\n` +
          `🏆 ${structuredItinerary.badge_ottenibili?.length || 0} badge ottenibili\n` +
          `✨ ${structuredItinerary.highlights?.length || 0} highlights speciali\n\n` +
          `Premi il pulsante qui sotto per vedere tutti i dettagli!`;
        addMessage({ type: 'bot', message: preview });
        setTimeout(() => {
          setShowPlannerButton(true);
        }, 800);
      } else {
        addMessage({ type: 'bot', message: '⚠️ Errore nella generazione dell’itinerario. Riprova più tardi.' });
        actions.setUserPreferences(selectedAnswers);
      }
      setIsTyping(false);
      // NON navigare più automaticamente
    }
  };

  // --- FIX: Render solo se message.message è stringa e wrappa sempre in <Text> ---
  const renderMessage = (message, index) => {
    if (!message) return null;
    if (typeof message !== 'object') return null;
    if (!message.message) return null;
    if (typeof message.message !== 'string') return null;
    if (message.message.trim() === '') return null;
    const isBot = message.type === 'bot';
    return (
      <View key={message.id || index} style={[
        styles.messageContainer,
        isBot ? styles.botMessage : styles.userMessage,
      ]}>
        <View style={[
          styles.messageBubble,
          isBot ? styles.botBubble : styles.userBubble,
        ]}>
          <Text style={[
            styles.messageText,
            isBot ? styles.botText : styles.userText,
          ]}>
            {String(message.message)}
          </Text>
        </View>
      </View>
    );
  };

  // Migliora UI: opzioni più compatte
  const renderCurrentQuestion = () => {
    if (currentStep >= CHAT_STEPS.length) return null;
    
    const step = CHAT_STEPS[currentStep];
    const isMulti = !!step.multiSelect;

    if (step.type !== 'question') return null;

    return (
      <View style={[styles.optionsContainer, {paddingVertical: 8, paddingHorizontal: 0}]}> {/* più compatto */}
        {step.options.map((option, index) => {
          const selected = isMulti
            ? Array.isArray(selectedAnswers[step.id]) && selectedAnswers[step.id].includes(option.value)
            : selectedAnswers[step.id] === option.value;
          return (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.optionButton,
                selected && styles.optionButtonSelected,
                {marginVertical: 2, paddingVertical: 8, paddingHorizontal: 10, minHeight: 36}
              ]}
              onPress={() => handleAnswer(step.id, option)}
              disabled={isTyping}
            >
              <Text style={styles.optionIcon}>{option.icon}</Text>
              <Text style={[
                styles.optionText,
                selected && styles.optionTextSelected,
                {fontSize: 15}
              ]}>
                {String(option.label)}
              </Text>
            </TouchableOpacity>
          );
        })}
        
        {step.multiSelect && (
          <TouchableOpacity
            style={[
              styles.confirmButton,
              !(selectedAnswers[step.id] || []).length && styles.confirmButtonDisabled,
              {marginTop: 8, minHeight: 36}
            ]}
            onPress={() => !isTyping && handleMultiSelectConfirm(step.id)}
            disabled={isTyping || !(selectedAnswers[step.id] || []).length}
          >
            <LinearGradient
              colors={theme.gradients.primary}
              style={styles.confirmButtonGradient}
            >
              <Text style={styles.confirmButtonText}>Continua</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderTypingIndicator = () => {
    if (!isTyping) return null;
    
    return (
      <View style={[styles.messageContainer, styles.botMessage]}>
        <View style={[styles.messageBubble, styles.botBubble]}>
          <Text style={styles.typingText}>● ● ●</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#F8F9FA', '#E9ECEF']} style={styles.gradient}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Pianifica il tuo viaggio</Text>
          <View style={styles.headerRight}>
            <Text style={styles.stepIndicator}>
              {Math.min(currentStep + 1, CHAT_STEPS.length)}/{CHAT_STEPS.length}
            </Text>
          </View>
        </View>

        <ScrollView
          style={styles.chatContainer}
          contentContainerStyle={styles.chatContent}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {chatMessages.filter(msg => msg && msg.message).map((message, index) => renderMessage(message, index))}
          {renderTypingIndicator()}
        </ScrollView>

        <View style={styles.inputContainer}>
          <ScrollView style={{ maxHeight: 400 }} showsVerticalScrollIndicator={false}>
            {CHAT_STEPS[currentStep]?.type === 'question' && (
              <View style={styles.optionsContainer}>
                {/* NON ripetere la domanda qui, la domanda è già in chat! */}
                <View style={styles.optionsScroll}>
                  {(() => {
                    const step = CHAT_STEPS[currentStep];
                    const isMulti = !!step.multiSelect;
                    const selected = selectedAnswers[step.id];
                    return step.options.map(option => {
                      const isSelected = isMulti
                        ? Array.isArray(selected) && selected.includes(option.value)
                        : selected === option.value;
                      return (
                        <TouchableOpacity
                          key={option.value}
                          style={[
                            styles.optionButton,
                            isSelected && styles.optionButtonSelected,
                          ]}
                          onPress={() => handleAnswer(step.id, option)}
                        >
                          <Text style={styles.optionIcon}>{option.icon}</Text>
                          <Text style={styles.optionLabel}>{option.label}</Text>
                        </TouchableOpacity>
                      );
                    });
                  })()}
                </View>
                {/* Bottone conferma solo per multiSelect - SEMPRE VISIBILE */}
                {CHAT_STEPS[currentStep].multiSelect && (
                  <View style={styles.confirmButtonContainer}>
                    <TouchableOpacity
                      style={[
                        styles.confirmButton,
                        (!Array.isArray(selectedAnswers[CHAT_STEPS[currentStep].id]) || selectedAnswers[CHAT_STEPS[currentStep].id].length === 0) && styles.confirmButtonDisabled,
                      ]}
                      onPress={() => handleMultiSelectConfirm(CHAT_STEPS[currentStep].id)}
                      disabled={(!Array.isArray(selectedAnswers[CHAT_STEPS[currentStep].id]) || selectedAnswers[CHAT_STEPS[currentStep].id].length === 0)}
                    >
                      <LinearGradient
                        colors={theme.gradients.primary}
                        style={styles.confirmButtonGradient}
                      >
                        <Text style={styles.confirmButtonText}>Conferma selezione</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
          </ScrollView>

          {showPlannerButton && (
            <TouchableOpacity
              style={styles.plannerButton}
              onPress={() => {
                navigation.navigate('ItineraryDetail', {
                  itinerary: state.userPreferences?.generatedItinerary,
                });
              }}
            >
              <LinearGradient
                colors={theme.gradients.primary}
                style={styles.plannerButtonGradient}
              >
                <Ionicons name="paper-plane" size={24} color="#fff" />
                <Text style={styles.plannerButtonText}>Vedi l'itinerario completo</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
          {/* --- FIX: Render ItineraryPreviewModal sopra tutto il resto --- */}
          <ItineraryPreviewModal
            visible={showPreviewModal}
            onClose={() => setShowPreviewModal(false)}
            itinerary={state.userPreferences?.generatedItinerary}
            // Puoi aggiungere altre props se servono
          />
        </View>
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
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  headerTitle: {
    flex: 1,
    fontFamily: 'Nunito-Bold',
    fontSize: theme.fonts.sizes.heading,
    fontWeight: theme.fonts.weights.bold,
    color: theme.colors.text,
    textAlign: 'center',
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  stepIndicator: {
    fontFamily: 'Nunito-Regular',
    fontSize: theme.fonts.sizes.body,
    color: theme.colors.textSecondary,
    fontWeight: theme.fonts.weights.medium,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  chatContent: {
    paddingVertical: theme.spacing.lg,
  },
  messageContainer: {
    marginVertical: theme.spacing.sm,
  },
  botMessage: {
    alignItems: 'flex-start',
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.large,
  },
  botBubble: {
    backgroundColor: theme.colors.surface,
    borderBottomLeftRadius: theme.borderRadius.small,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userBubble: {
    backgroundColor: theme.colors.primary,
    borderBottomRightRadius: theme.borderRadius.small,
  },
  messageText: {
    fontFamily: 'Nunito-Regular',
    fontSize: theme.fonts.sizes.body,
    lineHeight: 20,
  },
  botText: {
    color: theme.colors.text,
  },
  userText: {
    color: theme.colors.surface,
    fontWeight: theme.fonts.weights.medium,
  },
  typingText: {
    fontFamily: 'Nunito-Regular',
    color: theme.colors.textSecondary,
    fontSize: theme.fonts.sizes.body,
  },
  optionsContainer: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    overflow: 'visible',
    paddingBottom: theme.spacing.huge, // padding ancora più grande
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    marginVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.medium,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.background,
  },
  optionButtonSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary + '10',
  },
  optionIcon: {
    fontSize: 24,
    marginRight: theme.spacing.md,
  },
  optionText: {
    flex: 1,
    fontFamily: 'Nunito-Regular',
    fontSize: theme.fonts.sizes.body,
    color: theme.colors.text,
  },
  optionTextSelected: {
    color: theme.colors.primary,
    fontWeight: theme.fonts.weights.medium,
  },
  confirmButton: {
    marginTop: theme.spacing.lg,
    borderRadius: theme.borderRadius.medium,
    overflow: 'hidden',
    zIndex: 10, // fix per visibilità su web
  },
  confirmButtonDisabled: {
    opacity: 0.5,
  },
  confirmButtonGradient: {
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontFamily: 'Nunito-Bold',
    fontSize: theme.fonts.sizes.body,
    fontWeight: theme.fonts.weights.bold,
    color: theme.colors.surface,
  },
  inputContainer: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  questionTitle: {
    fontSize: theme.fonts.sizes.body,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  optionsScroll: {
    paddingVertical: theme.spacing.sm,
    flexDirection: 'column',
    overflow: 'visible', // fix per mostrare il bottone
  },
  plannerButton: {
    marginTop: theme.spacing.lg,
    borderRadius: theme.borderRadius.medium,
    overflow: 'hidden',
  },
  plannerButtonGradient: {
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    flexDirection: 'row',
  },
  plannerButtonText: {
    fontFamily: 'Nunito-Bold',
    color: '#fff',
    fontWeight: theme.fonts.weights.bold,
    fontSize: theme.fonts.sizes.body,
    marginLeft: theme.spacing.sm,
  },
  confirmButtonContainer: {
    backgroundColor: theme.colors.surface,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
});

export default OnboardingChatScreen;
