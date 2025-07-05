// Assets management for JourneyFlux app
export const assets = {
  // Challenge category icons
  challengeIcons: {
    gastronomia: '🍝',
    cultura: '🏛️',
    natura: '🌲',
    arte: '🎨',
    avventura: '🏔️',
    storia: '📚',
    shopping: '🛍️',
    sport: '⚽',
    musica: '🎵',
    architettura: '🏗️'
  },

  // City icons
  cityIcons: {
    milano: '🏙️',
    roma: '🏛️',
    napoli: '🌋',
    firenze: '🎨',
    venezia: '🛶',
    torino: '🏔️',
    bologna: '🍝',
    palermo: '🏛️',
    genova: '⛵',
    bari: '🏖️',
    catania: '🌋',
    verona: '🎭',
    parma: '🧀',
    modena: '🏎️',
    pisa: '🗼',
    siena: '🐎',
    perugia: '🏰',
    lecce: '🏛️',
    trieste: '⛵',
    cagliari: '🏖️'
  },

  // Badge icons
  badgeIcons: {
    primo_esploratore: '🌟',
    maestro_gastronomia: '👨‍🍳',
    cultore_arte: '🎨',
    amante_natura: '🌿',
    storico_esperto: '📜',
    fotografo_viaggiatore: '📸',
    social_explorer: '👥',
    speed_challenger: '⚡',
    completionist: '💯',
    city_master: '🏆',
    streak_champion: '🔥',
    points_collector: '💰',
    badge_hunter: '🎯',
    travel_addict: '✈️',
    local_expert: '🗺️'
  },

  // Achievement levels
  achievementLevels: {
    bronzo: '🥉',
    argento: '🥈',
    oro: '🥇',
    platino: '💎',
    leggenda: '👑'
  },

  // Weather icons for seasonal challenges
  weatherIcons: {
    sole: '☀️',
    nuvole: '☁️',
    pioggia: '🌧️',
    neve: '❄️',
    tempesta: '⛈️',
    nebbia: '🌫️'
  },

  // Transport icons
  transportIcons: {
    piedi: '🚶',
    bici: '🚴',
    autobus: '🚌',
    treno: '🚆',
    metro: '🚇',
    auto: '🚗',
    aereo: '✈️',
    nave: '🛳️'
  },

  // Time of day icons
  timeIcons: {
    alba: '🌅',
    mattina: '🌄',
    pomeriggio: '☀️',
    sera: '🌇',
    notte: '🌙'
  },

  // Difficulty level colors
  difficultyColors: {
    facile: '#4ECDC4',
    media: '#FFB74D',
    difficile: '#FF6B6B',
    esperto: '#9C27B0'
  },

  // Category gradient colors
  categoryGradients: {
    gastronomia: ['#FF6B6B', '#FF8E8E'],
    cultura: ['#4ECDC4', '#7ED5D1'],
    natura: ['#45B7D1', '#6AC5E5'],
    arte: ['#F06292', '#F48FB1'],
    avventura: ['#66BB6A', '#81C784'],
    storia: ['#8D6E63', '#A1887F'],
    shopping: ['#BA68C8', '#CE93D8'],
    sport: ['#FF7043', '#FF8A65'],
    musica: ['#5C6BC0', '#7986CB'],
    architettura: ['#78909C', '#90A4AE']
  },

  // App brand colors
  brandColors: {
    primary: '#4ECDC4',
    secondary: '#667eea',
    accent: '#FF6B6B',
    success: '#27AE60',
    warning: '#FFB74D',
    error: '#E74C3C',
    info: '#3498DB',
    light: '#F8F9FA',
    dark: '#2C3E50'
  },

  // Splash screen data
  splash: {
    backgroundColor: '#667eea',
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
  },
  
  // App icon data
  icon: {
    image: './assets/icon.png',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#667eea',
    },
  },
  
  // Placeholder images for challenges
  challengeImages: {
    sfogliatella: '🥐',
    duomo: '🏰',
    aperitivo: '🍸',
    borghi: '🏔️',
    streetart: '🎨',
    gelato: '🍦',
  },
  
  // City emoji mapping
  cityEmojis: {
    Milano: '🏙️',
    Roma: '🏛️',
    Napoli: '🌋',
    Firenze: '🎨',
    Toscana: '🏞️',
  },
  
  // Badge emoji mapping
  badgeEmojis: {
    aperitivo: '🍸',
    explorer: '🌟',
    sfogliatella: '🥐',
    duomo: '🏰',
    borghi: '🏔️',
    streetart: '🎨',
    gelato: '🍦',
    traveler: '🎒',
  },
};

// Helper functions for assets
export const getIcon = (category, type) => {
  const iconMap = {
    challenge: assets.challengeIcons,
    city: assets.cityIcons,
    badge: assets.badgeIcons,
    achievement: assets.achievementLevels,
    weather: assets.weatherIcons,
    transport: assets.transportIcons,
    time: assets.timeIcons
  };

  return iconMap[category]?.[type] || '❓';
};

export const getGradient = (category) => {
  return assets.categoryGradients[category] || ['#95A5A6', '#B2BFC6'];
};

export const getDifficultyColor = (difficulty) => {
  return assets.difficultyColors[difficulty] || '#95A5A6';
};

export const getBrandColor = (colorName) => {
  return assets.brandColors[colorName] || '#95A5A6';
};
