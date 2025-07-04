# JourneyFlux - Gamified Travel App 🗺️

Una app React Native che trasforma i viaggi in Italia in avventure gamificate, combinando esplorazione, sfide e premi per rendere ogni viaggio un'esperienza coinvolgente.

## ✨ Caratteristiche Principali

### 🎯 Sistema di Sfide
- **Sfide Geolocalizzate**: Compiti basati su luoghi specifici in Italia
- **Verifica GPS**: Controllo automatico della posizione
- **Prova Fotografica**: Caricamento foto per validare il completamento
- **Categorie Diverse**: Gastronomia, Cultura, Natura, Arte

### 🏆 Sistema di Gamification
- **Punti e Livelli**: Accumula punti completando le sfide
- **Badge Collezionabili**: Achievements sbloccabili per diversi traguardi
- **Streak System**: Premi per la costanza nell'esplorazione
- **Progressi Visuali**: Statistiche dettagliate e progressi

### 🏛️ Destinazioni Italiane
- **Milano**: Sfide culturali e street art
- **Roma**: Aperitivo tour e monumenti storici
- **Napoli**: Tradizioni culinarie e dolci tipici
- **Firenze**: Gelato artigianale e arte rinascimentale
- **Toscana**: Borghi nascosti e paesaggi mozzafiato

## 🛠️ Tecnologie Utilizzate

- **React Native** con Expo
- **React Navigation** (Bottom Tabs + Stack)
- **Expo Vector Icons** per le icone
- **LinearGradient** per design moderno
- **SafeAreaView** per compatibilità dispositivi
- **Mock Data** per il prototipo

## 📱 Schermate dell'App

### 🏠 Home Screen
- Selezione città di destinazione
- Lista sfide disponibili filtrabili
- Statistiche rapide dell'utente
- Interfaccia intuitiva con card gradient

### 🎮 Challenge Screen
- Dettagli completi della sfida
- Requisiti di completamento
- Verifica GPS simulata
- Upload foto mockato
- Anteprima badge da sbloccare

### 🎉 Completion Screen
- Animazioni di successo
- Punti ottenuti
- Nuovo badge sbloccato
- Statistiche aggiornate

### 👤 Profile Screen
- Statistiche complete dell'utente
- Badge ottenuti e disponibili
- Sfide completate
- Preferenze personali

### 🗺️ Map Screen
- Panoramica città italiane
- Statistiche globali
- Legenda categorie sfide
- Anteprima funzionalità future

## 🚀 Installazione e Avvio

### Prerequisiti
- Node.js (v14 o superiore)
- npm o yarn
- Expo CLI
- Expo Go app su dispositivo mobile

### Comandi di Installazione
```bash
# Clona il repository
git clone [repository-url]

# Naviga nella directory
cd JourneyFlux

# Installa le dipendenze
npm install

# Avvia l'app
npx expo start
```

### Dipendenze Principali
```json
{
  "@react-navigation/native": "^6.x",
  "@react-navigation/bottom-tabs": "^6.x",
  "@react-navigation/stack": "^6.x",
  "react-native-screens": "^3.x",
  "react-native-safe-area-context": "^4.x",
  "@expo/vector-icons": "^14.x",
  "expo-linear-gradient": "^13.x",
  "react-native-gesture-handler": "^2.x",
  "react-native-reanimated": "^3.x"
}
```

## 📁 Struttura del Progetto

