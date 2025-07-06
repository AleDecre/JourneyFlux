// Partner Experiences per JourneyFlux MVP 2.0
// Esperienze esclusive con locali partner (bar, ristoranti, botteghe)

import { CONTENT_TYPES, PARTNER_TYPES } from './contentTypes.js';

// 🍷 PARTNER EXPERIENCES - ROMA

const partnerExperiencesRoma = [
  {
    id: 'pe_roma_bar_fico_alchimista',
    type: CONTENT_TYPES.PARTNER_EXPERIENCE,
    title: 'Aperitivo dell\'Alchimista',
    subtitle: 'Il cocktail segreto ispirato ai simboli romani',
    city: 'Roma',
    
    // Informazioni partner
    partner: {
      id: 'partner_bar_fico_roma',
      name: 'Bar del Fico',
      type: PARTNER_TYPES.BAR,
      address: 'Piazza del Fico, 26, 00186 Roma',
      coordinates: { lat: 41.8986, lng: 12.4768 },
      phone: '+39 06 686 5205',
      website: 'www.bardelfico.roma.it',
      socialMedia: {
        instagram: '@bardelfico_roma',
        facebook: 'Bar del Fico Roma'
      },
      
      // Descrizione partner
      description: 'Cocktail bar storico nel cuore di Roma, frequentato da artisti e intellettuali da oltre 30 anni. Famoso per i suoi cocktail creativi e l\'atmosfera autentica.',
      
      // Caratteristiche
      ambiance: 'Elegante ma informale',
      specialties: ['cocktail_creativi', 'aperitivi_gourmet', 'atmosfera_artistica'],
      openingHours: {
        monday: '17:00-02:00',
        tuesday: '17:00-02:00',
        wednesday: '17:00-02:00',
        thursday: '17:00-02:00',
        friday: '17:00-02:00',
        saturday: '17:00-02:00',
        sunday: '17:00-01:00'
      },
      
      // Informazioni pratiche
      priceRange: '€€€',
      acceptsReservations: true,
      creditCards: true,
      languages: ['italiano', 'inglese', 'francese'],
      
      // Valutazioni
      rating: 4.6,
      reviewsCount: 1247,
      verified: true,
      partnerSince: '2025-03-15'
    },
    
    // L'esperienza offerta
    experience: {
      title: 'Aperitivo dell\'Alchimista',
      description: 'Cocktail esclusivo creato appositamente per JourneyFlux, ispirato ai simboli alchemici nascosti nei monumenti romani. Accompagnato da stuzzichini gourmet.',
      
      // Cosa include
      includes: [
        'Cocktail "Alchimista Romano" (ricetta esclusiva)',
        'Selezione di stuzzichini gourmet',
        'Spiegazione dei simboli alchemici romani',
        'Carta da cocktail personalizzata con simboli'
      ],
      
      // Prezzo e sconto
      originalPrice: 18,
      discountedPrice: 12,
      discountPercentage: 33,
      savings: 6,
      
      // Disponibilità
      validDays: ['martedi', 'mercoledi', 'giovedi'], // Giorni più tranquilli
      validHours: '18:00-20:00', // Happy hour
      maxRedemptions: 2, // Massimo 2 per utente
      
      // Periodo validità
      validFrom: '2025-07-01',
      validUntil: '2025-12-31',
      
      // Dettagli cocktail
      cocktailDetails: {
        name: 'Alchimista Romano',
        ingredients: ['Gin botanico', 'Vermouth rosso', 'Amaro alle erbe', 'Sciroppo di miele', 'Bitters arancio'],
        preparation: 'Mixato con ghiaccio e decorato con scorza d\'arancia fiammeggiata',
        glassware: 'Coppa vintage con simboli alchemici incisi',
        garnish: 'Scorza d\'arancia + rametto di rosmarino'
      }
    },
    
    // Come riscattare l'offerta
    redemption: {
      method: 'qr_code',
      code: 'JOURNEYFLUX_ALCHIMISTA',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=JOURNEYFLUX_ALCHIMISTA',
      instructions: 'Mostra questo QR code al barista e menziona "JourneyFlux Alchimista". Valido solo negli orari indicati.',
      
      // Processo di riscatto
      steps: [
        'Presentati al Bar del Fico negli orari validi',
        'Mostra il QR code al barista',
        'Menziona "JourneyFlux - Aperitivo dell\'Alchimista"',
        'Goditi il tuo cocktail esclusivo!'
      ],
      
      // Termini e condizioni
      terms: [
        'Valido solo nei giorni e orari indicati',
        'Massimo 2 riscatti per utente',
        'Non cumulabile con altre offerte',
        'Prenotazione consigliata nei weekend'
      ]
    },
    
    // Gamification
    rewards: {
      points: 75,
      storyPoints: 25,
      badge: 'badge_alchimista_aperitivo',
      unlockContent: {
        title: 'I Simboli Alchemici di Roma',
        content: 'Scopri dove sono nascosti i simboli alchemici nei monumenti romani e cosa rappresentano...'
      }
    },
    
    // Condizioni di sblocco
    requirements: {
      minAge: 18, // Esperienza con alcool
      unlockCondition: 'after_narrative_path_completion',
      prerequisites: ['np_roma_alchimia_pantheon'], // Sblocca dopo percorso alchimia
      timeRestrictions: 'valid_hours_only'
    },
    
    // Metadati
    createdDate: '2025-07-01',
    lastUpdated: '2025-07-06',
    tags: ['aperitivo', 'cocktail_esclusivo', 'alchimia', 'roma_centro'],
    featured: true,
    active: true,
    
    // Statistiche
    totalRedemptions: 89,
    averageRating: 4.7,
    totalReviews: 67,
    
    // Social
    socialShare: {
      template: 'aperitivo_alchimista_fico',
      title: 'Ho bevuto l\'Aperitivo dell\'Alchimista! 🍸',
      hashtags: ['#JourneyFlux', '#AperitivoAlchimista', '#BarDelFico', '#RomaCocktail']
    }
  },

  {
    id: 'pe_roma_checchino_quinto_quarto',
    type: CONTENT_TYPES.PARTNER_EXPERIENCE,
    title: 'Degustazione Quinto Quarto',
    subtitle: 'I sapori perduti della tradizione romana',
    city: 'Roma',
    
    partner: {
      id: 'partner_checchino_roma',
      name: 'Checchino dal 1887',
      type: PARTNER_TYPES.RISTORANTE,
      address: 'Via di Monte Testaccio, 30, 00153 Roma',
      coordinates: { lat: 41.8736, lng: 12.4793 },
      phone: '+39 06 574 6318',
      website: 'www.checchino-dal-1887.com',
      socialMedia: {
        instagram: '@checchino1887',
        facebook: 'Checchino dal 1887'
      },
      
      description: 'Ristorante storico dal 1887, custode delle tradizioni culinarie romane più autentiche. Specializzato nel "quinto quarto" e nelle ricette della Roma popolare.',
      
      ambiance: 'Trattoria storica familiare',
      specialties: ['quinto_quarto', 'cucina_romana_tradizionale', 'ricette_storiche'],
      openingHours: {
        monday: 'Chiuso',
        tuesday: '12:30-15:00, 19:30-23:00',
        wednesday: '12:30-15:00, 19:30-23:00',
        thursday: '12:30-15:00, 19:30-23:00',
        friday: '12:30-15:00, 19:30-23:00',
        saturday: '12:30-15:00, 19:30-23:00',
        sunday: '12:30-15:00, 19:30-23:00'
      },
      
      priceRange: '€€',
      acceptsReservations: true,
      creditCards: true,
      languages: ['italiano', 'inglese'],
      
      rating: 4.8,
      reviewsCount: 892,
      verified: true,
      partnerSince: '2025-04-01'
    },
    
    experience: {
      title: 'Degustazione Quinto Quarto',
      description: 'Menu degustazione esclusivo dedicato al "quinto quarto" - le parti "povere" dell\'animale che la tradizione romana ha trasformato in prelibatezze.',
      
      includes: [
        'Antipasto: Supplì al telefono tradizionale',
        'Primo: Rigatoni con la pajata (solo giovedì-domenica)',
        'Secondo: Coda alla vaccinara',
        'Dolce: Maritozzo con la panna',
        'Vino: Bicchiere di Frascati DOC',
        'Spiegazione storia di ogni piatto'
      ],
      
      originalPrice: 45,
      discountedPrice: 32,
      discountPercentage: 29,
      savings: 13,
      
      validDays: ['giovedi', 'venerdi', 'sabato', 'domenica'],
      validHours: '19:30-21:00',
      maxRedemptions: 1,
      
      validFrom: '2025-07-01',
      validUntil: '2025-11-30',
      
      // Dettagli piatti
      menuDetails: {
        note: 'Menu varia leggermente in base alla stagione e disponibilità',
        specialties: [
          {
            name: 'Rigatoni con la pajata',
            description: 'Intestino di vitello da latte con sugo di pomodoro',
            availability: 'Solo giovedì-domenica'
          },
          {
            name: 'Coda alla vaccinara',
            description: 'Coda di bue stufata con sedano, carote e pomodoro',
            availability: 'Sempre disponibile'
          }
        ]
      }
    },
    
    redemption: {
      method: 'phone_call',
      code: 'JOURNEYFLUX_QUINTOQ',
      phone: '+39 06 574 6318',
      instructions: 'Chiama per prenotare e menziona "JourneyFlux - Degustazione Quinto Quarto". Prenotazione obbligatoria.',
      
      steps: [
        'Chiama il ristorante per prenotare',
        'Menziona "JourneyFlux - Degustazione Quinto Quarto"',
        'Conferma giorno e orario disponibili',
        'Presentati puntuale con il codice'
      ],
      
      terms: [
        'Prenotazione obbligatoria',
        'Valido solo nei giorni e orari indicati',
        'Menu soggetto a disponibilità ingredienti',
        'Avvisare di eventuali allergie'
      ]
    },
    
    rewards: {
      points: 100,
      storyPoints: 40,
      badge: 'badge_custode_tradizioni',
      unlockContent: {
        title: 'La Storia del Quinto Quarto',
        content: 'Scopri come i macellai romani inventarono ricette geniali per non sprecare nulla dell\'animale...'
      }
    },
    
    requirements: {
      minAge: 12,
      unlockCondition: 'after_points_threshold',
      pointsRequired: 200,
      prerequisites: [],
      timeRestrictions: 'valid_hours_only'
    },
    
    createdDate: '2025-06-15',
    lastUpdated: '2025-07-06',
    tags: ['cucina_romana', 'tradizione', 'quinto_quarto', 'testaccio'],
    featured: true,
    active: true,
    
    totalRedemptions: 34,
    averageRating: 4.9,
    totalReviews: 28,
    
    socialShare: {
      template: 'ho_assaggiato_quinto_quarto',
      title: 'Ho assaggiato il vero Quinto Quarto romano! 🍝',
      hashtags: ['#JourneyFlux', '#QuintoQuarto', '#Checchino1887', '#CucinaRomana']
    }
  },

  {
    id: 'pe_roma_polvere_tempo_libreria',
    type: CONTENT_TYPES.PARTNER_EXPERIENCE,
    title: 'Caccia al Libro Perduto',
    subtitle: 'Trova il libro segreto nella libreria più antica di Roma',
    city: 'Roma',
    
    partner: {
      id: 'partner_polvere_tempo_roma',
      name: 'Polvere di Tempo - Libreria Antiquaria',
      type: PARTNER_TYPES.BOTTEGA,
      address: 'Via del Governo Vecchio, 51, 00186 Roma',
      coordinates: { lat: 41.8962, lng: 12.4702 },
      phone: '+39 06 686 0847',
      website: 'www.polverditempo.it',
      socialMedia: {
        instagram: '@polverditempo_roma',
        facebook: 'Polvere di Tempo Roma'
      },
      
      description: 'Libreria antiquaria specializzata in testi rari, manoscritti e libri fuori catalogo. Un tesoro nascosto nel cuore di Roma.',
      
      ambiance: 'Libreria antiquaria magica',
      specialties: ['libri_rari', 'manoscritti_antichi', 'prime_edizioni'],
      openingHours: {
        monday: '15:00-19:30',
        tuesday: '10:00-13:00, 15:00-19:30',
        wednesday: '10:00-13:00, 15:00-19:30',
        thursday: '10:00-13:00, 15:00-19:30',
        friday: '10:00-13:00, 15:00-19:30',
        saturday: '10:00-13:00, 15:00-19:30',
        sunday: 'Chiuso'
      },
      
      priceRange: '€€',
      acceptsReservations: false,
      creditCards: true,
      languages: ['italiano', 'inglese', 'francese'],
      
      rating: 4.9,
      reviewsCount: 445,
      verified: true,
      partnerSince: '2025-05-01'
    },
    
    experience: {
      title: 'Caccia al Libro Perduto',
      description: 'Gioco di ricerca in libreria per trovare un libro "perduto" che contiene segreti sulla storia di Roma. Una volta trovato, è tuo!',
      
      includes: [
        'Mappa della libreria con indizi',
        'Serie di enigmi letterari da risolvere',
        'Libro premio una volta trovato',
        'Segnalibro personalizzato JourneyFlux',
        'Tè o caffè offerto dal proprietario'
      ],
      
      originalPrice: 25,
      discountedPrice: 15,
      discountPercentage: 40,
      savings: 10,
      
      validDays: ['martedi', 'mercoledi', 'giovedi', 'venerdi'],
      validHours: '15:00-18:00',
      maxRedemptions: 1,
      
      validFrom: '2025-07-01',
      validUntil: '2025-10-31',
      
      // Dettagli gioco
      gameDetails: {
        duration: '30-45 minuti',
        difficulty: 'Media',
        prizes: [
          'Libro di storia romana (valore €15-20)',
          'Segnalibro personalizzato',
          'Sconto 10% su acquisti futuri'
        ],
        rules: 'Segui gli indizi, risolvi gli enigmi, trova il libro nascosto!'
      }
    },
    
    redemption: {
      method: 'in_person',
      code: 'JOURNEYFLUX_LIBRO',
      instructions: 'Presentati in libreria negli orari validi e chiedi del "Gioco della Caccia al Libro Perduto".',
      
      steps: [
        'Entra in libreria negli orari validi',
        'Chiedi del "Gioco della Caccia al Libro Perduto"',
        'Mostra il codice JourneyFlux',
        'Ricevi la mappa e inizia la caccia!'
      ],
      
      terms: [
        'Valido solo negli orari indicati',
        'Un gioco per volta per persona',
        'Tempo limite: 45 minuti',
        'Libro premio non scambiabile'
      ]
    },
    
    rewards: {
      points: 60,
      storyPoints: 30,
      badge: 'badge_cacciatore_libri',
      unlockContent: {
        title: 'Le Librerie Segrete di Roma',
        content: 'Scopri le librerie nascoste di Roma dove si possono trovare tesori letterari unici...'
      }
    },
    
    requirements: {
      minAge: 14,
      unlockCondition: 'after_narrative_path_completion',
      prerequisites: ['np_roma_fantasmi_castel', 'np_roma_alchimia_pantheon'],
      timeRestrictions: 'valid_hours_only'
    },
    
    createdDate: '2025-06-10',
    lastUpdated: '2025-07-06',
    tags: ['libreria', 'libri_rari', 'caccia_tesoro', 'cultura'],
    featured: false,
    active: true,
    
    totalRedemptions: 23,
    averageRating: 4.8,
    totalReviews: 19,
    
    socialShare: {
      template: 'ho_trovato_libro_perduto',
      title: 'Ho trovato il libro perduto! 📚',
      hashtags: ['#JourneyFlux', '#LibroPerduto', '#LibreriaAntiquaria', '#CacciaTesoro']
    }
  }
];

