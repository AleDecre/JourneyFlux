// Utility functions for JourneyFlux app
import { Alert } from 'react-native';

// Mock GPS location checker
export const checkGPSLocation = (targetLocation) => {
  return new Promise((resolve) => {
    // Simulate GPS check with random success/failure
    const isNearLocation = Math.random() > 0.3; // 70% chance of being near location
    
    setTimeout(() => {
      resolve({
        isNear: isNearLocation,
        distance: isNearLocation ? Math.floor(Math.random() * 50) : Math.floor(Math.random() * 500) + 100,
        accuracy: Math.floor(Math.random() * 20) + 5
      });
    }, 1000);
  });
};

// Mock photo validation
export const validatePhoto = (photoData) => {
  return new Promise((resolve) => {
    // Simulate AI photo validation
    const isValidPhoto = Math.random() > 0.2; // 80% chance of valid photo
    
    setTimeout(() => {
      resolve({
        isValid: isValidPhoto,
        confidence: isValidPhoto ? Math.random() * 0.3 + 0.7 : Math.random() * 0.5 + 0.1,
        detectedObjects: isValidPhoto ? ['landmark', 'building', 'food'] : ['unclear']
      });
    }, 1500);
  });
};

// Progress calculation utilities
export const calculateProgress = (completed, total) => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};

export const calculateLevel = (points) => {
  return Math.floor(points / 100) + 1;
};

export const getPointsToNextLevel = (points) => {
  const currentLevel = calculateLevel(points);
  const pointsForNextLevel = currentLevel * 100;
  return pointsForNextLevel - points;
};

// Challenge difficulty scoring
export const getDifficultyMultiplier = (difficulty) => {
  switch (difficulty.toLowerCase()) {
    case 'facile':
      return 1;
    case 'media':
      return 1.5;
    case 'difficile':
      return 2;
    case 'esperto':
      return 2.5;
    default:
      return 1;
  }
};

// Random encouragement messages
export const getEncouragementMessage = () => {
  const messages = [
    "Ottimo lavoro! Continua così! 🎉",
    "Sei un vero esploratore! 🗺️",
    "Ogni viaggio inizia con un passo! 👣",
    "Stai collezionando ricordi indimenticabili! 📸",
    "L'Italia ti aspetta! 🇮🇹",
    "Scopri tesori nascosti! 💎",
    "Vivi ogni momento! ⭐",
    "Condividi le tue avventure! 🌟",
    "Esplora con curiosità! 🔍",
    "Crea la tua storia di viaggio! 📖"
  ];
  
  return messages[Math.floor(Math.random() * messages.length)];
};

// Random tips for users
export const getTravelTip = () => {
  const tips = [
    "Prova sempre i prodotti locali per un'esperienza autentica! 🍕",
    "Interagisci con i locali per scoprire posti segreti! 🗣️",
    "Porta sempre con te una power bank per le foto! 🔋",
    "Visita i musei la mattina presto per evitare la folla! 🏛️",
    "Usa i trasporti pubblici per vivere come un locale! 🚇",
    "Tieni sempre un po' di contanti per i mercati! 💰",
    "Impara qualche parola in dialetto locale! 🗣️",
    "Fai pause frequenti per goderti il paesaggio! 🌅",
    "Documenta tutto ma vivi anche il momento! 📱",
    "Rispetta sempre i luoghi che visiti! 🌍"
  ];
  
  return tips[Math.floor(Math.random() * tips.length)];
};

// Share functionality mock
export const shareChallenge = (challenge) => {
  Alert.alert(
    "Condividi Sfida",
    `Vuoi condividere "${challenge.title}" sui social media?`,
    [
      { text: "Annulla", style: "cancel" },
      { text: "Instagram", onPress: () => console.log("Share to Instagram") },
      { text: "WhatsApp", onPress: () => console.log("Share to WhatsApp") }
    ]
  );
};

// Notification scheduling mock
export const scheduleNotification = (title, body, delay = 5000) => {
  setTimeout(() => {
    Alert.alert(title, body);
  }, delay);
};