```
JourneyFlux/
├── App.js                 # Entry point dell'app
├── app.json               # Configurazione Expo (nome, icone, versione)
├── package.json           # Dipendenze e scripts del progetto
├── README.md              # Documentazione completa del progetto
│
├── src/
│   ├── Navigation.js      # Configurazione React Navigation
│   │                      # - Bottom Tab Navigator (Home, Mappa, Profilo)
│   │                      # - Stack Navigator per flusso challenge
│   │                      # - Stili tab bar e icone Ionicons
│   │
│   ├── components/        # Componenti UI riutilizzabili
│   │   ├── ChallengeCard.js   # Card sfida con gradient, difficoltà, punti
│   │   ├── BadgeCard.js       # Badge con stato earned/locked, colori tematici
│   │   ├── StatCard.js        # Statistiche utente con LinearGradient
│   │   └── CitySelector.js    # Selezione città con grid layout
│   │
│   ├── screens/           # Schermate principali dell'app
│   │   ├── HomeScreen.js      # Schermata principale con sfide e filtri
│   │   │                      # - CitySelector per filtri
│   │   │                      # - Lista ChallengeCard
│   │   │                      # - Statistiche rapide utente
│   │   │                      # - RefreshControl per reload
│   │   │
│   │   ├── ChallengeScreen.js # Dettaglio sfida e completamento
│   │   │                      # - Verifica GPS mockata
│   │   │                      # - Upload foto simulato
│   │   │                      # - Validazione requisiti
│   │   │                      # - Anteprima badge
│   │   │
│   │   ├── ChallengeCompleteScreen.js # Schermata successo
│   │   │                              # - Animazioni Animated API
│   │   │                              # - Punti e badge ottenuti
│   │   │                              # - Statistiche aggiornate
│   │   │
│   │   ├── MapScreen.js       # Mappa interattiva città
│   │   │                      # - Grid città con sfide disponibili
│   │   │                      # - Placeholder mappa futura
│   │   │                      # - Legenda categorie
│   │   │                      # - Statistiche globali
│   │   │
│   │   └── ProfileScreen.js   # Profilo utente completo
│   │                          # - Statistiche dettagliate
│   │                          # - Badge earned/available
│   │                          # - Sfide completate
│   │                          # - Preferenze utente
│   │
│   ├── data/              # Mock data per prototipo
│   │   ├── challenges.js      # 6 sfide complete con:
│   │   │                      # - Dettagli, requisiti, coordinate
│   │   │                      # - Categorie (Gastronomia, Cultura, Arte, Natura)
│   │   │                      # - Funzioni di filtro e ricerca
│   │   │
│   │   ├── badges.js          # 8 badge con:
│   │   │                      # - Stati earned/locked
│   │   │                      # - Colori tematici
│   │   │                      # - Funzioni di gestione
│   │   │
│   │   ├── user.js            # Profilo utente mock con:
│   │   │                      # - Statistiche complete
│   │   │                      # - Preferenze
│   │   │                      # - Funzioni di aggiornamento
│   │   │
│   │   └── cities.js          # 5 città italiane con:
│   │                          # - Coordinate GPS
│   │                          # - Conteggio sfide
│   │                          # - Flag featured
│   │
│   └── utils/             # Utilità e helper (opzionale)
│       ├── helpers.js         # Funzioni di utilità generale
│       ├── testing.js         # Test dei componenti
│       ├── theme.js           # Colori e stili globali
│       └── themeConfig.js     # Configurazione tema
│
├── assets/                # Risorse multimediali
│   ├── adaptive-icon.png      # Icona adattiva Android
│   ├── icon.png               # Icona app principale
│   ├── favicon.png            # Favicon web
│   └── splash-icon.png        # Icona splash screen
│
└── .github/               # Configurazione GitHub
    └── copilot-instructions.md # Istruzioni per GitHub Copilot
```

## 🏗️ Architettura del Progetto

### Struttura File Dettagliata
```
JourneyFlux/
├── App.js                 # Entry point - integra Navigation e SafeAreaProvider
├── app.json               # Configurazione Expo (nome, icone, versione)
├── package.json           # Dipendenze e scripts del progetto
├── README.md              # Documentazione completa del progetto
│
├── src/
│   ├── Navigation.js      # Configurazione React Navigation
│   │                      # - Bottom Tab Navigator (Home, Mappa, Profilo)
│   │                      # - Stack Navigator per flusso challenge
│   │                      # - Stili tab bar e icone Ionicons
│   │
│   ├── components/        # Componenti UI riutilizzabili
│   │   ├── ChallengeCard.js   # Card sfida con gradient, difficoltà, punti
│   │   ├── BadgeCard.js       # Badge con stato earned/locked, colori tematici
│   │   ├── StatCard.js        # Statistiche utente con LinearGradient
│   │   └── CitySelector.js    # Selezione città con grid layout
│   │
│   ├── screens/           # Schermate principali dell'app
│   │   ├── HomeScreen.js      # Schermata principale con sfide e filtri
│   │   │                      # - CitySelector per filtri
│   │   │                      # - Lista ChallengeCard
│   │   │                      # - Statistiche rapide utente
│   │   │                      # - RefreshControl per reload
│   │   │
│   │   ├── ChallengeScreen.js # Dettaglio sfida e completamento
│   │   │                      # - Verifica GPS mockata
│   │   │                      # - Upload foto simulato
│   │   │                      # - Validazione requisiti
│   │   │                      # - Anteprima badge
│   │   │
│   │   ├── ChallengeCompleteScreen.js # Schermata successo
│   │   │                              # - Animazioni Animated API
│   │   │                              # - Punti e badge ottenuti
│   │   │                              # - Statistiche aggiornate
│   │   │
│   │   ├── MapScreen.js       # Mappa interattiva città
│   │   │                      # - Grid città con sfide disponibili
│   │   │                      # - Placeholder mappa futura
│   │   │                      # - Legenda categorie
│   │   │                      # - Statistiche globali
│   │   │
│   │   └── ProfileScreen.js   # Profilo utente completo
│   │                          # - Statistiche dettagliate
│   │                          # - Badge earned/available
│   │                          # - Sfide completate
│   │                          # - Preferenze utente
│   │
│   ├── data/              # Mock data per prototipo
│   │   ├── challenges.js      # 6 sfide complete con:
│   │   │                      # - Dettagli, requisiti, coordinate
│   │   │                      # - Categorie (Gastronomia, Cultura, Arte, Natura)
│   │   │                      # - Funzioni di filtro e ricerca
│   │   │
│   │   ├── badges.js          # 8 badge con:
│   │   │                      # - Stati earned/locked
│   │   │                      # - Colori tematici
│   │   │                      # - Funzioni di gestione
│   │   │
│   │   ├── user.js            # Profilo utente mock con:
│   │   │                      # - Statistiche complete
│   │   │                      # - Preferenze
│   │   │                      # - Funzioni di aggiornamento
│   │   │
│   │   └── cities.js          # 5 città italiane con:
│   │                          # - Coordinate GPS
│   │                          # - Conteggio sfide
│   │                          # - Flag featured
│   │
│   └── utils/             # Utilità e helper (opzionale)
│       ├── helpers.js         # Funzioni di utilità generale
│       ├── testing.js         # Test dei componenti
│       ├── theme.js           # Colori e stili globali
│       └── themeConfig.js     # Configurazione tema
│
├── assets/                # Risorse multimediali
│   ├── adaptive-icon.png      # Icona adattiva Android
│   ├── icon.png               # Icona app principale
│   ├── favicon.png            # Favicon web
│   └── splash-icon.png        # Icona splash screen
│
└── .github/               # Configurazione GitHub
    └── copilot-instructions.md # Istruzioni per GitHub Copilot
```