// 🍷 PARTNER EXPERIENCES - NAPOLI

const partnerExperiencesNapoli = [
  {
    id: 'pe_napoli_sorbillo_pizza_segreto',
    type: CONTENT_TYPES.PARTNER_EXPERIENCE,
    title: 'Pizza del Segreto',
    subtitle: 'La pizza con l\'ingrediente che non troverai mai sul menu',
    city: 'Napoli',
    
    partner: {
      id: 'partner_sorbillo_napoli',
      name: 'Pizzeria Gino Sorbillo',
      type: PARTNER_TYPES.RISTORANTE,
      address: 'Via dei Tribunali, 32, 80138 Napoli',
      coordinates: { lat: 40.8518, lng: 14.2582 },
      phone: '+39 081 446 643',
      website: 'www.sorbillo.it',
      socialMedia: {
        instagram: '@sorbillo_official',
        facebook: 'Pizzeria Gino Sorbillo'
      },
      
      description: 'Pizzeria storica napoletana, famosa in tutto il mondo per la pizza napoletana autentica. Gino Sorbillo è l\'ambasciatore della pizza nel mondo.',
      
      ambiance: 'Pizzeria napoletana autentica',
      specialties: ['pizza_napoletana', 'impasto_tradizionale', 'ingredienti_dop'],
      openingHours: {
        monday: '12:00-15:30, 19:00-23:30',
        tuesday: '12:00-15:30, 19:00-23:30',
        wednesday: '12:00-15:30, 19:00-23:30',
        thursday: '12:00-15:30, 19:00-23:30',
        friday: '12:00-15:30, 19:00-23:30',
        saturday: '12:00-15:30, 19:00-23:30',
        sunday: '12:00-15:30, 19:00-23:30'
      },
      
      priceRange: '€€',
      acceptsReservations: false,
      creditCards: true,
      languages: ['italiano', 'inglese'],
      
      rating: 4.7,
      reviewsCount: 3456,
      verified: true,
      partnerSince: '2025-03-01'
    },
    
    experience: {
      title: 'Pizza del Segreto',
      description: 'Pizza speciale con un ingrediente segreto che Gino Sorbillo non rivela mai. Solo per gli utenti JourneyFlux!',
      
      includes: [
        'Pizza "del Segreto" con ingrediente misterioso',
        'Spiegazione dell\'ingrediente segreto',
        'Bibita o birra a scelta',
        'Ricetta scritta a mano da Gino',
        'Foto ricordo con il pizzaiolo'
      ],
      
      originalPrice: 16,
      discountedPrice: 12,
      discountPercentage: 25,
      savings: 4,
      
      validDays: ['lunedi', 'martedi', 'mercoledi'],
      validHours: '12:00-14:30, 19:00-21:00',
      maxRedemptions: 1,
      
      validFrom: '2025-07-01',
      validUntil: '2025-12-31',
      
      // Dettagli pizza
      pizzaDetails: {
        base: 'Impasto napoletano tradizionale 24h di lievitazione',
        cookingMethod: 'Forno a legna a 450°C',
        secretIngredient: 'Rivelato solo al momento del servizio',
        note: 'Ingrediente segreto cambia settimanalmente'
      }
    },
    
    redemption: {
      method: 'qr_code',
      code: 'JOURNEYFLUX_SEGRETO',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=JOURNEYFLUX_SEGRETO',
      instructions: 'Presentati in pizzeria, mostra il QR code e chiedi la "Pizza del Segreto JourneyFlux".',
      
      steps: [
        'Presentati in pizzeria negli orari validi',
        'Fai la coda normale (no prenotazioni)',
        'Mostra il QR code al momento dell\'ordine',
        'Chiedi la "Pizza del Segreto JourneyFlux"'
      ],
      
      terms: [
        'Valido solo negli orari indicati',
        'Soggetto a disponibilità posti',
        'Ingrediente segreto varia settimanalmente',
        'No prenotazioni, solo coda normale'
      ]
    },
    
    rewards: {
      points: 80,
      storyPoints: 35,
      badge: 'badge_custode_segreto_pizza',
      unlockContent: {
        title: 'I Segreti della Pizza Napoletana',
        content: 'Scopri tutti i segreti della vera pizza napoletana: dall\'impasto alla cottura, dalle tecniche ai trucchi dei maestri pizzaioli...'
      }
    },
    
    requirements: {
      minAge: 6,
      unlockCondition: 'after_narrative_path_completion',
      prerequisites: ['np_napoli_pizza_margherita_complotto'],
      timeRestrictions: 'valid_hours_only'
    },
    
    createdDate: '2025-05-20',
    lastUpdated: '2025-07-06',
    tags: ['pizza', 'sorbillo', 'ingrediente_segreto', 'napoletana'],
    featured: true,
    active: true,
    
    totalRedemptions: 156,
    averageRating: 4.8,
    totalReviews: 134,
    
    socialShare: {
      template: 'ho_mangiato_pizza_segreto',
      title: 'Ho mangiato la Pizza del Segreto! 🍕',
      hashtags: ['#JourneyFlux', '#PizzaDelSegreto', '#Sorbillo', '#NapoliPizza']
    }
  },

  {
    id: 'pe_napoli_gay_odin_cioccolato_alchimia',
    type: CONTENT_TYPES.PARTNER_EXPERIENCE,
    title: 'Laboratorio di Alchimia del Cioccolato',
    subtitle: 'Crea il tuo cioccolato con ricette segrete del 1800',
    city: 'Napoli',
    
    partner: {
      id: 'partner_gay_odin_napoli',
      name: 'Gay-Odin Cioccolateria',
      type: PARTNER_TYPES.BOTTEGA,
      address: 'Via Benedetto Croce, 61, 80134 Napoli',
      coordinates: { lat: 40.8474, lng: 14.2533 },
      phone: '+39 081 551 7827',
      website: 'www.gay-odin.it',
      socialMedia: {
        instagram: '@gayodin_official',
        facebook: 'Gay-Odin Cioccolateria'
      },
      
      description: 'Storica cioccolateria napoletana del 1894, famosa per le sue creazioni artigianali e le ricette segrete tramandate di generazione in generazione.',
      
      ambiance: 'Laboratorio artigianale storico',
      specialties: ['cioccolato_artigianale', 'ricette_storiche', 'creazioni_artistiche'],
      openingHours: {
        monday: '09:00-20:00',
        tuesday: '09:00-20:00',
        wednesday: '09:00-20:00',
        thursday: '09:00-20:00',
        friday: '09:00-20:00',
        saturday: '09:00-20:00',
        sunday: '10:00-19:00'
      },
      
      priceRange: '€€€',
      acceptsReservations: true,
      creditCards: true,
      languages: ['italiano', 'inglese'],
      
      rating: 4.8,
      reviewsCount: 892,
      verified: true,
      partnerSince: '2025-04-15'
    },
    
    experience: {
      title: 'Laboratorio di Alchimia del Cioccolato',
      description: 'Workshop esclusivo per creare il proprio cioccolato seguendo ricette segrete del 1800. Un\'esperienza sensoriale unica.',
      
      includes: [
        'Workshop di 2 ore con maestro cioccolatiere',
        'Creazione di 3 tipi di cioccolato personalizzati',
        'Degustazione guidata di 5 cioccolati storici',
        'Scatola regalo con creazioni personali',
        'Ricettario con formule segrete',
        'Certificato di "Apprendista Alchimista"'
      ],
      
      originalPrice: 65,
      discountedPrice: 45,
      discountPercentage: 31,
      savings: 20,
      
      validDays: ['sabato', 'domenica'],
      validHours: '15:00-17:00',
      maxRedemptions: 1,
      
      validFrom: '2025-07-01',
      validUntil: '2025-12-31',
      
      // Dettagli workshop
      workshopDetails: {
        duration: '2 ore',
        maxParticipants: 8,
        difficulty: 'Principiante',
        techniques: [
          'Temperaggio del cioccolato',
          'Creazione di ganache',
          'Decorazioni artistiche',
          'Invecchiamento aromatico'
        ]
      }
    },
    
    redemption: {
      method: 'phone_call',
      code: 'JOURNEYFLUX_ALCHIMIA',
      phone: '+39 081 551 7827',
      instructions: 'Chiama per prenotare il "Laboratorio di Alchimia del Cioccolato JourneyFlux". Prenotazione obbligatoria.',
      
      steps: [
        'Chiama per prenotare il workshop',
        'Menziona "JourneyFlux - Alchimia del Cioccolato"',
        'Scegli data e orario disponibili',
        'Conferma presenza 24h prima'
      ],
      
      terms: [
        'Prenotazione obbligatoria con 48h di anticipo',
        'Massimo 8 partecipanti per sessione',
        'Cancellazione gratuita fino a 24h prima',
        'Portare abbigliamento comodo'
      ]
    },
    
    rewards: {
      points: 120,
      storyPoints: 50,
      badge: 'badge_alchimista_cioccolato',
      unlockContent: {
        title: 'La Storia del Cioccolato a Napoli',
        content: 'Scopri come il cioccolato arrivò a Napoli nel 1600 e come i maestri napoletani svilupparono tecniche uniche...'
      }
    },
    
    requirements: {
      minAge: 8,
      unlockCondition: 'after_points_threshold',
      pointsRequired: 300,
      prerequisites: [],
      timeRestrictions: 'weekend_only'
    },
    
    createdDate: '2025-06-01',
    lastUpdated: '2025-07-06',
    tags: ['cioccolato', 'workshop', 'gay_odin', 'alchimia', 'artigianato'],
    featured: true,
    active: true,
    
    totalRedemptions: 45,
    averageRating: 4.9,
    totalReviews: 38,
    
    socialShare: {
      template: 'ho_creato_cioccolato_alchimia',
      title: 'Ho creato il mio cioccolato alchemico! 🍫',
      hashtags: ['#JourneyFlux', '#AlchimiaCioccolato', '#GayOdin', '#WorkshopNapoli']
    }
  }
];

