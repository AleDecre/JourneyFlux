// Content Types Definitions per JourneyFlux MVP 2.0
// Definisce i 3 tipi principali di contenuto e helper functions

// 🎭 TIPI DI CONTENUTO
export const CONTENT_TYPES = {
  NARRATIVE_PATH: 'narrative_path',
  ITINERARY: 'itinerary', 
  PARTNER_EXPERIENCE: 'partner_experience',
  LEGACY_CHALLENGE: 'legacy_challenge' // Manteniamo per compatibilità
};

// 📂 CATEGORIE PERCORSI NARRATIVI
export const NARRATIVE_CATEGORIES = {
  MISTERO: 'mistero',
  LEGGENDA: 'leggenda', 
  STORIA: 'storia',
  ARTE: 'arte',
  GASTRONOMIA: 'gastronomia',
  NATURA: 'natura'
};

// 🗺️ TIPI ITINERARI
export const ITINERARY_TYPES = {
  COMMUNITY: 'community',
  TOUR_OPERATOR: 'tour_operator'
};

// 🍷 TIPI PARTNER
export const PARTNER_TYPES = {
  BAR: 'bar',
  RISTORANTE: 'ristorante',
  BOTTEGA: 'bottega',
  MUSEO: 'museo',
  LABORATORIO: 'laboratorio'
};

// 🏆 TIPI BADGE (ESTESI)
export const BADGE_TYPES = {
  NARRATIVO: 'narrativo',
  PARTNER: 'partner', 
  COMMUNITY: 'community',
  LEGACY: 'legacy' // Badge esistenti
};

// 📱 TEMPLATE SOCIAL SHARE
export const SOCIAL_TEMPLATES = {
  PERCORSO_COMPLETATO: 'percorso_completato',
  PARTNER_VISITATO: 'partner_visitato',
  ITINERARIO_SEGUITO: 'itinerario_seguito',
  BADGE_OTTENUTO: 'badge_ottenuto'
};

// 🎨 COLORI PER TIPOLOGIA
export const CONTENT_COLORS = {
  [CONTENT_TYPES.NARRATIVE_PATH]: {
    [NARRATIVE_CATEGORIES.MISTERO]: ['#8B5CF6', '#A78BFA'],
    [NARRATIVE_CATEGORIES.LEGGENDA]: ['#EF4444', '#F87171'],
    [NARRATIVE_CATEGORIES.STORIA]: ['#D97706', '#F59E0B'],
    [NARRATIVE_CATEGORIES.ARTE]: ['#EC4899', '#F472B6'],
    [NARRATIVE_CATEGORIES.GASTRONOMIA]: ['#FF6B6B', '#FF8E8E'],
    [NARRATIVE_CATEGORIES.NATURA]: ['#10B981', '#34D399']
  },
  [CONTENT_TYPES.ITINERARY]: {
    [ITINERARY_TYPES.COMMUNITY]: ['#3B82F6', '#60A5FA'],
    [ITINERARY_TYPES.TOUR_OPERATOR]: ['#6366F1', '#818CF8']
  },
  [CONTENT_TYPES.PARTNER_EXPERIENCE]: {
    [PARTNER_TYPES.BAR]: ['#F59E0B', '#FBBF24'],
    [PARTNER_TYPES.RISTORANTE]: ['#EF4444', '#F87171'],
    [PARTNER_TYPES.BOTTEGA]: ['#8B5CF6', '#A78BFA'],
    [PARTNER_TYPES.MUSEO]: ['#06B6D4', '#22D3EE'],
    [PARTNER_TYPES.LABORATORIO]: ['#10B981', '#34D399']
  }
};

// 🔧 HELPER FUNCTIONS

/**
 * Ottiene i colori per un contenuto specifico
 * @param {string} contentType - Tipo di contenuto
 * @param {string} category - Categoria specifica
 * @returns {Array} Array di colori per gradient
 */
export const getContentColors = (contentType, category) => {
  const colors = CONTENT_COLORS[contentType];
  if (!colors) return ['#4ECDC4', '#45B7D1']; // Default
  
  return colors[category] || ['#4ECDC4', '#45B7D1'];
};

/**
 * Ottiene l'icona per un contenuto specifico
 * @param {string} contentType - Tipo di contenuto
 * @param {string} category - Categoria specifica
 * @returns {string} Emoji dell'icona
 */
