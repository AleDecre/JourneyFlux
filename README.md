# JourneyFlux 🗺️

**Trasforma i tuoi viaggi in Italia in avventure narrative**

Una app React Native che combina **Percorsi Narrativi**, **Itinerari Community** e **Partner Experiences** per rendere ogni viaggio un'esperienza coinvolgente e memorabile.

---

## 🎯 Cosa Fa JourneyFlux

JourneyFlux è l'app che **trasforma l'Italia nei tuoi segreti personali**. Non più semplici sfide, ma **Percorsi Narrativi** che ti guidano alla scoperta di storie nascoste, misteri urbani e tesori che il 99% dei turisti non vedrà mai.

### ✅ **MVP 2.0 - COMPLETAMENTE IMPLEMENTATO E UI UNIFORMATA**

🎭 **Percorsi Narrativi Tematici** ✅
- 6 mini-avventure curate per Roma e Napoli
- Storie coinvolgenti: misteri, leggende, storia, arte
- Intro narrative + tappe GPS + foto-enigma finale
- Badge narrativi esclusivi e contenuti "Lo sapevi che?"

🗺️ **Itinerari Community & Tour Operator** ✅
- 5 esperienze complete (3 community + 2 tour operator)
- Sistema di rating e recensioni della community
- Creator profiles con badge verified
- Timeline dettagliate con costi e durata

🍷 **Partner Experiences** ✅
- 5 locali partner con offerte esclusive
- Sconti fino al 30% per utenti JourneyFlux
- Sistema di riscatto con QR codes
- Badge partner dedicati per collezionisti

📱 **UI Moderna e Funzionale** ✅
- Componenti specializzati per ogni tipo di contenuto
- Design gradient moderno con font Nunito
- Navigazione fluida tra tutte le schermate
- Filtri per città e tipologia di contenuto
- **Schermate di dettaglio uniformate**: Onboarding, Diario, Dettaglio Itinerario ora con font, colori e layout coerenti

🏆 **Badge & Passaporto Digitale** ✅
- 21 badge con sistema di rarità (comune, raro, epico)
- Passaporto visivo con badge categorizzati
- Sistema di livelli e progressione gamificata
- Badge narrativi, partner e community

📊 **Statistiche Complete** ✅
- Tracking di tutte le esperienze completate
- Conteggi corretti per ogni tipologia di contenuto
- Story Points, Partner visitati, Percorsi completati
- Progresso visuale e streak management

---

## 🚀 **NUOVO: AI Travel Planner Gamificato** ✨

### Flow Completo Pre-Viaggio → In-Viaggio → Post-Viaggio

🤖 **Onboarding Chat Conversazionale** ✅
- Chat step-by-step con AI che raccoglie le tue preferenze
- Risposte personalizzate generate da GPT-4/Mistral/Claude
- Domande mirate su durata, budget, interessi e stile di viaggio
- Fallback robusti per funzionamento anche senza API

🧠 **Generazione Itinerari AI** ✅
- Prompt strutturato con parametri dettagliati
- Output JSON formattato per visualizzazione nativa
- Contenuto ricco: attività, orari, costi, badge, consigli
- Personalizzazione basata su preferenze utente

📱 **Visualizzazione Avanzata** ✅
- ItineraryViewer con UI interattiva e moderna
- Giorni espandabili con timeline dettagliata
- Categorie colorate per tipi di attività
- Badge ottenibili e highlights gamificati

🔧 **Integrazione Multi-LLM** ✅
- Supporto OpenAI, Mistral, Claude
- Configurazione sicura con variabili d'ambiente
- Sistema di fallback automatico
- Performance monitoring e error handling

### 🎨 **Design System Unificato**

