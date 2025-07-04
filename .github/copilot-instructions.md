<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# JourneyFlux - Gamified Travel App

## Project Overview
JourneyFlux is a React Native Expo app that gamifies travel experiences in Italy. Users can complete location-based challenges, earn points and badges, and explore different cities through interactive tasks.

## Technology Stack
- **Frontend**: React Native with Expo
- **Navigation**: React Navigation (Bottom Tabs + Stack)
- **Styling**: StyleSheet with LinearGradient for modern UI
- **Icons**: Expo Vector Icons (@expo/vector-icons)
- **State Management**: React Hooks (useState, useEffect)
- **Data**: Mock JSON data for prototype

## Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ChallengeCard.js # Challenge display cards
│   ├── BadgeCard.js     # Badge display components
│   ├── StatCard.js      # Statistics display cards
│   └── CitySelector.js  # City selection component
├── screens/             # App screens
│   ├── HomeScreen.js    # Main exploration screen
│   ├── ChallengeScreen.js # Challenge details and completion
│   ├── ChallengeCompleteScreen.js # Success/completion screen
│   ├── MapScreen.js     # Map and city overview
│   └── ProfileScreen.js # User profile and stats
├── data/               # Mock data files
│   ├── challenges.js   # Challenge data and functions
│   ├── badges.js       # Badge data and functions
│   ├── user.js         # User profile data
│   └── cities.js       # City data and functions
└── Navigation.js       # Navigation configuration
```

## Design Principles
- **Mobile-first**: Designed for smartphone screens
- **Gamification**: Points, badges, progress tracking
- **Modern UI**: Gradient backgrounds, rounded corners, card-based layout
- **Intuitive Navigation**: Bottom tab bar with clear icons
- **Visual Feedback**: Animations, color-coded categories
- **Italian Focus**: Content and UI optimized for Italian travel

## Key Features
1. **Challenge System**: Location-based tasks with GPS and photo verification
2. **Badge System**: Collectible achievements for completing challenges
3. **Progress Tracking**: Points, streaks, and completion statistics
4. **City Exploration**: Filter challenges by Italian cities
5. **Profile Management**: User stats and preference tracking

## Code Style Guidelines
- Use functional components with hooks
- Keep components modular and reusable
- Use descriptive variable names in Italian context
- Implement proper error handling
- Use LinearGradient for consistent visual appeal
- Follow React Native best practices

## Mock Data Structure
- **Challenges**: Location-based tasks with requirements and rewards
- **Badges**: Achievements linked to challenge completion
- **Cities**: Italian destinations with coordinate data
- **User**: Profile information and progress tracking

## Future Enhancements
- Real backend integration
- GPS and camera functionality
- AI-powered photo verification
- Social features and leaderboards
- AR integration for location discovery
- Push notifications for nearby challenges

## Dettagli Tecnici Implementazione

### Componenti Principali

#### ChallengeCard.js
- **Funzione**: Visualizza sfide con design gradient
- **Props**: `challenge` (object), `onPress` (function)
- **Features**:
  - Gradient colorato per categoria (Gastronomia: rosso, Cultura: turchese, etc.)
  - Badge di completamento con checkmark
  - Difficulty indicator con colori specifici
  - Punti e categoria visualizzati
- **Stili**: Card con ombre, testo bianco su gradient, bordi arrotondati 16px

#### BadgeCard.js
- **Funzione**: Mostra badge earned/locked
- **Props**: `badge` (object), `size` ('small'|'medium'|'large')
- **Features**:
  - Stati earned (colorato) vs locked (grigio)
  - Dimensioni responsive
  - Data di ottenimento per badge earned
  - Gradient circolare per badge container

#### StatCard.js
- **Funzione**: Statistiche utente in card gradient
- **Props**: `title`, `value`, `subtitle`, `icon`, `colors` (array)
- **Features**:
  - Gradient personalizzabile
  - Icone emoji per visual appeal
  - Valori numerici prominenti
  - Subtitle opzionale per dettagli

#### CitySelector.js
- **Funzione**: Griglia città selezionabili
- **Props**: `cities` (array), `selectedCity` (object), `onCitySelect` (function)
- **Features**:
  - Layout grid 2 colonne
  - Stato selected con gradient diverso
  - Conteggio sfide per città
  - Badge featured per città importanti

### Schermate Principali

#### HomeScreen.js
- **Stato**: `selectedCity`, `refreshing`, `showAllChallenges`
- **Funzionalità**:
  - Filtro sfide per città
  - RefreshControl per simulare reload
  - Espandi/comprimi lista sfide
  - Statistiche rapide utente
  - CitySelector integrato
- **Navigazione**: Passa a ChallengeScreen con params `{ challengeId }`

#### ChallengeScreen.js
- **Parametri**: `route.params.challengeId`
- **Stato**: `isNearLocation`, `photoUploaded`
- **Funzionalità**:
  - Validazione GPS mockata
  - Simulazione upload foto
  - Controllo completamento requisiti
  - Anteprima badge da ottenere
- **Navigazione**: Passa a ChallengeCompleteScreen con params completi

#### ChallengeCompleteScreen.js
- **Parametri**: `challengeId`, `pointsEarned`, `badgeEarned`
- **Animazioni**: Animated API per fade/scale/slide
- **Funzionalità**:
  - Celebrazione visiva completamento
  - Display punti e badge ottenuti
  - Statistiche aggiornate
  - Pulsanti per azioni successive

#### ProfileScreen.js
- **Funzionalità**:
  - Statistiche complete utente
  - Badge earned/available con FlatList
  - Sfide completate con dettagli
  - Preferenze utente
  - Calcolo percentuale progresso

#### MapScreen.js
- **Funzionalità**:
  - Placeholder mappa interattiva
  - Griglia città con Alert interaction
  - Legenda categorie sfide
  - Statistiche globali
  - Sezione "coming soon" per funzionalità future

### Dati Mock Strutturati

#### challenges.js
```javascript
const challenges = [
  {
    id: 1,
    title: "Sfida Sfogliatella Napoletana",
    description: "Dettagli sfida...",
    location: "Napoli, Campania",
    difficulty: "Facile",
    points: 150,
    category: "Gastronomia",
    image: "🥐",
    coordinates: { lat: 40.8518, lng: 14.2681 },
    requirements: ["...", "...", "..."],
    completed: false,
    badge: "Maestro della Sfogliatella"
  }
];

