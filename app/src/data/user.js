// User Profile Data Esteso per JourneyFlux MVP 2.0
// Include nuove statistiche per percorsi narrativi, itinerari e partner experiences

import { STATS_TYPES, USER_LEVELS, getUserLevel } from './contentTypes.js';
import { calculateBadgeStats } from './badges.js';

// 👤 PROFILO UTENTE ESTESO
export const userData = {
  id: 1,
  username: "MarcoDiViaggio",
  email: "marco@journeyflux.com",
  profileImage: "👤",
  joinDate: "2025-05-01",
  age: 28,
  
  // 📊 STATISTICHE COMPLETE
  stats: {
    // Statistiche generali
    totalPoints: 450,
    storyPoints: 85, // Nuova tipologia punti per narrativa
    
    // Legacy (per compatibilità)
    challengesCompleted: 1,
    challengesTotal: 6,
    
    // Nuove statistiche principali
    narrativePathsCompleted: 0,
    narrativePathsTotal: 6,
    itinerariesFollowed: 0,
    itinerariesTotal: 5,
    partnersVisited: 0,
    partnersTotal: 5,
    
    // Badge
    badgesEarned: 2,
    badgesTotal: 21, // Aggiornato con nuovi badge
    badgesByType: {
      narrativo: 0,
      partner: 0,
      community: 0,
      legacy: 2
    },
    
    // Geografia
    citiesVisited: 1,
    citiesTotal: 5,
    
    // Streaks
    currentStreak: 1,
    longestStreak: 3,
    
    // Social
    socialShares: 2,
    totalFollowers: 0,
    totalFollowing: 0,
    
    // Tempo
    totalTimeSpent: 180, // minuti
    averageSessionTime: 45, // minuti
    
    // Completamento
    overallProgress: 8 // percentuale
  },
  
  // 🎯 PROGRESSI DETTAGLIATI
  progress: {
    // Percorsi narrativi completati
    completedNarrativePaths: [],
    // Itinerari seguiti
    followedItineraries: [],
    // Partner visitati
    visitedPartners: [],
    // Badge ottenuti
    earnedBadges: [1, 2], // ID badge legacy earned
    // Contenuti preferiti
    savedContent: [],
    // Contenuti condivisi
    sharedContent: []
  },
  
  // ⚙️ PREFERENZE ESTESE
  preferences: {
    favoriteCategories: ["Gastronomia", "Cultura"],
    difficulty: "Media",
    notifications: true,
    language: "it",
    
    // Nuove preferenze
    contentTypes: {
      narrativePaths: true,
      communityItineraries: true,
      premiumItineraries: false,
      partnerExperiences: true
    },
    
    // Preferenze geografiche
    preferredCities: ["Roma", "Napoli"],
    travelRadius: 50, // km
    
    // Preferenze social
    privateProfile: false,
    allowReviews: true,
    shareProgress: true
  },
  
  // 🎫 COUPON E LOYALTY - NUOVO
  couponsEarned: [
    {
      id: 1,
      title: "Sconto 20% - Bar del Fico",
      description: "Aperitivo gratuito con ogni piatto principale",
      partnerId: 1,
      discountValue: 20,
      discountType: "percentage", // percentage | fixed
      validFrom: "2025-07-01",
      validUntil: "2025-08-31",
      used: false,
      usedDate: null,
      code: "FLUX20BAR",
      category: "aperitivo",
      minTripsRequired: 3,
      earnedDate: "2025-07-08",
    },
    {
      id: 2,
      title: "Colazione Omaggio - Caffè Centrale",
      description: "Cornetto e cappuccino gratuiti",
      partnerId: 3,
      discountValue: 8,
      discountType: "fixed",
      validFrom: "2025-07-01",
      validUntil: "2025-09-30",
      used: true,
      usedDate: "2025-07-08",
      code: "FLUX8CAFFE",
      category: "colazione",
      minTripsRequired: 2,
      earnedDate: "2025-06-15",
    }
  ],
  
  // 🏆 LOYALTY PROGRESS
  loyaltyProgress: {
    currentLevel: 1,
    tripsCompleted: 1,
    tripsToNextLevel: 2,
    nextLevelRewards: [
      "Sconto 15% partner selezionati",
      "Accesso anticipato a nuovi percorsi",
      "Badge esclusivo 'Esploratore Fedele'"
    ],
    levelBenefits: {
      1: ["Accesso base", "Coupon standard"],
      2: ["Sconti premium", "Contenuti esclusivi"],
      3: ["VIP access", "Sconti maggiori", "Eventi speciali"],
      4: ["Ambassador benefits", "Coinvolgimento nella creazione"],
      5: ["Legend status", "Massimi benefici"]
    }
  },
  
  // 📍 LOCALIZZAZIONE
  location: {
    currentCity: "Milano",
    homeCity: "Roma",
    currentCoordinates: {
      lat: 45.4642,
      lng: 9.1900
    },
    lastKnownLocation: {
      lat: 45.4642,
      lng: 9.1900,
      timestamp: "2025-07-06T10:00:00Z"
    }
  },
  
  // 🏆 ACHIEVEMENTS ESTESI
  achievements: [
    {
      id: 1,
      title: "Prima Sfida Completata",
      date: "2025-06-15",
      description: "Hai completato la tua prima sfida di viaggio!",
      type: "milestone",
      icon: "🌟"
    },
    {
      id: 2,
      title: "Primo Badge Ottenuto",
      date: "2025-06-15",
      description: "Hai ottenuto il tuo primo badge!",
      type: "badge",
      icon: "🏆"
    }
  ],
  
  // 📅 CRONOLOGIA ATTIVITÀ
  activityHistory: [
    {
      id: 1,
      date: "2025-06-15",
      type: "challenge_completed",
      contentId: "legacy_challenge_1",
      pointsEarned: 150,
      badgeEarned: "Maestro dell'Aperitivo"
    },
    {
      id: 2,
      date: "2025-06-10",
      type: "badge_earned",
      contentId: "badge_primo_esploratore",
      pointsEarned: 50,
      badgeEarned: "Primo Esploratore"
    }
  ]
};