**Palette Colori**
- Primary: Turchese (#4ECDC4) 
- Secondary: Blu-viola (#667eea)
- Accent: Rosso corallo (#FF6B6B)
- Warning: Arancio (#FFB74D)
- Success: Verde (#27AE60)

**Tipografia**
- Nunito font family completa (300-800 weights)
- Gerarchie chiare per titoli, sottotitoli e body text
- Dimensioni responsive per tutti i device

**Componenti Riutilizzabili**
- `CalendarPicker`: Calendario nativo per selezione date
- `HybridItineraryCard`: Card universale per tappe itinerario
- `GeoReminderBanner`: Banner animato per notifiche geo
- `PassportBadge`: Badge stile passaporto per collezioni

### 🔧 **Architettura Tecnica**

**State Management**
- `PlannerContext`: React Context per stato globale planner
- Hook personalizzati per logica complessa
- Persistenza locale con mock data strutturati

**Navigation Flow**
- Tab aggiuntiva "Pianifica" per pre-trip
- Tab "Diario" per post-trip
- Stack navigation per flussi complessi
- Deep linking ready per condivisioni

**Mock AI & Geolocation**
- `generateItinerary()`: Generatore intelligente di itinerari
- `useGeoReminder()`: Hook per tracking posizione simulato
- Algoritmi di matching preferenze-contenuti
- Simulazione realistiche di tempi e costi

### 📱 **Come Testare il Travel Planner**

1. **Avvia l'app**: `npx expo start`
2. **Tab "Pianifica"**: Inizia onboarding conversazionale
3. **Compila preferenze**: Durata, città, interessi, budget
4. **Seleziona date**: Calendario interattivo
5. **Genera itinerario**: Algoritmo AI mock (2s processing)
6. **Esplora timeline**: Tappe giornaliere dettagliate
7. **Simula movimento**: Geo-reminder automatici
8. **Completa tappe**: Accumula punti e badge
9. **Visita "Diario"**: Riepilogo viaggi completati
10. **Controlla coupon**: Profilo → Sezione coupon

### 🎯 **User Stories Implementate**

**Pre-viaggio**
- ✅ Onboarding conversazionale per personalizzazione
- ✅ Pianificazione calendrizzata con date selezionabili
- ✅ Generazione itinerario AI-driven con preferenze

**In-viaggio**
- ✅ Percorso ibrido con mix di contenuti personalizzati
- ✅ Reminder geo-aware quando vicino a tappe
- ✅ Check-in semplificato con completamento tap

**Post-viaggio**
- ✅ Diario automatico con tutte le tappe completate
- ✅ Condivisione strutturata per social media
- ✅ Coupon reali per utilizzo partner

**Loyalty & Engagement**
- ✅ Feed community con recensioni e foto
- ✅ Sistema coupon progressivo dopo N viaggi
- ✅ Suggerimenti automatici per prossimi weekend

### 🔥 **Funzionalità Avanzate**

**Intelligenza Artificiale**
- Matching automatico preferenze-contenuti
- Ottimizzazione percorsi per tempo e budget
- Suggerimenti personalizzati real-time

**Gamification Avanzata**
- Streak di viaggio e achievement epici
- Leaderboard locali e nazionali
- Sistema di referral con ricompense

**Social Features**
- Condivisione itinerari tra utenti
- Recensioni e rating per ogni esperienza
- Feed di scoperte della community

**Partner Integration**
- API integrazione sistemi POS partner
- Tracking ROI per business locali
- Dashboard analytics per partner

---

## 🚀 **Inizia Subito**

```bash
# Clona il repository
git clone https://github.com/tuonome/JourneyFlux.git

# Entra nella directory
cd JourneyFlux/app

# Installa le dipendenze
npm install

# Avvia l'app
npx expo start
```

### Requisiti

- Node.js 16+
- Expo CLI
- Expo Go app (per testing su mobile)

---

## 🎮 **Come Funziona**

1. **🏙️ Scegli una Città** - Milano, Roma, Napoli o Firenze
2. **🎭 Esplora i Contenuti** - Percorsi narrativi, itinerari e partner
3. **📍 Completa le Esperienze** - Segui le storie e raccogli badge
4. **🏆 Colleziona Badge** - Sblocca il passaporto digitale
5. **📈 Scala i Livelli** - Diventa un Maestro Esploratore

---

## 🎭 **Esempi di Contenuti**

### 👻 **I Fantasmi di Castel Sant'Angelo**
**Roma - Percorso Narrativo Misterioso** (55 min)

La storia: Nel 590 d.C., mentre la peste devastava Roma, Papa Gregorio Magno vide l'Arcangelo Michele ringuainare la spada sulla sommità del Mausoleo di Adriano...

**Tappe**: Ponte Sant'Angelo → Cortile dell'Angelo → Terrazza dell'Angelo  
**Ricompensa**: Badge "Cacciatore di Fantasmi" + Storia esclusiva

### 🍸 **Il Codice Segreto dell'Aperitivo**
**Roma - Partner Experience** (90 min)

Un tour tra i bar storici che nascondono simboli alchemici nel loro design...

**Partner**: Bar del Fico (sconto 33%) + Salotto 42 + Jerry Thomas  
**Ricompensa**: Badge "Maestro dell'Aperitivo" + Mappa bar segreti

### 🎨 **I Simboli Nascosti di Firenze**
**Firenze - Itinerario Community** (Mezza giornata)

**Creato da**: Marco_FI_Explorer (⭐⭐⭐⭐⭐ 127 reviews)  
**Timeline**: Cappuccino → Palazzo Pitti → Ponte Vecchio → Duomo  
**Ricompensa**: Badge "Decifratore" + Accesso percorso "Medici Secrets"

---

## 🛠️ **Tecnologie Utilizzate**

- **React Native** + **Expo** - Framework cross-platform
- **React Navigation** - Bottom tabs + Stack navigation
- **Linear Gradient** - UI moderna con gradienti
- **Expo Vector Icons** - Iconografia intuitiva
- **Font Nunito** - Typography system professionale

---

## 📊 **Stato del Progetto**

### ✅ **COMPLETATO** (MVP 2.0 Funzionante)

- ✅ **Architettura Dati**: 6 tipologie di contenuto, 21 badge, statistiche complete
- ✅ **UI/UX**: 3 schermate principali + 4 componenti specializzati
- ✅ **Navigazione**: Tutti i flussi funzionanti
- ✅ **Contenuti**: 16 esperienze totali (6 narrativi + 5 itinerari + 5 partner)

### 🎯 **PROSSIMI STEP (Roadmap)**

1. **Animazioni e Gamification Avanzata**
   - Animazioni di celebrazione (badge, viaggio completato)
   - Social sharing (Instagram Stories, card condivisibili)
2. **Esperienze Social e Community**
   - Recensioni, rating, leaderboard, profili creator
   - Commenti e interazione tra utenti
3. **Backend Production**
   - API REST, autenticazione, database cloud
   - Integrazione GPS reale e camera
4. **Testing & Ottimizzazione**
   - Test cross-platform, performance, accessibility
   - Ottimizzazione immagini e bundle
5. **Espansione contenuti**
   - Nuove città, nuovi percorsi, nuove partnership

---

## 🤝 **Contribuisci**

- **👩‍💻 Sviluppatori** - React Native, Backend, API
- **🎨 Designer** - UI/UX, Grafica, Branding
- **✍️ Content Creator** - Nuovi percorsi e storie
- **🧪 Beta Tester** - Feedback e bug reporting

### Come Contribuire

1. Fork del progetto
2. Crea un branch (`git checkout -b feature/AmazingFeature`)
3. Commit le modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

---

## 📄 **Licenza**

Questo progetto è sotto licenza MIT. Vedi il file `LICENSE` per maggiori dettagli.

---

<div align="center">

**🚀 Trasforma ogni viaggio in un'avventura narrativa! 🎭**

**Status**: ✅ **MVP 2.0 COMPLETAMENTE FUNZIONANTE**

[⭐ Lascia una stella](https://github.com/tuonome/JourneyFlux) | [🐛 Segnala un bug](https://github.com/tuonome/JourneyFlux/issues) | [💡 Proponi una feature](https://github.com/tuonome/JourneyFlux/issues)

</div>