// Funzioni helper
export const getChallengesByCity = (city) => {...};
export const getChallengeById = (id) => {...};
export const getCompletedChallenges = () => {...};
```

#### badges.js
```javascript
const badges = [
  {
    id: 1,
    name: "Maestro dell'Aperitivo",
    description: "Completato il tour aperitivo romano",
    icon: "🍸",
    color: "#FF6B6B",
    earned: true,
    earnedDate: "2025-06-15"
  }
];

// Funzioni helper
export const getEarnedBadges = () => {...};
export const getAvailableBadges = () => {...};
```

#### user.js
```javascript
const userData = {
  id: 1,
  username: "MarcoDiViaggio",
  stats: {
    totalPoints: 450,
    challengesCompleted: 1,
    challengesTotal: 6,
    badgesEarned: 2,
    citiesVisited: 1,
    currentStreak: 1,
    longestStreak: 3
  },
  preferences: {
    favoriteCategories: ["Gastronomia", "Cultura"],
    difficulty: "Media"
  }
};
```

### Configurazione Navigazione

#### Navigation.js
```javascript
// Stack per Home flow
const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Challenge" component={ChallengeScreen} />
    <Stack.Screen name="ChallengeComplete" component={ChallengeCompleteScreen} />
  </Stack.Navigator>
);

// Tab Navigator principale
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'HomeTab') iconName = focused ? 'home' : 'home-outline';
        // ... altri tab
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#4ECDC4',
      tabBarInactiveTintColor: '#95A5A6',
      // ... altri stili
    })}
  >
    <Tab.Screen name="HomeTab" component={HomeStack} />
    <Tab.Screen name="MapTab" component={MapScreen} />
    <Tab.Screen name="ProfileTab" component={ProfileScreen} />
  </Tab.Navigator>
);
```

### Stili e Tema

#### Colori Principali
```javascript
const colors = {
  primary: '#4ECDC4',          // Turchese
  secondary: '#667eea',        // Blu-viola
  accent: '#FF6B6B',           // Rosso corallo
  success: '#27AE60',          // Verde successo
  warning: '#FFB74D',          // Arancio warning
  background: '#F8F9FA',       // Grigio chiaro
  text: '#2C3E50',             // Blu scuro
  textLight: '#7F8C8D',        // Grigio medio
  white: '#FFFFFF',            // Bianco
  categories: {
    gastronomia: ['#FF6B6B', '#FF8E8E'],
    cultura: ['#4ECDC4', '#7ED5D1'],
    natura: ['#45B7D1', '#6AC5E5'],
    arte: ['#F06292', '#F48FB1']
  }
};
```

#### Utilità Styling
```javascript
const commonStyles = {
  card: {
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  gradientButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  }
};
```

### Flusso Dati e Stato

#### Pattern di Gestione Stato
1. **Local State**: useState per UI state (loading, selections, etc.)
2. **Props Drilling**: Dati passati via navigation params
3. **Mock Data**: Importazioni dirette da data files
4. **No Global State**: Prototipo senza Redux/Context

#### Esempi di Flusso
```javascript
// Home → Challenge
navigation.navigate('Challenge', { challengeId: challenge.id });

// Challenge → Complete
navigation.navigate('ChallengeComplete', { 
  challengeId: challenge.id,
  pointsEarned: challenge.points,
  badgeEarned: badge
});

// Complete → Home
navigation.navigate('Home');
```

### Troubleshooting e Debug

#### Problemi Comuni
1. **Navigation Params**: Verificare che i parametri siano passati correttamente
2. **Mock Data**: Assicurarsi che gli ID dei dati siano consistenti
3. **Styling**: Controllare che i gradient non causino performance issues
4. **Expo**: Verificare che la versione SDK sia compatibile

#### Comandi Debug
```bash
# Restart Metro bundler
npx expo start --clear

# Visualizza logs
npx expo logs

# Debug su device
npx expo start --tunnel
```

### Preparazione per Produzione

#### Ottimizzazioni Necessarie
1. **Immagini**: Ottimizzare dimensioni assets
2. **Bundle Size**: Analizzare e ridurre dipendenze
3. **Performance**: Implementare lazy loading
4. **Error Boundaries**: Aggiungere gestione errori globale

#### Build Commands
```bash
# Build Android
eas build --platform android

# Build iOS
eas build --platform ios

# Build entrambi
eas build --platform all
```

### Estensioni Future

#### Backend Integration Ready
- Struttura dati compatibile con API REST
- Funzioni helper preparate per HTTP calls
- Error handling predisposto per network errors

#### Feature Flags Ready
- Componenti modulari per attivazione graduale
- Mock data facilmente sostituibile
- UI preparata per stati loading/error

#### Monitoring Ready
- Console.log strategici per debugging
- Analytics tracking points identificati
- Performance metrics points preparati