// 🔧 FUNZIONI HELPER ESTESE

/**
 * Ottiene statistiche utente complete
 * @returns {Object} Statistiche complete
 */
export const getUserStats = () => {
  return userData.stats;
};

/**
 * Ottiene profilo utente completo
 * @returns {Object} Profilo utente
 */
export const getUserProfile = () => {
  return userData;
};

/**
 * Aggiorna punti utente
 * @param {number} points - Punti da aggiungere
 * @param {string} type - Tipo punti ('regular' o 'story')
 * @returns {number} Punti totali aggiornati
 */
export const updateUserPoints = (points, type = 'regular') => {
  if (type === 'story') {
    userData.stats.storyPoints += points;
  } else {
    userData.stats.totalPoints += points;
  }
  
  // Aggiorna livello utente
  updateUserLevel();
  
  return userData.stats.totalPoints;
};

/**
 * Completa percorso narrativo
 * @param {string} pathId - ID del percorso
 * @param {number} points - Punti ottenuti
 * @param {string} badgeId - ID badge ottenuto
 */
export const completeNarrativePath = (pathId, points = 0, badgeId = null) => {
  userData.stats.narrativePathsCompleted += 1;
  userData.progress.completedNarrativePaths.push(pathId);
  
  if (points > 0) {
    updateUserPoints(points);
  }
  
  if (badgeId) {
    earnBadge(badgeId);
  }
  
  updateStreak();
  addActivity('narrative_path_completed', pathId, points, badgeId);
};

/**
 * Segue itinerario
 * @param {string} itineraryId - ID dell'itinerario
 * @param {number} points - Punti ottenuti
 * @param {string} badgeId - ID badge ottenuto
 */
export const followItinerary = (itineraryId, points = 0, badgeId = null) => {
  userData.stats.itinerariesFollowed += 1;
  userData.progress.followedItineraries.push(itineraryId);
  
  if (points > 0) {
    updateUserPoints(points);
  }
  
  if (badgeId) {
    earnBadge(badgeId);
  }
  
  updateStreak();
  addActivity('itinerary_followed', itineraryId, points, badgeId);
};

/**
 * Visita partner
 * @param {string} partnerId - ID del partner
 * @param {number} points - Punti ottenuti
 * @param {string} badgeId - ID badge ottenuto
 */
export const visitPartner = (partnerId, points = 0, badgeId = null) => {
  userData.stats.partnersVisited += 1;
  userData.progress.visitedPartners.push(partnerId);
  
  if (points > 0) {
    updateUserPoints(points);
  }
  
  if (badgeId) {
    earnBadge(badgeId);
  }
  
  updateStreak();
  addActivity('partner_visited', partnerId, points, badgeId);
};

/**
 * Ottiene badge
 * @param {string} badgeId - ID del badge
 */
