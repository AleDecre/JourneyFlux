// Badge System Esteso per JourneyFlux MVP 2.0
// Integra badge narrativi, partner e community

import { BADGE_TYPES, CONTENT_TYPES } from './contentTypes.js';

// 🏆 BADGE NARRATIVI - Per percorsi narrativi completati
const narrativeBadges = [
  {
    id: 'badge_cacciatore_fantasmi',
    name: 'Cacciatore di Fantasmi',
    description: 'Hai svelato i segreti di Castel Sant\'Angelo',
    icon: '👻',
    color: '#8B5CF6',
    type: BADGE_TYPES.NARRATIVO,
    relatedContent: 'np_roma_fantasmi_castel',
    earned: false,
    earnedDate: null,
    rarity: 'comune',
    points: 250,
    category: 'mistero'
  },
  {
    id: 'badge_alchimista_pantheon',
    name: 'Alchimista del Pantheon',
    description: 'Hai decifrato i simboli alchemici del Pantheon',
    icon: '⚗️',
    color: '#A78BFA',
    type: BADGE_TYPES.NARRATIVO,
    relatedContent: 'np_roma_alchimia_pantheon',
    earned: false,
    earnedDate: null,
    rarity: 'raro',
    points: 300,
    category: 'mistero'
  },
  {
    id: 'badge_custode_appia',
    name: 'Custode della Via Appia',
    description: 'Hai camminato con gli spiriti dell\'antica Roma',
    icon: '🛤️',
    color: '#F59E0B',
    type: BADGE_TYPES.NARRATIVO,
    relatedContent: 'np_roma_via_appia_spiriti',
    earned: false,
    earnedDate: null,
    rarity: 'comune',
    points: 280,
    category: 'leggenda'
  },
  {
    id: 'badge_custode_sangue',
    name: 'Custode del Sangue Sacro',
    description: 'Hai svelato i misteri di San Gennaro',
    icon: '🩸',
    color: '#EF4444',
    type: BADGE_TYPES.NARRATIVO,
    relatedContent: 'np_napoli_sangue_gennaro',
    earned: false,
    earnedDate: null,
    rarity: 'epico',
    points: 270,
    category: 'mistero'
  },
  {
    id: 'badge_cantore_sirene',
    name: 'Cantore delle Sirene',
    description: 'Hai seguito le tracce di Partenope',
    icon: '🧜‍♀️',
    color: '#06B6D4',
    type: BADGE_TYPES.NARRATIVO,
    relatedContent: 'np_napoli_sirene_partenope',
    earned: false,
    earnedDate: null,
    rarity: 'comune',
    points: 220,
    category: 'leggenda'
  },
  {
    id: 'badge_pizzaiolo_rivoluzionario',
    name: 'Pizzaiolo Rivoluzionario',
    description: 'Hai scoperto il complotto della Pizza Margherita',
    icon: '🍕',
    color: '#10B981',
    type: BADGE_TYPES.NARRATIVO,
    relatedContent: 'np_napoli_pizza_margherita_complotto',
    earned: false,
    earnedDate: null,
    rarity: 'raro',
    points: 240,
    category: 'gastronomia'
  }
];

// 🍷 BADGE PARTNER - Per esperienze partner completate
const partnerBadges = [
  {
    id: 'badge_alchimista_aperitivo',
    name: 'Alchimista dell\'Aperitivo',
    description: 'Hai bevuto l\'Aperitivo dell\'Alchimista al Bar del Fico',
    icon: '🍸',
    color: '#F59E0B',
    type: BADGE_TYPES.PARTNER,
    relatedContent: 'pe_roma_bar_fico_alchimista',
    partnerName: 'Bar del Fico',
    earned: false,
    earnedDate: null,
    rarity: 'comune',
    points: 75,
    category: 'aperitivo'
  },
  {
    id: 'badge_custode_tradizioni',
    name: 'Custode delle Tradizioni',
    description: 'Hai assaggiato il vero Quinto Quarto da Checchino',
    icon: '🍝',
    color: '#EF4444',
    type: BADGE_TYPES.PARTNER,
    relatedContent: 'pe_roma_checchino_quinto_quarto',
    partnerName: 'Checchino dal 1887',
    earned: false,
    earnedDate: null,
    rarity: 'raro',
    points: 100,
    category: 'gastronomia'
  },
  {
    id: 'badge_cacciatore_libri',
    name: 'Cacciatore di Libri',
    description: 'Hai trovato il libro perduto in libreria',
    icon: '📚',
    color: '#8B5CF6',
    type: BADGE_TYPES.PARTNER,
    relatedContent: 'pe_roma_polvere_tempo_libreria',
    partnerName: 'Polvere di Tempo',
    earned: false,
    earnedDate: null,
    rarity: 'comune',
    points: 60,
    category: 'cultura'
  },
  {
    id: 'badge_custode_segreto_pizza',
    name: 'Custode del Segreto',
    description: 'Hai mangiato la Pizza del Segreto da Sorbillo',
    icon: '🍕',
    color: '#10B981',
    type: BADGE_TYPES.PARTNER,
    relatedContent: 'pe_napoli_sorbillo_pizza_segreto',
    partnerName: 'Pizzeria Gino Sorbillo',
    earned: false,
    earnedDate: null,
    rarity: 'raro',
    points: 80,
    category: 'gastronomia'
  },
  {
    id: 'badge_alchimista_cioccolato',
    name: 'Alchimista del Cioccolato',
    description: 'Hai creato il tuo cioccolato da Gay-Odin',
    icon: '🍫',
    color: '#A78BFA',
    type: BADGE_TYPES.PARTNER,
    relatedContent: 'pe_napoli_gay_odin_cioccolato_alchimia',
    partnerName: 'Gay-Odin',
    earned: false,
    earnedDate: null,
    rarity: 'epico',
    points: 120,
    category: 'workshop'
  }
];