// 📊 ARRAY COMPLETO E FUNZIONI HELPER

export const partnerExperiences = [
  ...partnerExperiencesRoma,
  ...partnerExperiencesNapoli
];

/**
 * Ottiene tutte le esperienze partner
 * @returns {Array} Array di esperienze partner
 */
export const getAllPartnerExperiences = () => partnerExperiences;

/**
 * Ottiene esperienze partner per città
 * @param {string} city - Nome della città
 * @returns {Array} Array di esperienze per città
 */
export const getPartnerExperiencesByCity = (city) => {
  return partnerExperiences.filter(experience => 
    experience.city.toLowerCase() === city.toLowerCase()
  );
};

/**
 * Ottiene esperienze partner per tipo
 * @param {string} type - Tipo partner (bar, ristorante, bottega, etc.)
 * @returns {Array} Array di esperienze per tipo
 */
export const getPartnerExperiencesByType = (type) => {
  return partnerExperiences.filter(experience => 
    experience.partner.type === type
  );
};

/**
 * Ottiene esperienza partner per ID
 * @param {string} id - ID dell'esperienza
 * @returns {Object|null} Esperienza partner o null
 */
export const getPartnerExperienceById = (id) => {
  return partnerExperiences.find(experience => experience.id === id) || null;
};

/**
 * Ottiene esperienze partner featured
 * @returns {Array} Array di esperienze featured
 */
