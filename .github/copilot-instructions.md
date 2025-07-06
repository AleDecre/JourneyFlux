<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# JourneyFlux - MVP Strategy 2.0 "L'Esploratore di Segreti"

## Project Overview
JourneyFlux è una React Native Expo app che trasforma il turismo italiano attraverso **Percorsi Narrativi**, **Itinerari Community** e **Partner Experiences**. Non più semplici sfide, ma mini-avventure che svelano i segreti nascosti delle città italiane.

## Nuova Strategia MVP - Le 6 Leve

### 1. 🎭 Percorsi Narrativi Tematici
Mini-avventure curate (5-7 per Roma/Napoli) che raccontano storie, leggende e misteri urbani. Ogni percorso ha:
- **Introduzione narrativa** (il "gancio" emotivo)
- **2-3 tappe GPS** con story progression
- **Foto-enigma finale** (non generica, ma puzzle da risolvere)
- **Ricompensa narrativa** (badge + "Lo sapevi che?" esclusivo)

### 2. 🗺️ Itinerari Community & Tour Operator  
- **3 Itinerari Community**: Creati da local ambassador con rating/reviews
- **2 Itinerari Premium**: Tour operator professionali con prenotazioni
- Sistema di valutazione e feedback della community

### 3. 🍷 Partner Experiences
3-5 locali partner (bar, ristoranti, botteghe) che offrono:
- Sconti esclusivi per utenti JourneyFlux
- Degustazioni e esperienze speciali
- Badge partner dedicati per collezionisti

### 4. 📸 Card "Pronta per le Stories"
Sistema automatico di generazione card condivisibili:
- Template Instagram Stories ottimizzati
- Badge ottenuto + foto-scoperta + branding JourneyFlux
- CTA per invitare amici e tracking viral

### 5. 🏆 Badge & Passaporto Digitale
Evoluzione del sistema badge attuale:
- **Badge Narrativi**: Per percorsi completati
- **Badge Partner**: Per esperienze locali
- **Badge Community**: Per itinerari e contributi
- **Passaporto Visivo**: Collezione stile "timbri di viaggio"

### 6. 🔔 Push Notifications Contestuali
- Notifiche quando l'utente è vicino a percorsi o partner
- Reminder per completare avventure iniziate
- Offerte time-sensitive basate su location

## Technology Stack (MANTENUTO)
- **Frontend**: React Native with Expo
- **Navigation**: React Navigation (Bottom Tabs + Stack)
- **Styling**: StyleSheet with LinearGradient + Font Nunito
- **Icons**: Expo Vector Icons (@expo/vector-icons)
- **State Management**: React Hooks (useState, useEffect)
- **Data**: Mock JSON data evoluto per 3 tipologie contenuto

## Nuova Project Structure
```
src/
├── components/          # UI components estesi
│   ├── ChallengeCard.js     # LEGACY - mantenere per riferimento
│   ├── NarrativePathCard.js # NUOVO - per percorsi narrativi
│   ├── ItineraryCard.js     # NUOVO - per itinerari community/TO
│   ├── PartnerExperienceCard.js # NUOVO - per partner locali
│   ├── PassportBadge.js     # NUOVO - badge stile passaporto
│   ├── SocialShareCard.js   # NUOVO - generatore card stories
│   ├── BadgeCard.js         # ESTENDERE - nuovi tipi badge
│   ├── StatCard.js          # OK - manteniamo
│   └── CitySelector.js      # OK - manteniamo
├── screens/             # Screens evolute
│   ├── HomeScreen.js        # RIDISEGNARE - 3 sezioni (Narrativi/Consigliati/Food&Drink)
│   ├── ContentDetailScreen.js # EVOLVERE da ChallengeScreen - universale per tutti i contenuti
│   ├── ExperienceCompleteScreen.js # EVOLVERE da ChallengeCompleteScreen
│   ├── NarrativePathScreen.js # NUOVO - dettaglio percorsi narrativi
│   ├── PartnerExperienceScreen.js # NUOVO - dettaglio partner
│   ├── ProfileScreen.js     # ESTENDERE - passaporto digitale
│   └── MapScreen.js         # ESTENDERE - pin colorati per tipologia
├── data/               # Data layer ristrutturato
│   ├── challenges.js        # LEGACY - mantenere per riferimento
│   ├── narrativePaths.js    # NUOVO - 5-7 percorsi Roma/Napoli
│   ├── itineraries.js       # NUOVO - 3 community + 2 TO
│   ├── partnerExperiences.js # NUOVO - 3-5 partner locali
│   ├── badges.js            # ESTENDERE - badge narrativi/partner/community
│   ├── user.js              # ESTENDERE - nuove statistiche
│   ├── cities.js            # OK - manteniamo
│   └── contentTypes.js      # NUOVO - definizioni tipi contenuto
└── utils/              # Utilities (manteniamo)
    ├── theme.js
    ├── helpers.js
    └── typography.js
```