// User streak calculation
export const calculateStreak = (completedDates) => {
  if (!completedDates || completedDates.length === 0) return 0;
  
  // Sort dates in descending order
  const sortedDates = completedDates.sort((a, b) => new Date(b) - new Date(a));
  
  let streak = 0;
  let currentDate = new Date();
  
  for (const dateStr of sortedDates) {
    const date = new Date(dateStr);
    const daysDiff = Math.floor((currentDate - date) / (1000 * 60 * 60 * 24));
    
    if (daysDiff <= streak + 1) {
      streak++;
      currentDate = date;
    } else {
      break;
    }
  }
  
  return streak;
};

// Distance calculation (mock)
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  
  return Math.round(distance * 100) / 100; // Round to 2 decimal places
};

// Format date utilities
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('it-IT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('it-IT', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Achievement unlock checker
export const checkAchievements = (userStats) => {
  const newAchievements = [];
  
  // Check for various achievements
  if (userStats.challengesCompleted >= 1 && userStats.challengesCompleted < 2) {
    newAchievements.push('Primo Esploratore');
  }
  
  if (userStats.challengesCompleted >= 5) {
    newAchievements.push('Viaggiatore Dedicato');
  }
  
  if (userStats.totalPoints >= 500) {
    newAchievements.push('Collezionista di Punti');
  }
  
  if (userStats.currentStreak >= 3) {
    newAchievements.push('Streak Champion');
  }
  
  return newAchievements;
};

// Mock weather data
export const getWeatherInfo = (city) => {
  const weatherConditions = ['sole', 'nuvole', 'pioggia', 'neve'];
  const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
  
  return {
    condition: randomWeather,
    temperature: Math.floor(Math.random() * 20) + 10,
    humidity: Math.floor(Math.random() * 40) + 40,
    description: `Condizioni ${randomWeather} a ${city}`
  };
};

// Mock AI itinerary generator
export const generateItinerary = (preferences) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { duration, selectedCity, interests, budget, travelStyle, selectedDates } = preferences;
      
      // Mock itinerary based on preferences
      const itinerary = {
        id: `itinerary_${Date.now()}`,
        title: generateItineraryTitle(selectedCity, interests),
        description: generateItineraryDescription(preferences),
        days: generateItineraryDays(preferences),
        totalEstimatedCost: calculateTotalCost(preferences),
        totalDuration: calculateTotalDuration(preferences),
        generatedAt: new Date().toISOString(),
        preferences: preferences,
      };
      
      resolve(itinerary);
    }, 2000); // Simulate AI processing time
  });
};

// Helper functions for itinerary generation
const generateItineraryTitle = (cityId, interests) => {
  const cityNames = {
    'roma': 'Roma',
    'napoli': 'Napoli',
    'firenze': 'Firenze',
    'milano': 'Milano',
    'venezia': 'Venezia',
  };
  
  const cityName = cityNames[cityId] || 'Italia';
  const primaryInterest = interests[0] || 'cultura';
  
  const titleTemplates = {
    cultura: ['Tesori nascosti di', 'Segreti culturali di', 'Meraviglie storiche di'],
    gastronomia: ['Sapori autentici di', 'Delizie culinarie di', 'Gusto tradizionale di'],
    arte: ['Capolavori artistici di', 'Arte e bellezza di', 'Creatività artistica di'],
    natura: ['Natura incontaminata di', 'Oasi verdi di', 'Bellezze naturali di'],
    avventura: ['Avventure urbane a', 'Esperienze uniche a', 'Scoperte emozionanti a'],
  };
  
  const templates = titleTemplates[primaryInterest] || titleTemplates.cultura;
  const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
  
  return `${randomTemplate} ${cityName}`;
};

const generateItineraryDescription = (preferences) => {
  const { duration, interests, budget, travelStyle } = preferences;
  
  const budgetLabels = {
    low: 'economico',
    medium: 'equilibrato',
    high: 'premium',
  };
  
  const styleLabels = {
    relaxed: 'rilassante',
    active: 'dinamico',
    mixed: 'bilanciato',
  };
  
  return `Un itinerario ${styleLabels[travelStyle]} di ${duration} ${duration === 1 ? 'giorno' : 'giorni'} con budget ${budgetLabels[budget]}, ` +
    `focalizzato su ${interests.join(', ')} e personalizzato per le tue preferenze.`;
};