// 👥 BADGE COMMUNITY - Per itinerari community seguiti
const communityBadges = [
  {
    id: 'badge_local_explorer_roma',
    name: 'Esploratore Local Roma',
    description: 'Hai seguito l\'itinerario segreto di Marco',
    icon: '🏛️',
    color: '#3B82F6',
    type: BADGE_TYPES.COMMUNITY,
    relatedContent: 'it_roma_local_marco',
    creatorName: 'Marco Romano',
    earned: false,
    earnedDate: null,
    rarity: 'comune',
    points: 150,
    category: 'itinerario'
  },
  {
    id: 'badge_local_explorer_napoli',
    name: 'Esploratore Local Napoli',
    description: 'Hai vissuto la Napoli autentica con Sofia',
    icon: '🍕',
    color: '#EF4444',
    type: BADGE_TYPES.COMMUNITY,
    relatedContent: 'it_napoli_local_sofia',
    creatorName: 'Sofia Esposito',
    earned: false,
    earnedDate: null,
    rarity: 'comune',
    points: 160,
    category: 'itinerario'
  },
  {
    id: 'badge_rinascimento_segreto',
    name: 'Custode del Rinascimento',
    description: 'Hai scoperto la Firenze segreta con Alessandro',
    icon: '🎨',
    color: '#F472B6',
    type: BADGE_TYPES.COMMUNITY,
    relatedContent: 'it_firenze_local_alessandro',
    creatorName: 'Alessandro Medici',
    earned: false,
    earnedDate: null,
    rarity: 'raro',
    points: 180,
    category: 'itinerario'
  },
  {
    id: 'badge_gladiatore_vip',
    name: 'Gladiatore VIP',
    description: 'Hai vissuto l\'esperienza gladiatori premium',
    icon: '⚔️',
    color: '#DC2626',
    type: BADGE_TYPES.COMMUNITY,
    relatedContent: 'it_roma_premium_gladiatori',
    creatorName: 'Roman Experiences',
    earned: false,
    earnedDate: null,
    rarity: 'leggendario',
    points: 300,
    category: 'premium'
  },
  {
    id: 'badge_underground_explorer',
    name: 'Esploratore Sotterraneo',
    description: 'Hai esplorato i tunnel segreti di Napoli',
    icon: '🕳️',
    color: '#6B7280',
    type: BADGE_TYPES.COMMUNITY,
    relatedContent: 'it_napoli_premium_underground',
    creatorName: 'Naples Underground',
    earned: false,
    earnedDate: null,
    rarity: 'leggendario',
    points: 250,
    category: 'premium'
  }
];