export const getFeaturedPartnerExperiences = () => {
  return partnerExperiences.filter(experience => experience.featured === true);
};

/**
 * Ottiene esperienze partner attive
 * @returns {Array} Array di esperienze attive
 */
export const getActivePartnerExperiences = () => {
  return partnerExperiences.filter(experience => experience.active === true);
};

/**
 * Ottiene esperienze partner per fascia di prezzo
 * @param {number} maxPrice - Prezzo massimo
 * @returns {Array} Array di esperienze nella fascia di prezzo
 */
export const getPartnerExperiencesByPrice = (maxPrice) => {
  return partnerExperiences.filter(experience => 
    experience.experience.discountedPrice <= maxPrice
  );
};

/**
 * Ottiene esperienze partner disponibili per utente
 * @param {Object} user - Oggetto utente con punti e percorsi completati
 * @returns {Array} Array di esperienze disponibili
 */
export const getAvailablePartnerExperiences = (user) => {
  return partnerExperiences.filter(experience => {
    const requirements = experience.requirements;
    
    // Controllo età
    if (requirements.minAge && user.age < requirements.minAge) return false;
    
    // Controllo punti
    if (requirements.pointsRequired && user.totalPoints < requirements.pointsRequired) return false;
    
    // Controllo prerequisiti
    if (requirements.prerequisites && requirements.prerequisites.length > 0) {
      const hasAllPrerequisites = requirements.prerequisites.every(prereq => 
        user.completedPaths?.includes(prereq)
      );
      if (!hasAllPrerequisites) return false;
    }
    
    // Controllo se attiva
    if (!experience.active) return false;
    
    return true;
  });
};

