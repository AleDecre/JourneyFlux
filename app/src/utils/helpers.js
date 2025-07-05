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
