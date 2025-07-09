import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  // User preferences from onboarding
  userPreferences: {
    duration: null, // in days
    interests: [],
    budget: null, // 'low', 'medium', 'high'
    travelStyle: null, // 'relaxed', 'active', 'mixed'
    selectedDates: [],
    selectedCity: null,
  },
  
  // Generated itinerary
  generatedItinerary: {
    id: null,
    title: null,
    days: [], // Array of day objects with planned activities
    totalEstimatedCost: 0,
    totalDuration: 0,
    generatedAt: null,
  },
  
  // Current trip status
  currentTrip: {
    isActive: false,
    startDate: null,
    currentDay: 0,
    completedSteps: [],
    inProgressSteps: [],
    remainingSteps: [],
    location: null, // Current mock location
  },
  
  // Trip history
  tripHistory: [],

  // Viaggi salvati manualmente dall’utente
  savedTrips: [
    {
      id: 1,
      titolo: "Weekend a Roma",
      sottotitolo: "Cultura • medium budget • arte, gastronomia",
      durata_giorni: 2,
      budget_totale: "€50-100/giorno",
      savedAt: new Date(),
      tappe: [
        { type: 'narrative', title: 'I Fantasmi di Castel Sant\'Angelo', descrizione: 'Percorso narrativo tra misteri e leggende.', orario: '09:00', luogo: 'Castel Sant\'Angelo' },
        { type: 'itinerary', title: 'Colazione tipica', descrizione: 'Cornetto e cappuccino in bar storico.', orario: '10:30', luogo: 'Bar del Cappuccino' },
        { type: 'partner', title: 'Aperitivo Segreto', descrizione: 'Degustazione esclusiva partner.', orario: '18:00', luogo: 'Bar del Fico' }
      ],
      preferences: {
        city: "Roma",
        duration: 2,
        interests: ["arte", "gastronomia"],
        budget: "medium",
        travelStyle: "mixed"
      }
    },
    {
      id: 2,
      titolo: "Avventura a Napoli",
      sottotitolo: "Avventura • low budget • natura, street food",
      durata_giorni: 3,
      budget_totale: "€20-50/giorno",
      savedAt: new Date(),
      tappe: [
        { type: 'itinerary', title: 'Tour dei Quartieri Spagnoli', descrizione: 'Passeggiata guidata tra i vicoli.', orario: '10:00', luogo: 'Quartieri Spagnoli' },
        { type: 'narrative', title: 'Il Tesoro di San Gennaro', descrizione: 'Percorso narrativo tra fede e mistero.', orario: '12:00', luogo: 'Duomo di Napoli' },
        { type: 'partner', title: 'Pizza Experience', descrizione: 'Degustazione partner: pizza napoletana.', orario: '13:30', luogo: 'Pizzeria Da Michele' }
      ],
      preferences: {
        city: "Napoli",
        duration: 3,
        interests: ["natura", "gastronomia"],
        budget: "low",
        travelStyle: "active"
      }
    }
  ],
  
  // UI state
  ui: {
    isGenerating: false,
    isOnboarding: false,
    error: null,
  }
};

// Action types
const ACTIONS = {
  SET_USER_PREFERENCES: 'SET_USER_PREFERENCES',
  UPDATE_PREFERENCES: 'UPDATE_PREFERENCES',
  SET_GENERATED_ITINERARY: 'SET_GENERATED_ITINERARY',
  START_TRIP: 'START_TRIP',
  COMPLETE_STEP: 'COMPLETE_STEP',
  UPDATE_LOCATION: 'UPDATE_LOCATION',
  END_TRIP: 'END_TRIP',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  RESET_CONTEXT: 'RESET_CONTEXT',
  SAVE_TRIP: 'SAVE_TRIP',
};