const generateItineraryDays = (preferences) => {
  const { duration, selectedDates, interests, budget, travelStyle, selectedCity } = preferences;
  const days = [];
  
  for (let i = 0; i < duration; i++) {
    const dayDate = selectedDates[i] || new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    const day = {
      dayNumber: i + 1,
      date: dayDate,
      title: `Giorno ${i + 1}`,
      description: generateDayDescription(i + 1, preferences),
      steps: generateDaySteps(i + 1, preferences),
      estimatedCost: calculateDayCost(preferences),
      estimatedDuration: calculateDayDuration(preferences),
    };
    
    days.push(day);
  }
  
  return days;
};

const generateDayDescription = (dayNumber, preferences) => {
  const { interests, travelStyle } = preferences;
  
  if (dayNumber === 1) {
    return `Inizia la tua avventura con ${interests[0]} e scopri i primi segreti della città`;
  } else if (dayNumber === preferences.duration) {
    return `Concludi il tuo viaggio con esperienze memorabili e ricordi indimenticabili`;
  } else {
    return `Continua l'esplorazione con ${interests[dayNumber % interests.length]} e nuove scoperte`;
  }
};

const generateDaySteps = (dayNumber, preferences) => {
  const { interests, budget, travelStyle, selectedCity } = preferences;
  
  // Mock step templates based on interests
  const stepTemplates = {
    cultura: [
      {
        title: 'Visita al Museo Archeologico',
        description: 'Scopri antichi tesori e reperti storici',
        type: 'narrative',
        estimatedTime: '90 min',
        estimatedCost: budget === 'low' ? 8 : budget === 'medium' ? 12 : 18,
        coordinates: { lat: 41.9028, lng: 12.4964 },
      },
      {
        title: 'Palazzo Storico Nascosto',
        description: 'Esplora un palazzo ricco di storia e leggende',
        type: 'narrative',
        estimatedTime: '60 min',
        estimatedCost: budget === 'low' ? 5 : budget === 'medium' ? 8 : 12,
        coordinates: { lat: 41.9016, lng: 12.4667 },
      },
    ],
    gastronomia: [
      {
        title: 'Degustazione di Specialità Locali',
        description: 'Assaggia i piatti tipici della tradizione',
        type: 'partner',
        estimatedTime: '45 min',
        estimatedCost: budget === 'low' ? 12 : budget === 'medium' ? 18 : 25,
        coordinates: { lat: 41.8986, lng: 12.4768 },
      },
      {
        title: 'Mercato Tradizionale',
        description: 'Scopri i prodotti freschi e le specialità locali',
        type: 'itinerary',
        estimatedTime: '30 min',
        estimatedCost: budget === 'low' ? 5 : budget === 'medium' ? 8 : 12,
        coordinates: { lat: 41.9003, lng: 12.4731 },
      },
    ],
    arte: [
      {
        title: 'Galleria d\'Arte Contemporanea',
        description: 'Ammira opere d\'arte moderne e contemporanee',
        type: 'narrative',
        estimatedTime: '75 min',
        estimatedCost: budget === 'low' ? 10 : budget === 'medium' ? 15 : 20,
        coordinates: { lat: 41.9009, lng: 12.4833 },
      },
      {
        title: 'Atelier dell\'Artista Locale',
        description: 'Incontra un artista locale e scopri le sue opere',
        type: 'partner',
        estimatedTime: '45 min',
        estimatedCost: budget === 'low' ? 8 : budget === 'medium' ? 12 : 18,
        coordinates: { lat: 41.8943, lng: 12.4934 },
      },
    ],
    natura: [
      {
        title: 'Parco Nascosto nel Centro',
        description: 'Rilassati in un\'oasi verde lontana dal caos',
        type: 'itinerary',
        estimatedTime: '60 min',
        estimatedCost: 0,
        coordinates: { lat: 41.9016, lng: 12.4823 },
      },
      {
        title: 'Giardino Botanico Segreto',
        description: 'Esplora piante rare e angoli nascosti',
        type: 'narrative',
        estimatedTime: '90 min',
        estimatedCost: budget === 'low' ? 5 : budget === 'medium' ? 8 : 12,
        coordinates: { lat: 41.8919, lng: 12.4863 },
      },
    ],
  };
  
  const steps = [];
  const stepsPerDay = travelStyle === 'relaxed' ? 2 : travelStyle === 'active' ? 4 : 3;
  
  for (let i = 0; i < stepsPerDay; i++) {
    const interestIndex = (i + dayNumber - 1) % interests.length;
    const interest = interests[interestIndex];
    const templates = stepTemplates[interest] || stepTemplates.cultura;
    const template = templates[i % templates.length];
    
    const step = {
      id: `step_${dayNumber}_${i + 1}`,
      ...template,
      title: `${template.title} ${dayNumber}.${i + 1}`,
      order: i + 1,
      points: calculateStepPoints(template.type, budget),
      badge: generateStepBadge(template.type, interest),
      tags: [interest, budget, travelStyle],
      location: generateStepLocation(selectedCity, template.coordinates),
    };
    
    steps.push(step);
  }
  
  return steps;
};