## Design Principles (AGGIORNATI)
- **Story-First**: Ogni contenuto deve raccontare una storia coinvolgente
- **Viral-Ready**: Ogni esperienza deve essere facilmente condivisibile
- **Quality > Quantity**: Meglio 5 percorsi eccellenti che 50 mediocri
- **Community-Driven**: Valorizzare local ambassador e creator
- **Partner-Friendly**: Creare valore tangibile per business locali
- **Mobile-first**: Ottimizzato per smartphone e Stories

## Nuova Data Structure

### narrativePaths.js - Struttura Percorso Narrativo
```javascript
const narrativePath = {
  id: 1,
  title: "I Fantasmi di Castel Sant'Angelo",
  category: "mistero", // mistero, leggenda, storia, arte
  city: "Roma",
  description: "Scopri la leggenda dell'Angelo di Hadrian...",
  introduction: "Nel 590 d.C., mentre la peste devastava Roma...", // Il "gancio" narrativo
  difficulty: "media",
  duration: "45-60 min",
  
  // Tappe del percorso (2-3 max)
  steps: [
    {
      id: 1,
      title: "Ponte Sant'Angelo",
      description: "Trova la statua con l'iscrizione misteriosa",
      coordinates: { lat: 41.9016, lng: 12.4667 },
      storyContent: "Le statue di Bernini nascondono un segreto...",
      validationRadius: 50
    },
    // ... altre tappe
  ],
  
  // La prova finale (foto-enigma)
  finalChallenge: {
    title: "Il Segreto dell'Angelo",
    description: "Fotografa l'iscrizione nascosta sul piedistallo dell'Angelo",
    hint: "Cerca sotto le ali, dove solo pochi guardano...",
    validationType: "photo_with_text" // richiede testo specifico nella foto
  },
  
  // Ricompense
  rewards: {
    points: 200,
    badge: "Cacciatore di Fantasmi",
    unlockContent: "La vera storia del miracolo di San Gregorio Magno..."
  },
  
  // Metadati
  createdBy: "JourneyFlux_Curator",
  tags: ["storia", "leggende", "roma_segreta"],
  featured: true,
  socialShareTemplate: "ho_svelato_fantasmi_castel"
};
```

### itineraries.js - Struttura Itinerario
```javascript
const itinerary = {
  id: 1,
  title: "Roma Segreta del Local",
  type: "community", // community | tour_operator
  creator: {
    name: "Marco_RM_Explorer",
    type: "local_ambassador",
    rating: 4.8,
    reviewsCount: 127,
    verified: true
  },
  
  // Sequenza tappe complete
  timeline: [
    {
      time: "09:00",
      type: "colazione",
      location: "Bar del Cappuccino",
      description: "Cornetto e cappé da vero romano",
      coordinates: { lat: 41.9028, lng: 12.4964 },
      estimatedCost: "€3-5"
    },
    // ... altre tappe
  ],
  
  // Metadati itinerario
  duration: "Mezza giornata",
  estimatedCost: "€25-40",
  difficulty: "facile",
  bestTime: "mattina",
  
  // Prenotazione (se tour_operator)
  booking: {
    required: false, // true per TO
    link: null,
    price: null
  },
  
  // Community feedback
  rating: 4.8,
  reviews: [
    {
      user: "TravelLover_MI",
      rating: 5,
      comment: "Esperienza autentica, Marco conosce davvero Roma!",
      date: "2025-06-20"
    }
  ]
};
```

### partnerExperiences.js - Struttura Partner
```javascript
const partnerExperience = {
  id: 1,
  name: "Bar del Fico - Aperitivo Segreto",
  partner: {
    name: "Bar del Fico",
    type: "bar",
    address: "Piazza del Fico, 26, Roma",
    coordinates: { lat: 41.8986, lng: 12.4768 }
  },
  
  // L'offerta speciale
  experience: {
    title: "Aperitivo dell'Alchimista",
    description: "Cocktail esclusivo ispirato ai simboli alchemici di Roma",
    originalPrice: "€12",
    discountedPrice: "€8",
    discountPercentage: 33,
    validDays: ["mar", "mer", "gio"], // giorni validi
    validHours: "18:00-20:00"
  },
  
  // Come riscattare
  redemption: {
    method: "qr_code", // qr_code | promo_code | phone_call
    code: "JOURNEYFLUX_FICO",
    instructions: "Mostra questo QR al barista e menziona 'JourneyFlux'"
  },
  
  // Gamification
  rewards: {
    points: 50,
    badge: "Maestro dell'Aperitivo Romano",
    unlockCondition: "after_narrative_path_completion" // opzionale
  },
  
  // Metadati
  featured: true,
  category: "aperitivo",
  city: "Roma",
  active: true,
  socialShareTemplate: "aperitivo_segreto_fico"
};
```