/**
 * Ottiene esperienze partner per partner specifico
 * @param {string} partnerId - ID del partner
 * @returns {Array} Array di esperienze del partner
 */
export const getPartnerExperiencesByPartnerId = (partnerId) => {
  return partnerExperiences.filter(experience => 
    experience.partner.id === partnerId
  );
};

/**
 * Calcola statistiche delle esperienze partner
 * @returns {Object} Statistiche aggregate
 */
export const getPartnerExperiencesStats = () => {
  const activeExperiences = getActivePartnerExperiences();
  
  return {
    total: partnerExperiences.length,
    active: activeExperiences.length,
    featured: getFeaturedPartnerExperiences().length,
    byCity: partnerExperiences.reduce((acc, experience) => {
      acc[experience.city] = (acc[experience.city] || 0) + 1;
      return acc;
    }, {}),
    byType: partnerExperiences.reduce((acc, experience) => {
      acc[experience.partner.type] = (acc[experience.partner.type] || 0) + 1;
      return acc;
    }, {}),
    totalRedemptions: partnerExperiences.reduce((sum, experience) => sum + experience.totalRedemptions, 0),
    averageRating: partnerExperiences.reduce((sum, experience) => sum + experience.averageRating, 0) / partnerExperiences.length,
    averageDiscount: partnerExperiences.reduce((sum, experience) => sum + experience.experience.discountPercentage, 0) / partnerExperiences.length,
    totalSavings: partnerExperiences.reduce((sum, experience) => sum + (experience.experience.savings * experience.totalRedemptions), 0)
  };
};

/**
 * Verifica se un'esperienza è riscattabile oggi
 * @param {Object} experience - Esperienza partner
 * @returns {boolean} True se riscattabile oggi
 */
export const isRedeemableToday = (experience) => {
  const today = new Date().toLocaleDateString('it-IT', { weekday: 'long' }).toLowerCase();
  const now = new Date().toTimeString().substring(0, 5);
  
  // Controllo giorno
  if (!experience.experience.validDays.includes(today)) return false;
  
  // Controllo orario
  const [startHour, endHour] = experience.experience.validHours.split('-');
  if (now < startHour || now > endHour) return false;
  
  return true;
};

export default {
  partnerExperiences,
  getAllPartnerExperiences,
  getPartnerExperiencesByCity,
  getPartnerExperiencesByType,
  getPartnerExperienceById,
  getFeaturedPartnerExperiences,
  getActivePartnerExperiences,
  getPartnerExperiencesByPrice,
  getAvailablePartnerExperiences,
  getPartnerExperiencesByPartnerId,
  getPartnerExperiencesStats,
  isRedeemableToday
};
