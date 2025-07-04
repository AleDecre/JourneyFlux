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
├── src/
│   ├── Navigation.js      # Configurazione navigazione
│   ├── components/        # Componenti riutilizzabili
│   │   ├── ChallengeCard.js
│   │   ├── BadgeCard.js
│   │   ├── StatCard.js
│   │   └── CitySelector.js
│   ├── screens/           # Schermate principali
│   │   ├── HomeScreen.js
│   │   ├── ChallengeScreen.js
│   │   ├── ChallengeCompleteScreen.js
│   │   ├── MapScreen.js
│   │   └── ProfileScreen.js
│   └── data/              # Dati mock
│       ├── challenges.js
│       ├── badges.js
│       ├── user.js
│       └── cities.js
├── assets/                # Risorse multimediali
└── .github/
    └── copilot-instructions.md
```

## 🎨 Design System

### Colori Principali
- **Primario**: `#4ECDC4` (Turchese)
- **Secondario**: `#667eea` (Blu-viola)
- **Accent**: `#FF6B6B` (Rosso corallo)
- **Successo**: `#27AE60` (Verde)
- **Warning**: `#FFB74D` (Arancio)

### Tipografia
- **Titoli**: Font peso bold, dimensioni 20-28px
- **Corpo**: Font peso normal, dimensioni 14-16px
- **Piccolo**: Font peso 500, dimensioni 12-14px

### Componenti UI
- **Card**: Bordi arrotondati 12-16px, ombre leggere
- **Bottoni**: Gradient backgrounds, padding 12-16px
- **Badge**: Forma circolare, colori tematici
- **Navigazione**: Bottom tabs con icone Ionicons

## 🧪 Funzionalità Mock

### Dati Simulati
- **6 sfide** distribuite in 5 città italiane
- **8 badge** sbloccabili
- **Profilo utente** con statistiche complete
- **Verifica GPS** simulata per testing UI
- **Upload foto** mockato per flusso completo

### Interazioni
- Navigazione completa tra schermate
- Filtri funzionali per città
- Animazioni di completamento sfida
- Feedback visivo per tutti i touch

## 🔮 Roadmap Futura

### Fase 1 - Backend Integration
- [ ] Database MongoDB per dati persistenti
- [ ] API REST per sfide e profili utente
- [ ] Autenticazione utente sicura
- [ ] Sistema di punti in tempo reale

### Fase 2 - Funzionalità Avanzate
- [ ] GPS reale con geofencing
- [ ] Integrazione fotocamera
- [ ] AI per verifica automatica foto
- [ ] Push notifications per sfide nearby

### Fase 3 - Social Features
- [ ] Classifica globale e locale
- [ ] Sfide create dagli utenti
- [ ] Sistema di review e rating
- [ ] Condivisione social media

### Fase 4 - Tecnologie Emergenti
- [ ] Realtà aumentata per discovery
- [ ] Integrazione mappe 3D
- [ ] Machine learning per raccomandazioni
- [ ] Supporto multi-lingua

## 🤝 Contributi

Il progetto è attualmente in fase di prototipo. Per contribuire:
1. Fork del repository
2. Crea un branch per la tua feature
3. Commit delle modifiche
4. Push al branch
5. Apri una Pull Request

## 📄 Licenza

Questo progetto è distribuito sotto licenza MIT. Vedi il file `LICENSE` per dettagli.

## 📧 Contatti

Per domande o collaborazioni:
- Email: [info@journeyflux.com]
- GitHub: [github.com/journeyflux]

---

**JourneyFlux** - Trasforma ogni viaggio in un'avventura indimenticabile! 🚀🇮🇹