// Reducer function
const plannerReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_USER_PREFERENCES:
      return {
        ...state,
        userPreferences: { ...state.userPreferences, ...action.payload },
      };
    
    case ACTIONS.UPDATE_PREFERENCES:
      return {
        ...state,
        userPreferences: { ...state.userPreferences, ...action.payload },
      };
    
    case ACTIONS.SET_GENERATED_ITINERARY:
      return {
        ...state,
        generatedItinerary: action.payload,
        ui: { ...state.ui, isGenerating: false },
      };
    
    case ACTIONS.START_TRIP:
      return {
        ...state,
        currentTrip: {
          ...state.currentTrip,
          isActive: true,
          startDate: new Date(),
          currentDay: 0,
          completedSteps: [],
          inProgressSteps: [],
          remainingSteps: action.payload.steps || [],
        },
      };
    
    case ACTIONS.COMPLETE_STEP:
      const { stepId, points, badge, photo } = action.payload;
      const completedStep = {
        id: stepId,
        completedAt: new Date(),
        points,
        badge,
        photo,
      };
      
      return {
        ...state,
        currentTrip: {
          ...state.currentTrip,
          completedSteps: [...state.currentTrip.completedSteps, completedStep],
          remainingSteps: state.currentTrip.remainingSteps.filter(step => step.id !== stepId),
        },
      };
    
    case ACTIONS.UPDATE_LOCATION:
      return {
        ...state,
        currentTrip: {
          ...state.currentTrip,
          location: action.payload,
        },
      };
    
    case ACTIONS.END_TRIP:
      const completedTrip = {
        id: Date.now(),
        itinerary: state.generatedItinerary,
        completedSteps: state.currentTrip.completedSteps,
        startDate: state.currentTrip.startDate,
        endDate: new Date(),
        totalPoints: state.currentTrip.completedSteps.reduce((sum, step) => sum + (step.points || 0), 0),
        badges: state.currentTrip.completedSteps.map(step => step.badge).filter(Boolean),
      };
      
      return {
        ...state,
        currentTrip: {
          ...initialState.currentTrip,
        },
        tripHistory: [...state.tripHistory, completedTrip],
      };
    
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        ui: { ...state.ui, isGenerating: action.payload },
      };
    
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        ui: { ...state.ui, error: action.payload, isGenerating: false },
      };
    
    case ACTIONS.RESET_CONTEXT:
      return initialState;
    
    case ACTIONS.SAVE_TRIP:
      return {
        ...state,
        savedTrips: [
          ...state.savedTrips,
          {
            id: Date.now(),
            ...action.payload,
            savedAt: new Date(),
          },
        ],
      };
    
    default:
      return state;
  }
};

// Context
const PlannerContext = createContext();

// Provider component
export const PlannerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(plannerReducer, initialState);
  
  // Action creators
  const setUserPreferences = (preferences) => {
    dispatch({ type: ACTIONS.SET_USER_PREFERENCES, payload: preferences });
  };
  
  const updatePreferences = (updates) => {
    dispatch({ type: ACTIONS.UPDATE_PREFERENCES, payload: updates });
  };
  
  const setGeneratedItinerary = (itinerary) => {
    dispatch({ type: ACTIONS.SET_GENERATED_ITINERARY, payload: itinerary });
  };
  
  const startTrip = (steps) => {
    dispatch({ type: ACTIONS.START_TRIP, payload: { steps } });
  };
  
  const completeStep = (stepId, points, badge, photo) => {
    dispatch({ type: ACTIONS.COMPLETE_STEP, payload: { stepId, points, badge, photo } });
  };
  
  const updateLocation = (location) => {
    dispatch({ type: ACTIONS.UPDATE_LOCATION, payload: location });
  };
  
  const endTrip = () => {
    dispatch({ type: ACTIONS.END_TRIP });
  };
  
  const setLoading = (isLoading) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: isLoading });
  };
  
  const setError = (error) => {
    dispatch({ type: ACTIONS.SET_ERROR, payload: error });
  };
  
  const resetContext = () => {
    dispatch({ type: ACTIONS.RESET_CONTEXT });
  };

  // Salva viaggio manualmente
  const saveTrip = (trip) => {
    dispatch({ type: ACTIONS.SAVE_TRIP, payload: trip });
  };

  const value = {
    state,
    actions: {
      setUserPreferences,
      updatePreferences,
      setGeneratedItinerary,
      startTrip,
      completeStep,
      updateLocation,
      endTrip,
      setLoading,
      setError,
      resetContext,
      saveTrip, // aggiunto
    },
  };
  
  return (
    <PlannerContext.Provider value={value}>
      {children}
    </PlannerContext.Provider>
  );
};

// Custom hook to use the context
export const usePlanner = () => {
  const context = useContext(PlannerContext);
  if (!context) {
    throw new Error('usePlanner must be used within a PlannerProvider');
  }
  return context;
};

export default PlannerContext;
