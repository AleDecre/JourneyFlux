// Theme configuration for JourneyFlux app
export const theme = {
  // Primary color palette
  colors: {
    primary: '#4ECDC4',
    primaryDark: '#44A08D',
    secondary: '#667eea',
    secondaryDark: '#764ba2',
    accent: '#FF6B6B',
    accentLight: '#FF8E8E',
    
    // Status colors
    success: '#27AE60',
    successLight: '#2ECC71',
    warning: '#FFB74D',
    warningLight: '#FFCC80',
    error: '#E74C3C',
    errorLight: '#EC7063',
    info: '#3498DB',
    infoLight: '#5DADE2',
    
    // Neutral colors
    background: '#F8F9FA',
    surface: '#FFFFFF',
    text: '#2C3E50',
    textSecondary: '#7F8C8D',
    textLight: '#95A5A6',
    border: '#E9ECEF',
    shadow: '#000000',
    
    // Challenge category colors
    gastronomia: '#FF6B6B',
    cultura: '#4ECDC4',
    natura: '#45B7D1',
    arte: '#F06292',
    avventura: '#66BB6A',
    storia: '#8D6E63',
    shopping: '#BA68C8',
    sport: '#FF7043',
    musica: '#5C6BC0',
    architettura: '#78909C'
  },
  
  // Gradient combinations
  gradients: {
    primary: ['#4ECDC4', '#44A08D'],
    secondary: ['#667eea', '#764ba2'],
    sunset: ['#FF6B6B', '#FF8E8E'],
    ocean: ['#45B7D1', '#6AC5E5'],
    forest: ['#66BB6A', '#81C784'],
    purple: ['#BA68C8', '#CE93D8'],
    orange: ['#FF7043', '#FF8A65'],
    blue: ['#5C6BC0', '#7986CB'],
    success: ['#27AE60', '#2ECC71'],
    warning: ['#FFB74D', '#FFCC80'],
    error: ['#E74C3C', '#EC7063']
  },
  
  // Typography
  fonts: {
    light: 'Nunito_300Light',
    regular: 'Nunito_400Regular',
    medium: 'Nunito_500Medium',
    semiBold: 'Nunito_600SemiBold',
    bold: 'Nunito_700Bold',
    extraBold: 'Nunito_800ExtraBold',
    sizes: {
      tiny: 10,
      small: 12,
      body: 14,
      subheading: 16,
      heading: 18,
      title: 20,
      large: 24,
      huge: 32
    },
    weights: {
      light: '300',
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    }
  },
  
  // Spacing system
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    huge: 32
  },
  
  // Border radius
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
    xlarge: 16,
    round: 50
  },
  
  // Elevation/Shadow
  elevation: {
    small: {
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2
    },
    medium: {
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4
    },
    large: {
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8
    }
  },
  
  // Component specific styles
  components: {
    button: {
      height: 48,
      borderRadius: 12,
      paddingHorizontal: 16
    },
    card: {
      borderRadius: 16,
      padding: 16
    },
    input: {
      height: 48,
      borderRadius: 8,
      paddingHorizontal: 12,
      borderWidth: 1
    },
    badge: {
      height: 24,
      borderRadius: 12,
      paddingHorizontal: 8
    }
  }
};

// Dark theme variant
export const darkTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: '#1A1A1A',
    surface: '#2C2C2C',
    text: '#FFFFFF',
    textSecondary: '#B0B0B0',
    textLight: '#808080',
    border: '#404040'
  }
};

// Helper functions
export const getThemeColor = (colorName, theme = theme) => {
  return theme.colors[colorName] || theme.colors.text;
};

export const getThemeGradient = (gradientName, theme = theme) => {
  return theme.gradients[gradientName] || theme.gradients.primary;
};

export const getSpacing = (size, theme = theme) => {
  return theme.spacing[size] || theme.spacing.md;
};

export const getFontSize = (size, theme = theme) => {
  return theme.fonts.sizes[size] || theme.fonts.sizes.body;
};

export const getBorderRadius = (size, theme = theme) => {
  return theme.borderRadius[size] || theme.borderRadius.medium;
};

export const getElevation = (size, theme = theme) => {
  return theme.elevation[size] || theme.elevation.medium;
};

// Category color mappings
export const getCategoryGradient = (category) => {
  const categoryGradients = {
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
  };
  
  return categoryGradients[category] || theme.gradients.primary;
};

export const getDifficultyColor = (difficulty) => {
  const difficultyColors = {
    facile: '#4ECDC4',
    media: '#FFB74D',
    difficile: '#FF6B6B',
    esperto: '#9C27B0'
  };
  
  return difficultyColors[difficulty] || theme.colors.textLight;
};

// Responsive breakpoints
export const breakpoints = {
  small: 320,
  medium: 768,
  large: 1024,
  xlarge: 1200
};

export const isTablet = (width) => width >= breakpoints.medium;
export const isDesktop = (width) => width >= breakpoints.large;