export const earnBadge = (badgeId) => {
  if (!userData.progress.earnedBadges.includes(badgeId)) {
    userData.progress.earnedBadges.push(badgeId);
    userData.stats.badgesEarned += 1;
    
    // Aggiorna statistiche badge per tipo
    updateBadgeTypeStats();
    
    addActivity('badge_earned', badgeId, 0, badgeId);
  }
};

/**
 * Aggiorna statistiche badge per tipo
 */
export const updateBadgeTypeStats = () => {
  const badgeStats = calculateBadgeStats(userData.progress.earnedBadges);
  userData.stats.badgesByType = {
    narrativo: badgeStats.byType.narrativo.earned,
    partner: badgeStats.byType.partner.earned,
    community: badgeStats.byType.community.earned,
    legacy: badgeStats.byType.legacy.earned
  };
};

/**
 * Aggiorna streak utente
 */
export const updateStreak = () => {
  userData.stats.currentStreak += 1;
  if (userData.stats.currentStreak > userData.stats.longestStreak) {
    userData.stats.longestStreak = userData.stats.currentStreak;
  }
};

/**
 * Aggiorna livello utente
 */
export const updateUserLevel = () => {
  const totalPoints = userData.stats.totalPoints + userData.stats.storyPoints;
  userData.level = getUserLevel(totalPoints);
};

/**
 * Aggiunge attività alla cronologia
 * @param {string} type - Tipo attività
 * @param {string} contentId - ID contenuto
 * @param {number} points - Punti ottenuti
 * @param {string} badge - Badge ottenuto
 */
export const addActivity = (type, contentId, points = 0, badge = null) => {
  const activity = {
    id: userData.activityHistory.length + 1,
    date: new Date().toISOString().split('T')[0],
    type,
    contentId,
    pointsEarned: points,
    badgeEarned: badge
  };
  
  userData.activityHistory.unshift(activity); // Aggiungi in testa
  
  // Mantieni solo le ultime 50 attività
  if (userData.activityHistory.length > 50) {
    userData.activityHistory = userData.activityHistory.slice(0, 50);
  }
};

/**
 * Ottiene statistiche progressive utente
 * @returns {Object} Statistiche progressive
 */
export const getProgressStats = () => {
  const totalContent = userData.stats.narrativePathsTotal + 
                      userData.stats.itinerariesTotal + 
                      userData.stats.partnersTotal;
  
  const completedContent = userData.stats.narrativePathsCompleted + 
                          userData.stats.itinerariesFollowed + 
                          userData.stats.partnersVisited;
  
  return {
    totalContent,
    completedContent,
    progressPercentage: Math.round((completedContent / totalContent) * 100),
    
    // Dettagli per tipo
    narrativePaths: {
      completed: userData.stats.narrativePathsCompleted,
      total: userData.stats.narrativePathsTotal,
      percentage: Math.round((userData.stats.narrativePathsCompleted / userData.stats.narrativePathsTotal) * 100)
    },
    
    itineraries: {
      completed: userData.stats.itinerariesFollowed,
      total: userData.stats.itinerariesTotal,
      percentage: Math.round((userData.stats.itinerariesFollowed / userData.stats.itinerariesTotal) * 100)
    },
    
    partners: {
      completed: userData.stats.partnersVisited,
      total: userData.stats.partnersTotal,
      percentage: Math.round((userData.stats.partnersVisited / userData.stats.partnersTotal) * 100)
    }
  };
};

/**
 * Ottiene statistiche complete per display
 * @returns {Object} Statistiche per UI
 */
export const getDisplayStats = () => {
  updateUserLevel();
  updateBadgeTypeStats();
  
  return {
    ...userData.stats,
    level: userData.level,
    progressStats: getProgressStats(),
    recentActivity: userData.activityHistory.slice(0, 5)
  };
};

/**
 * Completa sfida legacy (per compatibilità)
 */
export const completeChallenge = () => {
  userData.stats.challengesCompleted += 1;
  updateStreak();
  addActivity('legacy_challenge_completed', 'legacy_challenge', 100);
};

// Inizializza livello utente
updateUserLevel();

export default {
  userData,
  getUserStats,
  getUserProfile,
  updateUserPoints,
  completeNarrativePath,
  followItinerary,
  visitPartner,
  earnBadge,
  updateBadgeTypeStats,
  updateStreak,
  updateUserLevel,
  addActivity,
  getProgressStats,
  getDisplayStats,
  completeChallenge
};