export const getContentIcon = (contentType, category) => {
  const icons = {
    [CONTENT_TYPES.NARRATIVE_PATH]: {
      [NARRATIVE_CATEGORIES.MISTERO]: '🔮',
      [NARRATIVE_CATEGORIES.LEGGENDA]: '🏛️',
      [NARRATIVE_CATEGORIES.STORIA]: '📜',
      [NARRATIVE_CATEGORIES.ARTE]: '🎨',
      [NARRATIVE_CATEGORIES.GASTRONOMIA]: '🍷',
      [NARRATIVE_CATEGORIES.NATURA]: '🌿'
    },
    [CONTENT_TYPES.ITINERARY]: {
      [ITINERARY_TYPES.COMMUNITY]: '👥',
      [ITINERARY_TYPES.TOUR_OPERATOR]: '🎯'
    },
    [CONTENT_TYPES.PARTNER_EXPERIENCE]: {
      [PARTNER_TYPES.BAR]: '🍸',
      [PARTNER_TYPES.RISTORANTE]: '🍝',
      [PARTNER_TYPES.BOTTEGA]: '🛍️',
      [PARTNER_TYPES.MUSEO]: '🏛️',
      [PARTNER_TYPES.LABORATORIO]: '🎨'
    }
  };
  
  return icons[contentType]?.[category] || '🗺️';
};

/**
 * Determina se un contenuto è premium/a pagamento
 * @param {Object} content - Oggetto contenuto
 * @returns {boolean} True se premium
 */
export const isPremiumContent = (content) => {
  if (content.type === CONTENT_TYPES.ITINERARY) {
    return content.itineraryType === ITINERARY_TYPES.TOUR_OPERATOR;
  }
  return content.premium || false;
};

/**
 * Calcola il punteggio di difficoltà numerico
 * @param {string} difficulty - Difficoltà testuale
 * @returns {number} Punteggio 1-5
 */
export const getDifficultyScore = (difficulty) => {
  const scores = {
    'facile': 1,
    'medio': 2,
    'media': 2,
    'difficile': 3,
    'impegnativo': 4,
    'estremo': 5
  };
  return scores[difficulty?.toLowerCase()] || 2;
};

/**
 * Formatta la durata in formato leggibile
 * @param {number} minutes - Durata in minuti
 * @returns {string} Durata formattata
 */
export const formatDuration = (minutes) => {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) return `${hours}h`;
  return `${hours}h ${remainingMinutes}m`;
};

/**
 * Genera un ID univoco per contenuti
 * @param {string} prefix - Prefisso del tipo
 * @returns {string} ID univoco
 */
export const generateContentId = (prefix = 'content') => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Valida se un contenuto è completo e valido
 * @param {Object} content - Contenuto da validare
 * @returns {Object} Risultato validazione
 */
export const validateContent = (content) => {
  const errors = [];
  
  if (!content.id) errors.push('ID mancante');
  if (!content.title) errors.push('Titolo mancante');
  if (!content.city) errors.push('Città mancante');
  if (!content.type) errors.push('Tipo contenuto mancante');
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// 📊 STATISTICHE HELPER
export const STATS_TYPES = {
  NARRATIVE_PATHS_COMPLETED: 'narrative_paths_completed',
  ITINERARIES_FOLLOWED: 'itineraries_followed', 
  PARTNERS_VISITED: 'partners_visited',
  TOTAL_STORY_POINTS: 'total_story_points',
  BADGES_NARRATIVE: 'badges_narrative',
  BADGES_PARTNER: 'badges_partner',
  BADGES_COMMUNITY: 'badges_community',
  CITIES_EXPLORED: 'cities_explored',
  SOCIAL_SHARES: 'social_shares'
};

// 🏅 LIVELLI UTENTE
export const USER_LEVELS = {
  NOVIZIO: { min: 0, max: 499, title: 'Novizio Esploratore', icon: '🌱' },
  CERCATORE: { min: 500, max: 1499, title: 'Cercatore di Segreti', icon: '🔍' },
  MAESTRO: { min: 1500, max: 2999, title: 'Maestro Narratore', icon: '📚' },
  LEGGENDA: { min: 3000, max: Infinity, title: 'Leggenda Vivente', icon: '👑' }
};

/**
 * Calcola il livello utente basato sui punti
 * @param {number} points - Punti totali utente
 * @returns {Object} Livello utente
 */
export const getUserLevel = (points) => {
  for (const [key, level] of Object.entries(USER_LEVELS)) {
    if (points >= level.min && points <= level.max) {
      return { ...level, key };
    }
  }
  return USER_LEVELS.NOVIZIO;
};

export default {
  CONTENT_TYPES,
  NARRATIVE_CATEGORIES,
  ITINERARY_TYPES,
  PARTNER_TYPES,
  BADGE_TYPES,
  SOCIAL_TEMPLATES,
  CONTENT_COLORS,
  getContentColors,
  getContentIcon,
  isPremiumContent,
  getDifficultyScore,
  formatDuration,
  generateContentId,
  validateContent,
  STATS_TYPES,
  USER_LEVELS,
  getUserLevel
};