// 🌟 BADGE LEGACY - Badge esistenti (per compatibilità)
const legacyBadges = [
  {
    id: 1,
    name: "Maestro dell'Aperitivo",
    description: "Completato il tour aperitivo romano",
    icon: "🍸",
    color: "#FF6B6B",
    type: BADGE_TYPES.LEGACY,
    earned: true,
    earnedDate: "2025-06-15",
    rarity: 'comune',
    points: 100,
    category: 'legacy'
  },
  {
    id: 2,
    name: "Primo Esploratore",
    description: "Completata la prima sfida di viaggio",
    icon: "🌟",
    color: "#4ECDC4",
    type: BADGE_TYPES.LEGACY,
    earned: true,
    earnedDate: "2025-06-10",
    rarity: 'comune',
    points: 50,
    category: 'legacy'
  },
  {
    id: 3,
    name: "Maestro della Sfogliatella",
    description: "Esperto di dolci napoletani",
    icon: "🥐",
    color: "#45B7D1",
    type: BADGE_TYPES.LEGACY,
    earned: false,
    earnedDate: null,
    rarity: 'comune',
    points: 100,
    category: 'legacy'
  },
  {
    id: 4,
    name: "Esploratore del Duomo",
    description: "Svelati i segreti del Duomo di Milano",
    icon: "🏰",
    color: "#FFA07A",
    type: BADGE_TYPES.LEGACY,
    earned: false,
    earnedDate: null,
    rarity: 'comune',
    points: 120,
    category: 'legacy'
  },
  {
    id: 5,
    name: "Scopritore di Borghi",
    description: "Maestro dell'esplorazione rurale",
    icon: "🏔️",
    color: "#98D8C8",
    type: BADGE_TYPES.LEGACY,
    earned: false,
    earnedDate: null,
    rarity: 'comune',
    points: 150,
    category: 'legacy'
  },
  {
    id: 6,
    name: "Cacciatore di Street Art",
    description: "Esperto di arte urbana",
    icon: "🎨",
    color: "#F06292",
    type: BADGE_TYPES.LEGACY,
    earned: false,
    earnedDate: null,
    rarity: 'comune',
    points: 80,
    category: 'legacy'
  },
  {
    id: 7,
    name: "Maestro del Gelato",
    description: "Intenditore di gelato artigianale",
    icon: "🍦",
    color: "#FFB74D",
    type: BADGE_TYPES.LEGACY,
    earned: false,
    earnedDate: null,
    rarity: 'comune',
    points: 90,
    category: 'legacy'
  },
  {
    id: 8,
    name: "Viaggiatore Dedicato",
    description: "Completate 5 sfide di viaggio",
    icon: "🎒",
    color: "#9C27B0",
    type: BADGE_TYPES.LEGACY,
    earned: false,
    earnedDate: null,
    rarity: 'raro',
    points: 200,
    category: 'legacy'
  }
];

// 🏆 ARRAY COMPLETO BADGES
export const badges = [
  ...narrativeBadges,
  ...partnerBadges,
  ...communityBadges,
  ...legacyBadges
];

// 🔧 FUNZIONI HELPER ESTESE

/**
 * Ottiene tutti i badge earned
 * @returns {Array} Badge ottenuti
 */
export const getEarnedBadges = () => {
  return badges.filter(badge => badge.earned);
};

/**
 * Ottiene tutti i badge disponibili (non earned)
 * @returns {Array} Badge disponibili
 */
export const getAvailableBadges = () => {
  return badges.filter(badge => !badge.earned);
};

/**
 * Ottiene badge per ID
 * @param {string|number} id - ID del badge
 * @returns {Object|null} Badge o null
 */
export const getBadgeById = (id) => {
  return badges.find(badge => badge.id === id) || null;
};

/**
 * Ottiene badge per tipo
 * @param {string} type - Tipo badge (narrativo, partner, community, legacy)
 * @returns {Array} Badge del tipo specificato
 */
export const getBadgesByType = (type) => {
  return badges.filter(badge => badge.type === type);
};

/**
 * Ottiene badge narrativi
 * @returns {Array} Badge narrativi
 */
export const getNarrativeBadges = () => {
  return getBadgesByType(BADGE_TYPES.NARRATIVO);
};

/**
 * Ottiene badge partner
 * @returns {Array} Badge partner
 */
export const getPartnerBadges = () => {
  return getBadgesByType(BADGE_TYPES.PARTNER);
};

/**
 * Ottiene badge community
 * @returns {Array} Badge community
 */
export const getCommunityBadges = () => {
  return getBadgesByType(BADGE_TYPES.COMMUNITY);
};

/**
 * Ottiene badge legacy
 * @returns {Array} Badge legacy
 */
export const getLegacyBadges = () => {
  return getBadgesByType(BADGE_TYPES.LEGACY);
};

/**
 * Ottiene badge per categoria
 * @param {string} category - Categoria badge
 * @returns {Array} Badge della categoria
 */
export const getBadgesByCategory = (category) => {
  return badges.filter(badge => badge.category === category);
};

/**
 * Ottiene badge per rarità
 * @param {string} rarity - Rarità (comune, raro, epico, leggendario)
 * @returns {Array} Badge della rarità specificata
 */
export const getBadgesByRarity = (rarity) => {
  return badges.filter(badge => badge.rarity === rarity);
};

/**
 * Ottiene badge correlato a un contenuto
 * @param {string} contentId - ID del contenuto
 * @returns {Object|null} Badge correlato o null
 */
export const getBadgeByContent = (contentId) => {
  return badges.find(badge => badge.relatedContent === contentId) || null;
};

/**
 * Calcola statistiche badge utente
 * @param {Array} earnedBadgeIds - Array di ID badge ottenuti
 * @returns {Object} Statistiche badge
 */