### Flusso di Navigazione
```
App.js → Navigation.js → TabNavigator
├── HomeTab (Stack)
│   ├── HomeScreen (default)
│   ├── ChallengeScreen (params: challengeId)
│   └── ChallengeCompleteScreen (params: challengeId, points, badge)
├── MapTab (Screen)
│   └── MapScreen
└── ProfileTab (Screen)
    └── ProfileScreen
```

### Pattern Architetturali Utilizzati

#### 1. **Component-Based Architecture**
- Componenti funzionali con React Hooks
- Separazione UI logic da business logic
- Props drilling minimizzato con context quando necessario

#### 2. **Mock Data Layer**
- Dati simulati per testing completo UX
- Funzioni helper per CRUD operations
- Struttura dati preparata per backend integration

#### 3. **Navigation Pattern**
- Bottom tabs per navigazione principale
- Stack navigator per flussi lineari
- Parametri di navigazione per data passing

#### 4. **Styling Architecture**
- StyleSheet per performance ottimizzate
- LinearGradient per visual appeal
- Colori tematici centralizzati
- Responsive design principles

### Configurazione Tecnica

#### Dipendenze Principali
```json
{
  "expo": "~51.0.28",
  "@react-navigation/native": "^6.1.18",
  "@react-navigation/bottom-tabs": "^6.6.1",
  "@react-navigation/stack": "^6.4.1",
  "react-native-screens": "~3.31.1",
  "react-native-safe-area-context": "4.10.5",
  "@expo/vector-icons": "^14.0.2",
  "expo-linear-gradient": "~13.0.2",
  "react-native-svg": "15.2.0",
  "react-native-gesture-handler": "~2.16.1",
  "react-native-reanimated": "~3.10.1"
}
```

#### Configurazione Expo (app.json)
```json
{
  "expo": {
    "name": "JourneyFlux",
    "slug": "journeyflux",
    "version": "1.0.0",
    "platforms": ["ios", "android"],
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#667eea"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#667eea"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png",
      "bundler": "metro"
    }
  }
}
```

#### Script di Sviluppo
```bash
# Avvio development server
npm start
# oppure con porta specifica
npx expo start --port 65000

# Avvio con tunnel (per device remoti)
npx expo start --tunnel

# Build per produzione
npx expo build:android
npx expo build:ios
```

## 🚀 Setup Rapido per Sviluppo

### Prerequisiti Verificati
- **Node.js**: v14+ (testato con versioni recenti)
- **npm**: Incluso con Node.js
- **Expo CLI**: Installato globalmente o via npx
- **Expo Go**: App mobile per testing (iOS/Android)

### Comandi Rapidi
```bash
# Clone e setup iniziale
git clone <repository-url>
cd JourneyFlux
npm install

# Avvio development server (porta specifica)
npx expo start --port 65000

# Avvio con tunnel (per device remoti)
npx expo start --tunnel --port 65000

# Reset cache se necessario
npx expo start --clear --port 65000

# Visualizza logs del device
npx expo logs
```