## Code Style Guidelines (AGGIORNATI)
- **Story-Driven Components**: Ogni componente deve supportare la narrativa
- **Modular Content**: Componenti riutilizzabili per 3 tipologie di contenuto
- **Social-Ready**: Ogni completion screen deve generare contenuto condivisibile
- **Performance-First**: Lazy loading per contenuti pesanti (storie, immagini)
- **Accessibility**: Screen reader friendly per inclusività
- **Offline-Ready**: Contenuti base cached per funzionamento offline

## Future Enhancements (AGGIORNATI)
- **Creator Tools**: Dashboard per local ambassador
- **Real GPS & Camera**: Integrazione nativa per verifica precisa
- **AI Content Curation**: Suggerimenti personalizzati
- **AR Integration**: Scoperta location con realtà aumentata
- **Revenue Sharing**: Monetizzazione per creator e partner
- **European Expansion**: Replica del modello in altre città

## 🤖 Personalizzazione AI (Feature Plus)

**Oltre ai Percorsi Narrativi curati, JourneyFlux potrà offrire esperienze personalizzate tramite AI.**

### Approccio AI Integration
- **Remixing Intelligente**: L'AI combina moduli esistenti (percorsi, partner, itinerari) per creare esperienze uniche
- **Conversational Planning**: Chat naturale per comprendere preferenze e vincoli
- **Adaptive Suggestions**: Modifica dinamica dell'esperienza in base a feedback e contesto

### Esempi di Personalizzazione AI

**Input**: "Pomeriggio romantico Roma, 3 ore, budget medio"
**Output AI**: 
```
🎭 "Sussurri d'Amore nell'Eterna"
- 17:00 Aperitivo Bar del Fico (sconto partner)
- 18:30 Percorso "Fantasmi Castel Sant'Angelo"
- 20:00 Cena romantica prenotata Checchino
+ BONUS: Jazz live stasera Villa Giulia
```

**Input**: "Famiglia con bambini, Firenze, giornata intera"
**Output AI**:
```
🎭 "Piccoli Esploratori di Firenze"
- 09:00 Caccia tesoro kid-friendly Palazzo Pitti
- 11:00 Gelato da Vivoli (sconto bambini)
- 14:00 Laboratorio maschere tradizionali
- 16:00 Parco giochi Cascine
+ BONUS: Spettacolo marionette oggi
```

### Implementazione AI (Post-MVP)
- **Data Layer**: Tagging e categorizzazione contenuti per AI
- **ML Pipeline**: Recommendation engine e content matching
- **Conversational Interface**: Chat interface per preferenze utente
- **Real-time Integration**: Eventi, meteo, traffico per suggerimenti contestuali

> **Nota**: La personalizzazione AI è una **feature aggiuntiva** che estende l'esperienza core dei Percorsi Narrativi, non la sostituisce. I contenuti curati rimangono il fondamento dell'app.

## MVP Implementation Priority

### FASE 1 (Settimana 1): Data Architecture
- [ ] Creare strutture dati per 3 tipologie contenuto
- [ ] Mock data per 5-7 percorsi narrativi Roma/Napoli
- [ ] Mock data per 3 community + 2 TO itinerari
- [ ] Mock data per 3-5 partner experiences

### FASE 2 (Settimana 2): Core UI Refactoring  
- [ ] HomeScreen_v2 con 3 sezioni
- [ ] NarrativePathCard, ItineraryCard, PartnerExperienceCard
- [ ] ContentDetailScreen universale
- [ ] Navigation aggiornata

### FASE 3 (Settimana 3): Gamification Avanzata
- [ ] Badge system esteso (narrativi/partner/community)
- [ ] PassportBadge component
- [ ] ProfileScreen_v2 con passaporto digitale
- [ ] ExperienceCompleteScreen con social preview

### FASE 4 (Settimana 4): Social & Viral
- [ ] SocialShareCard con template Instagram
- [ ] Sistema rating/review per itinerari
- [ ] Push notifications mock
- [ ] MapScreen_v2 con pin colorati

**REGOLA FONDAMENTALE**: Ogni feature deve rispondere alla domanda "Questo rende l'esperienza più condivisibile e memorabile?"

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