export const calculateBadgeStats = (earnedBadgeIds = []) => {
  const earnedBadges = badges.filter(badge => earnedBadgeIds.includes(badge.id));
  
  return {
    total: badges.length,
    earned: earnedBadges.length,
    available: badges.length - earnedBadges.length,
    completionPercentage: Math.round((earnedBadges.length / badges.length) * 100),
    
    // Per tipo
    byType: {
      narrativo: {
        earned: earnedBadges.filter(b => b.type === BADGE_TYPES.NARRATIVO).length,
        total: getBadgesByType(BADGE_TYPES.NARRATIVO).length
      },
      partner: {
        earned: earnedBadges.filter(b => b.type === BADGE_TYPES.PARTNER).length,
        total: getBadgesByType(BADGE_TYPES.PARTNER).length
      },
      community: {
        earned: earnedBadges.filter(b => b.type === BADGE_TYPES.COMMUNITY).length,
        total: getBadgesByType(BADGE_TYPES.COMMUNITY).length
      },
      legacy: {
        earned: earnedBadges.filter(b => b.type === BADGE_TYPES.LEGACY).length,
        total: getBadgesByType(BADGE_TYPES.LEGACY).length
      }
    },
    
    // Per rarità
    byRarity: {
      comune: earnedBadges.filter(b => b.rarity === 'comune').length,
      raro: earnedBadges.filter(b => b.rarity === 'raro').length,
      epico: earnedBadges.filter(b => b.rarity === 'epico').length,
      leggendario: earnedBadges.filter(b => b.rarity === 'leggendario').length
    },
    
    // Punti totali dai badge
    totalPoints: earnedBadges.reduce((sum, badge) => sum + (badge.points || 0), 0)
  };
};

/**
 * Ottiene badge suggeriti per l'utente
 * @param {Object} userProgress - Progresso utente
 * @returns {Array} Badge suggeriti
 */
export const getSuggestedBadges = (userProgress) => {
  return badges.filter(badge => {
    if (badge.earned) return false;
    
    // Logica per suggerire badge basata su progresso
    if (badge.type === BADGE_TYPES.NARRATIVO) {
      return userProgress.narrativePathsCompleted >= 1;
    }
    if (badge.type === BADGE_TYPES.PARTNER) {
      return userProgress.partnerExperiencesCompleted >= 1;
    }
    if (badge.type === BADGE_TYPES.COMMUNITY) {
      return userProgress.itinerariesFollowed >= 1;
    }
    
    return true;
  }).slice(0, 3); // Massimo 3 suggerimenti
};

/**
 * Verifica se un badge è sbloccabile
 * @param {string} badgeId - ID del badge
 * @param {Object} userProgress - Progresso utente
 * @returns {boolean} True se sbloccabile
 */
export const isBadgeUnlockable = (badgeId, userProgress) => {
  const badge = getBadgeById(badgeId);
  if (!badge || badge.earned) return false;
  
  // Logica per verificare se il badge può essere sbloccato
  if (badge.relatedContent) {
    return userProgress.completedContent?.includes(badge.relatedContent);
  }
  
  return true;
};

/**
 * Ottiene il prossimo badge da sbloccare
 * @param {Object} userProgress - Progresso utente
 * @returns {Object|null} Prossimo badge o null
 */
export const getNextBadgeToUnlock = (userProgress) => {
  const availableBadges = getAvailableBadges();
  
  // Trova il badge più vicino allo sblocco
  return availableBadges.find(badge => {
    if (badge.type === BADGE_TYPES.NARRATIVO) {
      return userProgress.narrativePathsCompleted >= 0;
    }
    return true;
  }) || null;
};

// 🏆 COSTANTI RARITÀ
export const BADGE_RARITIES = {
  COMUNE: 'comune',
  RARO: 'raro',  
  EPICO: 'epico',
  LEGGENDARIO: 'leggendario'
};

// 🎨 COLORI RARITÀ
export const RARITY_COLORS = {
  [BADGE_RARITIES.COMUNE]: '#6B7280',
  [BADGE_RARITIES.RARO]: '#3B82F6',
  [BADGE_RARITIES.EPICO]: '#8B5CF6',
  [BADGE_RARITIES.LEGGENDARIO]: '#F59E0B'
};

export default {
  badges,
  getEarnedBadges,
  getAvailableBadges,
  getBadgeById,
  getBadgesByType,
  getNarrativeBadges,
  getPartnerBadges,
  getCommunityBadges,
  getLegacyBadges,
  getBadgesByCategory,
  getBadgesByRarity,
  getBadgeByContent,
  calculateBadgeStats,
  getSuggestedBadges,
  isBadgeUnlockable,
  getNextBadgeToUnlock,
  BADGE_RARITIES,
  RARITY_COLORS
};