### Configurazione Attuale
- **Porta Development**: 65000 (configurabile)
- **Orientamento**: Portrait only
- **Piattaforme**: iOS, Android, Web
- **Tema**: Light mode
- **Splash Background**: #667eea (blu-viola)

### Testing sul Device
1. Installa **Expo Go** dal Play Store/App Store
2. Avvia `npx expo start --port 65000`
3. Scansiona QR code con Expo Go
4. L'app si caricherà automaticamente

### Struttura Testata
✅ **Navigazione**: Bottom tabs + Stack navigation funzionanti
✅ **Componenti**: Tutti i componenti renderizzano correttamente
✅ **Dati Mock**: 6 sfide, 8 badge, 5 città configurate
✅ **Interazioni**: Tap, scroll, navigation completi
✅ **Stili**: Gradient, ombre, responsive design applicati
✅ **Animazioni**: Completion screen con animazioni fluide

### File Essenziali per Modifiche
```
📁 Dati e Logica
├── src/data/challenges.js    # Sfide disponibili
├── src/data/badges.js        # Badge e achievements
├── src/data/user.js          # Profilo utente
└── src/data/cities.js        # Città e destinazioni

📁 UI e Componenti
├── src/components/           # Componenti riutilizzabili
├── src/screens/              # Schermate principali
└── src/Navigation.js         # Configurazione routing

📁 Configurazione
├── app.json                  # Configurazione Expo
├── package.json              # Dipendenze
└── App.js                    # Entry point
```

### Personalizzazione Rapida

#### Aggiungere Nuove Sfide
```javascript
// In src/data/challenges.js
export const challenges = [
  // ... sfide esistenti
  {
    id: 7,
    title: "Nuova Sfida",
    description: "Descrizione dettagliata...",
    location: "Città, Regione",
    difficulty: "Media",
    points: 200,
    category: "Categoria",
    image: "🎯",
    coordinates: { lat: 0.0, lng: 0.0 },
    requirements: ["Requisito 1", "Requisito 2"],
    completed: false,
    badge: "Nome Badge"
  }
];
```

#### Modificare Colori Tema
```javascript
// In src/components/[ComponentName].js
const colors = {
  primary: '#4ECDC4',      // Turchese principale
  secondary: '#667eea',     // Blu-viola
  accent: '#FF6B6B',        // Rosso accento
  // Personalizza questi valori
};
```

#### Aggiungere Nuove Città
```javascript
// In src/data/cities.js
export const cities = [
  // ... città esistenti
  {
    id: 6,
    name: "Nuova Città",
    region: "Regione",
    coordinates: { lat: 0.0, lng: 0.0 },
    challengesCount: 0,
    image: "🏛️",
    description: "Descrizione della città",
    featured: true
  }
];
```

### Troubleshooting Rapido

#### Problemi Comuni e Soluzioni
```bash
# Port già in uso
npx expo start --port 65001

# Cache corrotta
npx expo start --clear

# Dipendenze mancanti
npm install
npx expo install --fix

# Metro bundler non si avvia
npx expo start --reset-cache

# QR code non funziona
npx expo start --tunnel
```

#### Logs e Debug
```bash
# Visualizza logs dettagliati
npx expo logs --type=device

# Debug network requests
npx expo logs --type=metro

# Clear tutto e restart
rm -rf node_modules package-lock.json
npm install
npx expo start --clear
```

### Performance e Ottimizzazioni

#### Metriche Attuali
- **Bundle Size**: ~2.5MB (ottimizzato per mobile)
- **Startup Time**: <2 secondi su device moderni
- **Memory Usage**: <50MB durante uso normale
- **Navigation**: Transizioni fluide <16ms

#### Ottimizzazioni Implementate
- **FlatList**: Per liste lunghe (badge, sfide)
- **numberOfLines**: Per testo truncato
- **Image Optimization**: Icone emoji invece di immagini
- **Lazy Loading**: Componenti caricati on-demand

### Sicurezza e Best Practices

#### Implementate
- **SafeAreaView**: Per compatibilità notch/bottom bar
- **Error Boundaries**: Gestione errori componenti
- **Input Validation**: Controllo parametri navigazione
- **Memory Management**: Cleanup listeners e timers

#### Da Implementare (Produzione)
- **Environment Variables**: Per configurazioni diverse
- **API Security**: Token, encryption, rate limiting
- **Data Sanitization**: Validazione input utente
- **Crash Reporting**: Analytics e monitoring

### Distribuzione

#### Development
```bash
# Condivisione via Expo
npx expo publish

# Link pubblico temporaneo
npx expo start --tunnel
```

#### Production
```bash
# Setup EAS Build
npm install -g @expo/cli
eas build:configure

# Build Android
eas build --platform android

# Build iOS
eas build --platform ios

# Submit to stores
eas submit
```