const calculateStepPoints = (type, budget) => {
  const basePoints = {
    narrative: 150,
    partner: 100,
    itinerary: 120,
    custom: 80,
  };
  
  const budgetMultiplier = {
    low: 1.0,
    medium: 1.2,
    high: 1.5,
  };
  
  return Math.round(basePoints[type] * budgetMultiplier[budget]);
};

const generateStepBadge = (type, interest) => {
  const badges = {
    narrative: {
      cultura: 'Esploratore Culturale',
      gastronomia: 'Maestro del Gusto',
      arte: 'Connoisseur d\'Arte',
      natura: 'Guardiano Verde',
      avventura: 'Avventuriero Urbano',
    },
    partner: {
      cultura: 'Amico dei Locali',
      gastronomia: 'Gourmet Locale',
      arte: 'Collezionista d\'Arte',
      natura: 'Eco-Esploratore',
      avventura: 'Scopritore di Gemme',
    },
    itinerary: {
      cultura: 'Viaggiatore Esperto',
      gastronomia: 'Foodie Autentico',
      arte: 'Critico d\'Arte',
      natura: 'Amante della Natura',
      avventura: 'Esploratore Coraggioso',
    },
  };
  
  return badges[type]?.[interest] || 'Esploratore';
};

const generateStepLocation = (cityId, coordinates) => {
  const cityNames = {
    'roma': 'Roma',
    'napoli': 'Napoli',
    'firenze': 'Firenze',
    'milano': 'Milano',
    'venezia': 'Venezia',
  };
  
  return `${cityNames[cityId] || 'Italia'} - Centro Storico`;
};

const calculateDayCost = (preferences) => {
  const { budget, travelStyle } = preferences;
  
  const baseCosts = {
    low: 25,
    medium: 45,
    high: 75,
  };
  
  const styleMultiplier = {
    relaxed: 0.8,
    active: 1.2,
    mixed: 1.0,
  };
  
  return Math.round(baseCosts[budget] * styleMultiplier[travelStyle]);
};

const calculateDayDuration = (preferences) => {
  const { travelStyle } = preferences;
  
  const baseDurations = {
    relaxed: 180, // 3 hours
    active: 300, // 5 hours
    mixed: 240, // 4 hours
  };
  
  return baseDurations[travelStyle];
};

const calculateTotalCost = (preferences) => {
  const { duration } = preferences;
  const dayCost = calculateDayCost(preferences);
  return dayCost * duration;
};

const calculateTotalDuration = (preferences) => {
  const { duration } = preferences;
  const dayDuration = calculateDayDuration(preferences);
  return dayDuration * duration;
};
