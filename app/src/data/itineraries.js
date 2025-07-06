// Itinerari Community & Tour Operator per JourneyFlux MVP 2.0
// Percorsi curati da local ambassador e professionisti del turismo

import { CONTENT_TYPES, ITINERARY_TYPES } from './contentTypes.js';

// 🗺️ ITINERARI COMMUNITY - Creati da Local Ambassador

const communityItineraries = [
  {
    id: 'it_roma_local_marco',
    type: CONTENT_TYPES.ITINERARY,
    itineraryType: ITINERARY_TYPES.COMMUNITY,
    title: 'Roma Segreta del Local',
    subtitle: 'I luoghi che solo un romano autentico conosce',
    city: 'Roma',
    
    // Informazioni creator
    creator: {
      id: 'local_marco_rm',
      name: 'Marco Romano',
      username: '@Marco_RM_Explorer',
      type: 'local_ambassador',
      bio: 'Romano di 4a generazione, guida turistica abilitata da 8 anni. Conosco Roma come le mie tasche!',
      avatar: '👨‍🎓',
      rating: 4.8,
      reviewsCount: 127,
      verified: true,
      totalFollowers: 2341,
      totalItineraries: 12,
      specialties: ['roma_segreta', 'gastronomia', 'storia_locale']
    },
    
    description: 'Scopri la Roma autentica lontano dalle folle turistiche: dal miglior cornetto della città ai vicoli dove ancora si respira l\'atmosfera dell\'antica Roma.',
    
    // Metadati itinerario
    duration: 'Mezza giornata (4-5 ore)',
    estimatedCost: '€25-40',
    difficulty: 'facile',
    bestTime: 'mattina',
    groupSize: '2-6 persone',
    walkingDistance: '3.2 km',
    
    // Timeline completa dell'itinerario
    timeline: [
      {
        id: 'stop_1',
        time: '08:30',
        duration: 30, // minuti
        type: 'colazione',
        title: 'Bar del Cappuccino - Come un Romano',
        location: 'Via degli Avignonesi, 11',
        coordinates: { lat: 41.9028, lng: 12.4964 },
        description: 'Iniziamo come ogni romano: cornetto e cappuccino al bancone. Questo bar è frequentato solo da locals, zero turisti.',
        highlights: [
          'Cornetto alla crema fatto in casa',
          'Cappuccino perfetto (cremoso, non bollente)',
          'Atmosfera autentica romana'
        ],
        estimatedCost: '€3-5',
        tips: 'Ordinare sempre al bancone, mai al tavolo se vuoi il prezzo locale!',
        hiddenGem: 'Chiedi del "cornetto segreto" con crema pasticcera del giorno prima - è incredibile!'
      },
      {
        id: 'stop_2',
        time: '09:30',
        duration: 45,
        type: 'arte_nascosta',
        title: 'Chiesa di Sant\'Andrea al Quirinale',
        location: 'Via del Quirinale, 29',
        coordinates: { lat: 41.8994, lng: 12.4889 },
        description: 'Il capolavoro nascosto di Bernini che il 90% dei turisti non vedrà mai. Piccola ma perfetta.',
        highlights: [
          'Architettura barocca di Bernini',
          'Cupola affrescata straordinaria',
          'Pace e silenzio totali'
        ],
        estimatedCost: 'Gratis',
        tips: 'Entra in silenzio, spesso ci sono momenti di preghiera privata',
        hiddenGem: 'Guarda il gioco di luce che entra dalla cupola alle 10:15 - è magico!'
      },
      {
        id: 'stop_3',
        time: '10:30',
        duration: 60,
        type: 'panorama_segreto',
        title: 'Terrazza del Pincio - La Vista Segreta',
        location: 'Viale dell\'Orologio (ingresso nascosto)',
        coordinates: { lat: 41.9108, lng: 12.4761 },
        description: 'Tutti vanno al Pincio, ma solo i romani sanno dell\'ingresso segreto che porta alla terrazza riservata.',
        highlights: [
          'Vista su Roma senza folle',
          'Angolo perfetto per foto',
          'Panchina storica del 1800'
        ],
        estimatedCost: 'Gratis',
        tips: 'Cerca l\'ingresso vicino alla fontana dell\'orologio, è quasi invisibile',
        hiddenGem: 'Alle 11:00 precise, la luce è perfetta per la foto con San Pietro sullo sfondo!'
      },
      {
        id: 'stop_4',
        time: '11:45',
        duration: 75,
        type: 'shopping_locale',
        title: 'Mercato di Via del Pellegrino',
        location: 'Via del Pellegrino, 19',
        coordinates: { lat: 41.8944, lng: 12.4707 },
        description: 'Il mercato più autentico del centro: formaggi, salumi, e i migliori prodotti locali del Lazio.',
        highlights: [
          'Pecorino romano DOP diretto dal produttore',
          'Salumi di Norcia autentici',
          'Atmosfera di mercato tradizionale'
        ],
        estimatedCost: '€10-20',
        tips: 'Fai assaggiare tutto prima di comprare, è tradizione!',
        hiddenGem: 'Chiedi a Giulio (il tipo coi baffi) del suo olio segreto - non è in vendita ma te lo regala se sei simpatico!'
      },
      {
        id: 'stop_5',
        time: '13:15',
        duration: 90,
        type: 'pranzo_autentico',
        title: 'Trattoria da Checchino',
        location: 'Via di Monte Testaccio, 30',
        coordinates: { lat: 41.8736, lng: 12.4793 },
        description: 'Trattoria storica dal 1887. Qui si mangia la vera cucina romana, quella che facevano le nostre nonne.',
        highlights: [
          'Cacio e pepe della tradizione',
          'Coda alla vaccinara originale',
          'Vino dei Castelli Romani'
        ],
        estimatedCost: '€15-25',
        tips: 'Non c\'è menu turistico, ordina quello che ordina il tavolo di romani accanto',
        hiddenGem: 'Chiedi del "quinto quarto" - solo i veri romani sanno cos\'è!'
      }
    ],
    
    // Informazioni aggiuntive
    whatToExpect: [
      'Esperienza 100% autentica senza trappole turistiche',
      'Interazione con locali genuini',
      'Foto uniche lontano dalle folle',
      'Assaggio di prodotti locali di qualità',
      'Storie e aneddoti che solo un romano può raccontare'
    ],
    
    whatToBring: [
      'Scarpe comode per camminare',
      'Fotocamera o smartphone',
      'Curiosità e appetito!',
      'Qualche euro per assaggi al mercato'
    ],
    
    // Prenotazione (non richiesta per community)
    booking: {
      required: false,
      link: null,
      price: null,
      cancellationPolicy: 'Libera'
    },
    
    // Feedback della community
    rating: 4.8,
    totalReviews: 127,
    reviews: [
      {
        id: 'review_1',
        user: {
          username: '@TravelLover_MI',
          avatar: '👩‍💼',
          verified: true
        },
        rating: 5,
        date: '2025-06-20',
        comment: 'Esperienza autentica incredibile! Marco conosce davvero Roma come nessun altro. Il cornetto segreto era divino!',
        helpful: 23,
        photos: ['📸', '📸', '📸']
      },
      {
        id: 'review_2', 
        user: {
          username: '@RomaLover_NY',
          avatar: '👨‍🎨',
          verified: false
        },
        rating: 5,
        date: '2025-06-18',
        comment: 'Finalmente ho visto la Roma vera! Niente code, niente turisti, solo autenticità. Consigliatissimo!',
        helpful: 18,
        photos: ['📸', '📸']
      },
      {
        id: 'review_3',
        user: {
          username: '@FoodieCouple_LN',
          avatar: '👫',
          verified: true
        },
        rating: 4,
        date: '2025-06-15',
        comment: 'Ottimo per scoprire i posti locali. Il mercato del Pellegrino è un gioiello nascosto!',
        helpful: 12,
        photos: ['📸']
      }
    ],
    
    // Metadati
    createdDate: '2025-06-01',
    lastUpdated: '2025-06-25',
    tags: ['roma_autentica', 'food_local', 'arte_nascosta', 'no_turisti'],
    featured: true,
    verified: true,
    
    // Statistiche
    totalFollows: 267,
    totalShares: 89,
    totalCompletions: 127,
    averageCompletionTime: 4.2, // ore
    
    // Social
    socialShare: {
      template: 'ho_seguito_itinerario_marco',
      title: 'Ho scoperto la Roma segreta con Marco! 🏛️',
      hashtags: ['#JourneyFlux', '#RomaSegreta', '#LocalGuide', '#RomaAutentica']
    }
  },

  {
    id: 'it_napoli_local_sofia',
    type: CONTENT_TYPES.ITINERARY,
    itineraryType: ITINERARY_TYPES.COMMUNITY,
    title: 'Napoli Autentica della Sofi',
    subtitle: 'Una napoletana doc ti porta nei suoi posti del cuore',
    city: 'Napoli',
    
    creator: {
      id: 'local_sofia_na',
      name: 'Sofia Esposito',
      username: '@Sofia_NA_Autentica',
      type: 'local_ambassador',
      bio: 'Napoletana verace, laureata in Storia dell\'Arte. Amo la mia città e voglio farvela amare come la amo io!',
      avatar: '👩‍🎓',
      rating: 4.9,
      reviewsCount: 89,
      verified: true,
      totalFollowers: 1567,
      totalItineraries: 8,
      specialties: ['napoli_sotterranea', 'street_art', 'dolci_tradizionali']
    },
    
    description: 'Vivi Napoli come una napoletana: dalle sfogliatelle più buone della città ai vicoli dove ancora si parla in dialetto puro.',
    
    duration: 'Giornata intera (6-7 ore)',
    estimatedCost: '€20-35',
    difficulty: 'media',
    bestTime: 'mattina presto',
    groupSize: '2-8 persone',
    walkingDistance: '4.8 km',
    
    timeline: [
      {
        id: 'stop_1',
        time: '08:00',
        duration: 45,
        type: 'colazione_napoletana',
        title: 'Pintauro - La Sfogliatella della Nonna',
        location: 'Via Toledo, 275',
        coordinates: { lat: 40.8477, lng: 14.2536 },
        description: 'Dal 1785, la sfogliatella più buona di Napoli. Ancora fatta a mano come una volta.',
        highlights: [
          'Sfogliatella riccia calda appena sfornata',
          'Caffè napoletano "tazzulella"',
          'Atmosfera storica autentica'
        ],
        estimatedCost: '€3-5',
        tips: 'Arriva presto, alle 9:30 finiscono le sfogliatelle!',
        hiddenGem: 'Chiedi della "sfogliatella della nonna" - ricetta segreta di famiglia!'
      },
      {
        id: 'stop_2',
        time: '09:00',
        duration: 60,
        type: 'street_art',
        title: 'Quartieri Spagnoli - Murales Street Art',
        location: 'Via Speranzella',
        coordinates: { lat: 40.8465, lng: 14.2505 },
        description: 'Il museo a cielo aperto più bello del mondo. Ogni muro racconta una storia.',
        highlights: [
          'Murales di Maradona e Totò',
          'Arte urbana contemporanea',
          'Vita autentica nei vicoli'
        ],
        estimatedCost: 'Gratis',
        tips: 'Rispetta i residenti, sono le loro case',
        hiddenGem: 'Cerca il murales nascosto di Sophia Loren in Via Concezione!'
      },
      {
        id: 'stop_3',
        time: '10:15',
        duration: 90,
        type: 'sotterranea',
        title: 'Napoli Sotterranea - I Segreti del Tufo',
        location: 'Piazza San Gaetano, 68',
        coordinates: { lat: 40.8510, lng: 14.2582 },
        description: 'Scendi nelle viscere di Napoli: acquedotti greci, rifugi bellici, misteri sotterranei.',
        highlights: [
          'Acquedotto greco-romano',
          'Rifugi della Seconda Guerra Mondiale',
          'Teatro romano nascosto'
        ],
        estimatedCost: '€10',
        tips: 'Porta una felpa, sottoterra fa freddo anche d\'estate',
        hiddenGem: 'Chiedi della "stanza dei misteri" - non è nel tour standard!'
      },
      {
        id: 'stop_4',
        time: '12:00',
        duration: 75,
        type: 'artigianato_locale',
        title: 'Via San Gregorio Armeno - Presepi Artigianali',
        location: 'Via San Gregorio Armeno, 8',
        coordinates: { lat: 40.8506, lng: 14.2571 },
        description: 'I maestri presepiali napoletani creano capolavori tutto l\'anno, non solo a Natale.',
        highlights: [
          'Presepi napoletani artigianali',
          'Statuine di personaggi famosi',
          'Laboratori aperti al pubblico'
        ],
        estimatedCost: '€5-15',
        tips: 'Contratta sempre, fa parte del gioco!',
        hiddenGem: 'Visita il laboratorio di Maestro Scuotto - fa statuine su commissione!'
      },
      {
        id: 'stop_5',
        time: '13:30',
        duration: 120,
        type: 'pranzo_famiglia',
        title: 'Trattoria da Nennella - Come in Famiglia',
        location: 'Vico Lungo Teatro Nuovo, 103',
        coordinates: { lat: 40.8483, lng: 14.2511 },
        description: 'Trattoria storica dove ti trattano come famiglia. Atmosfera caotica ma autentica al 100%.',
        highlights: [
          'Pasta e fagioli della tradizione',
          'Ragù napoletano di 6 ore',
          'Atmosfera familiare unica'
        ],
        estimatedCost: '€12-20',
        tips: 'Non c\'è menu, ascolti cosa ti propongono',
        hiddenGem: 'Se sei simpatico, Nennella ti offre il limoncello fatto in casa!'
      }
    ],
    
    whatToExpect: [
      'Immersione totale nella cultura napoletana',
      'Incontro con artigiani locali',
      'Esperienze underground uniche',
      'Cibo autentico nei posti giusti',
      'Storie e leggende napoletane'
    ],
    
    whatToBring: [
      'Scarpe comode e chiuse (per sotterranea)',
      'Felpa leggera',
      'Macchina fotografica',
      'Appetito e voglia di ridere!',
      'Qualche spicciolo per artigiani'
    ],
    
    booking: {
      required: false,
      link: null,
      price: null,
      cancellationPolicy: 'Libera'
    },
    
    rating: 4.9,
    totalReviews: 89,
    reviews: [
      {
        id: 'review_1',
        user: {
          username: '@NapoliLover_RM',
          avatar: '👨‍💻',
          verified: true
        },
        rating: 5,
        date: '2025-06-22',
        comment: 'Sofia è incredibile! Mi ha fatto innamorare di Napoli. La sfogliatella di Pintauro è la cosa più buona che abbia mai mangiato!',
        helpful: 31,
        photos: ['📸', '📸', '📸', '📸']
      },
      {
        id: 'review_2',
        user: {
          username: '@SouthernItaly_Explorer',
          avatar: '🏃‍♀️',
          verified: false
        },
        rating: 5,
        date: '2025-06-19',
        comment: 'Esperienza autentica al 100%. I Quartieri Spagnoli sono arte pura!',
        helpful: 24,
        photos: ['📸', '📸']
      }
    ],
    
    createdDate: '2025-05-15',
    lastUpdated: '2025-06-20',
    tags: ['napoli_vera', 'street_art', 'sotterranea', 'artigianato', 'famiglia'],
    featured: true,
    verified: true,
    
    totalFollows: 189,
    totalShares: 67,
    totalCompletions: 89,
    averageCompletionTime: 6.5,
    
    socialShare: {
      template: 'ho_vissuto_napoli_sofia',
      title: 'Ho vissuto la Napoli autentica con Sofia! 🍕',
      hashtags: ['#JourneyFlux', '#NapoliVera', '#StreetArt', '#NapoliSotterranea']
    }
  },

  {
    id: 'it_firenze_local_alessandro',
    type: CONTENT_TYPES.ITINERARY,
    itineraryType: ITINERARY_TYPES.COMMUNITY,
    title: 'Firenze Rinascimentale Segreta',
    subtitle: 'I luoghi dove nacque davvero il Rinascimento',
    city: 'Firenze',
    
    creator: {
      id: 'local_alessandro_fi',
      name: 'Alessandro Medici',
      username: '@Alessandro_FI_Rinascimento',
      type: 'local_ambassador',
      bio: 'Storico dell\'arte e discendente di una famiglia fiorentina antica. Conosco i segreti che i Medici non volevano far sapere!',
      avatar: '👨‍🎨',
      rating: 4.7,
      reviewsCount: 156,
      verified: true,
      totalFollowers: 3245,
      totalItineraries: 15,
      specialties: ['rinascimento', 'medici', 'arte_nascosta']
    },
    
    description: 'Scopri i luoghi segreti dove Leonardo, Michelangelo e Botticelli si incontravano per creare il futuro dell\'arte.',
    
    duration: 'Giornata intera (7-8 ore)',
    estimatedCost: '€35-50',
    difficulty: 'media',
    bestTime: 'mattina',
    groupSize: '2-6 persone',
    walkingDistance: '5.2 km',
    
    timeline: [
      {
        id: 'stop_1',
        time: '09:00',
        duration: 90,
        type: 'bottega_segreta',
        title: 'Bottega del Verrocchio - Dove Nacque Leonardo',
        location: 'Via dei Agnolo, 16',
        coordinates: { lat: 43.7696, lng: 11.2558 },
        description: 'Il laboratorio segreto dove Leonardo da Vinci imparò l\'arte. Ancora visitabile su appuntamento.',
        highlights: [
          'Strumenti originali del Quattrocento',
          'Affreschi nascosti di Leonardo giovane',
          'Tecniche pittoriche segrete'
        ],
        estimatedCost: '€8',
        tips: 'Prenotazione obbligatoria, solo 6 persone al giorno',
        hiddenGem: 'Cerca i disegni anatomici nascosti sotto l\'intonaco!'
      },
      {
        id: 'stop_2',
        time: '10:45',
        duration: 75,
        type: 'palazzo_nascosto',
        title: 'Palazzo Medici - Le Stanze Segrete',
        location: 'Via Cavour, 3',
        coordinates: { lat: 43.7759, lng: 11.2581 },
        description: 'Le stanze private dei Medici dove si decidevano le sorti dell\'arte europea.',
        highlights: [
          'Cappella dei Magi di Benozzo Gozzoli',
          'Biblioteca privata di Lorenzo il Magnifico',
          'Passaggi segreti tra i palazzi'
        ],
        estimatedCost: '€10',
        tips: 'Chiedi del tour "Segreti dei Medici" - non è pubblicizzato',
        hiddenGem: 'La "stanza degli alchimisti" dove Cosimo studiava i testi ermetici!'
      },
      {
        id: 'stop_3',
        time: '12:15',
        duration: 60,
        type: 'giardino_filosofico',
        title: 'Giardino di Boboli - Il Labirinto Iniziatico',
        location: 'Piazza Pitti, 1',
        coordinates: { lat: 43.7650, lng: 11.2500 },
        description: 'Un percorso iniziatico tra statue e simboli esoterici voluto dai Medici.',
        highlights: [
          'Grotta del Buontalenti',
          'Simboli alchemici nascosti',
          'Labirinto filosofico'
        ],
        estimatedCost: '€10',
        tips: 'Segui il percorso delle statue - è un messaggio cifrato',
        hiddenGem: 'La "Fontana dell\'Oceano" nasconde un passaggio segreto!'
      },
      {
        id: 'stop_4',
        time: '13:30',
        duration: 90,
        type: 'pranzo_storico',
        title: 'Osteria de\' Benci - Dove Mangiava Michelangelo',
        location: 'Via de\' Benci, 13',
        coordinates: { lat: 43.7677, lng: 11.2608 },
        description: 'Osteria storica del 1400, frequentata da artisti e intellettuali rinascimentali.',
        highlights: [
          'Ribollita come la facevano nel \'400',
          'Chianti dei vigneti medicei',
          'Atmosfera rinascimentale autentica'
        ],
        estimatedCost: '€18-25',
        tips: 'Chiedi del tavolo di Michelangelo - esiste ancora!',
        hiddenGem: 'Nel menu segreto c\'è la "zuppa di Leonardo" - ricetta originale!'
      },
      {
        id: 'stop_5',
        time: '15:15',
        duration: 120,
        type: 'laboratorio_arte',
        title: 'Oltrarno - Laboratori Artigiani',
        location: 'Via Santo Spirito, 62',
        coordinates: { lat: 43.7681, lng: 11.2493 },
        description: 'I laboratori dove ancora si praticano le tecniche rinascimentali.',
        highlights: [
          'Doratura a foglia oro',
          'Restauro di dipinti antichi',
          'Cornici intagliate a mano'
        ],
        estimatedCost: '€5-10',
        tips: 'Molti artigiani parlano inglese e amano spiegare le tecniche',
        hiddenGem: 'Maestro Giuliano fa ancora i colori come li faceva Botticelli!'
      }
    ],
    
    whatToExpect: [
      'Accesso a luoghi segreti non turistici',
      'Storie inedite su Leonardo e Michelangelo',
      'Incontro con artigiani della tradizione',
      'Comprensione profonda del Rinascimento',
      'Foto esclusive in location uniche'
    ],
    
    whatToBring: [
      'Scarpe comode per palazzi storici',
      'Blocco note per appunti',
      'Macchina fotografica',
      'Curiosità per l\'arte e la storia',
      'Prenotazioni confermate'
    ],
    
    booking: {
      required: false,
      link: null,
      price: null,
      cancellationPolicy: 'Libera'
    },
    
    rating: 4.7,
    totalReviews: 156,
    reviews: [
      {
        id: 'review_1',
        user: {
          username: '@ArtHistorian_US',
          avatar: '👩‍🏫',
          verified: true
        },
        rating: 5,
        date: '2025-06-25',
        comment: 'Alessandro è un vero esperto! Ho scoperto una Firenze che non sapevo esistesse. Imperdibile per chi ama l\'arte!',
        helpful: 42,
        photos: ['📸', '📸', '📸', '📸', '📸']
      },
      {
        id: 'review_2',
        user: {
          username: '@Renaissance_Lover',
          avatar: '🎭',
          verified: false
        },
        rating: 4,
        date: '2025-06-23',
        comment: 'Tour molto interessante ma impegnativo. Serve una base di conoscenza artistica.',
        helpful: 28,
        photos: ['📸', '📸']
      }
    ],
    
    createdDate: '2025-05-20',
    lastUpdated: '2025-06-24',
    tags: ['rinascimento', 'medici', 'leonardo', 'michelangelo', 'arte_segreta'],
    featured: false,
    verified: true,
    
    totalFollows: 203,
    totalShares: 91,
    totalCompletions: 156,
    averageCompletionTime: 7.2,
    
    socialShare: {
      template: 'ho_scoperto_rinascimento_alessandro',
      title: 'Ho scoperto il Rinascimento segreto con Alessandro! 🎨',
      hashtags: ['#JourneyFlux', '#RinascimentoSegreto', '#Medici', '#Leonardo']
    }
  }
];

// 🎯 ITINERARI TOUR OPERATOR - Esperienze Premium

const tourOperatorItineraries = [
  {
    id: 'it_roma_premium_gladiatori',
    type: CONTENT_TYPES.ITINERARY,
    itineraryType: ITINERARY_TYPES.TOUR_OPERATOR,
    title: 'Roma Gladiatori VIP Experience',
    subtitle: 'Vivi un giorno da gladiatore nell\'Antica Roma',
    city: 'Roma',
    
    // Informazioni tour operator
    tourOperator: {
      id: 'roman_experiences_to',
      name: 'Roman Experiences',
      username: '@RomanExperiences_Official',
      type: 'certified_tour_operator',
      bio: 'Tour operator specializzato in esperienze immersive nella Roma antica. Certificato dal Comune di Roma.',
      avatar: '🏛️',
      rating: 4.9,
      reviewsCount: 2847,
      verified: true,
      certification: 'Regione Lazio TO-2024-001',
      yearsExperience: 12,
      languages: ['italiano', 'inglese', 'spagnolo', 'francese'],
      specialties: ['roma_antica', 'esperienze_immersive', 'gladiatori']
    },
    
    description: 'Esperienza immersiva unica: vestiti da gladiatore, allenati con armi autentiche e scopri i segreti del Colosseo con accesso VIP.',
    
    duration: 'Giornata intera (8 ore)',
    estimatedCost: '€189-220',
    difficulty: 'media',
    bestTime: 'tutto il giorno',
    groupSize: '4-12 persone',
    walkingDistance: '2.8 km',
    
    // Programma dettagliato
    timeline: [
      {
        id: 'stop_1',
        time: '09:00',
        duration: 60,
        type: 'accoglienza_vip',
        title: 'Accoglienza VIP - Gladiatore per un Giorno',
        location: 'Ludus Magnus (replica autentica)',
        coordinates: { lat: 41.8902, lng: 12.4923 },
        description: 'Vieni accolto come un vero gladiatore: vestizione con abiti d\'epoca e briefing sulla giornata.',
        highlights: [
          'Costume gladiatore autentico',
          'Accoglienza con vino speziato romano',
          'Briefing storico interattivo'
        ],
        estimatedCost: 'Incluso',
        tips: 'Arriva 15 minuti prima per check-in',
        premium: true
      },
      {
        id: 'stop_2',
        time: '10:15',
        duration: 90,
        type: 'training_gladiatori',
        title: 'Scuola Gladiatori - Addestramento Autentico',
        location: 'Ludus Magnus',
        coordinates: { lat: 41.8902, lng: 12.4923 },
        description: 'Allenamento con maestri d\'armi esperti: impara le tecniche di combattimento gladiatorio.',
        highlights: [
          'Addestramento con spade e scudi',
          'Tecniche di combattimento storiche',
          'Maestri d\'armi professionisti'
        ],
        estimatedCost: 'Incluso',
        tips: 'Abbigliamento comodo sotto il costume',
        premium: true
      },
      {
        id: 'stop_3',
        time: '12:00',
        duration: 120,
        type: 'colosseo_vip',
        title: 'Colosseo VIP - Sotterranei e Arena',
        location: 'Colosseo - Accesso Sotterranei',
        coordinates: { lat: 41.8902, lng: 12.4923 },
        description: 'Accesso esclusivo ai sotterranei del Colosseo e all\'arena con guida esperta.',
        highlights: [
          'Sotterranei del Colosseo',
          'Arena floor access',
          'Guida storica specializzata'
        ],
        estimatedCost: 'Incluso',
        tips: 'Porta la fotocamera, vedrai angoli unici',
        premium: true
      },
      {
        id: 'stop_4',
        time: '14:15',
        duration: 75,
        type: 'pranzo_imperiale',
        title: 'Banchetto Imperiale - Cucina Romana Antica',
        location: 'Domus Aurea Restaurant',
        coordinates: { lat: 41.8947, lng: 12.4959 },
        description: 'Pranzo a tema con ricette dell\'antica Roma servite in ambiente storico.',
        highlights: [
          'Ricette romane autentiche',
          'Ambiente storicamente accurato',
          'Vino antico (mulsum)'
        ],
        estimatedCost: 'Incluso',
        tips: 'Preparati a sapori molto diversi dal solito',
        premium: true
      },
      {
        id: 'stop_5',
        time: '15:45',
        duration: 90,
        type: 'foro_esclusivo',
        title: 'Foro Romano - Tour Esclusivo',
        location: 'Foro Romano - Ingresso Sacra Via',
        coordinates: { lat: 41.8925, lng: 12.4853 },
        description: 'Tour privato del Foro Romano con ricostruzioni virtuali e guide specializzate.',
        highlights: [
          'Ricostruzioni 3D dell\'antica Roma',
          'Accesso ad aree riservate',
          'Guide archeologiche certificate'
        ],
        estimatedCost: 'Incluso',
        tips: 'Auricolari forniti per audio cristallino',
        premium: true
      }
    ],
    
    // Servizi inclusi
    included: [
      'Costume gladiatore completo',
      'Addestramento con maestri d\'armi',
      'Accesso VIP Colosseo sotterranei',
      'Pranzo tematico con bevande',
      'Guida esperta multilingue',
      'Foto professionali ricordo',
      'Certificato di partecipazione',
      'Assicurazione completa'
    ],
    
    notIncluded: [
      'Trasferimenti da/per hotel',
      'Bevande extra durante i pasti',
      'Acquisti personali',
      'Mance (facoltative)'
    ],
    
    // Prenotazione obbligatoria
    booking: {
      required: true,
      link: 'https://romanexperiences.com/gladiatori-vip',
      price: 189,
      priceNote: 'Prezzo base per adulto, sconti per gruppi',
      cancellationPolicy: 'Cancellazione gratuita fino a 48h prima',
      paymentOptions: ['carta_credito', 'paypal', 'bonifico'],
      instantConfirmation: true
    },
    
    // Requisiti partecipazione
    requirements: {
      minAge: 12,
      maxAge: 70,
      fitnessLevel: 'media',
      restrictions: [
        'Problemi cardiaci',
        'Gravidanza',
        'Problemi motori gravi'
      ],
      whatToBring: [
        'Documenti identità',
        'Abbigliamento comodo',
        'Scarpe chiuse',
        'Macchina fotografica'
      ]
    },
    
    rating: 4.9,
    totalReviews: 2847,
    reviews: [
      {
        id: 'review_1',
        user: {
          username: '@History_Buff_UK',
          avatar: '👨‍🎓',
          verified: true
        },
        rating: 5,
        date: '2025-06-28',
        comment: 'Esperienza incredibile! Mi sono sentito davvero un gladiatore. I maestri d\'armi sono fantastici e il Colosseo VIP è imperdibile!',
        helpful: 89,
        photos: ['📸', '📸', '📸', '📸', '📸']
      },
      {
        id: 'review_2',
        user: {
          username: '@Family_Adventures',
          avatar: '👨‍👩‍👧‍👦',
          verified: true
        },
        rating: 5,
        date: '2025-06-26',
        comment: 'Fantastico per tutta la famiglia! I bambini erano entusiasti e noi adulti abbiamo imparato tantissimo. Consigliatissimo!',
        helpful: 67,
        photos: ['📸', '📸', '📸']
      }
    ],
    
    createdDate: '2025-04-10',
    lastUpdated: '2025-06-30',
    tags: ['gladiatori', 'colosseo_vip', 'esperienza_immersiva', 'roma_antica'],
    featured: true,
    verified: true,
    premium: true,
    
    totalBookings: 2847,
    averageCompletionTime: 8.0,
    
    socialShare: {
      template: 'sono_stato_gladiatore_roma',
      title: 'Sono stato un gladiatore a Roma! ⚔️',
      hashtags: ['#JourneyFlux', '#GladiatoreVIP', '#ColosseoPremium', '#RomaAntica']
    }
  },

  {
    id: 'it_napoli_premium_underground',
    type: CONTENT_TYPES.ITINERARY,
    itineraryType: ITINERARY_TYPES.TOUR_OPERATOR,
    title: 'Napoli Underground Exclusive',
    subtitle: 'Esplora i tunnel segreti mai aperti al pubblico',
    city: 'Napoli',
    
    tourOperator: {
      id: 'naples_underground_to',
      name: 'Naples Underground Exclusive',
      username: '@NaplesUnderground_Official',
      type: 'certified_tour_operator',
      bio: 'Specialisti in esplorazioni sotterranee di Napoli. Accesso esclusivo a tunnel e cavità mai aperte al turismo.',
      avatar: '🕳️',
      rating: 4.8,
      reviewsCount: 1456,
      verified: true,
      certification: 'Regione Campania TO-2024-005',
      yearsExperience: 8,
      languages: ['italiano', 'inglese', 'francese'],
      specialties: ['napoli_sotterranea', 'speleologia_urbana', 'storia_nascosta']
    },
    
    description: 'Esplorazione esclusiva dei tunnel sotterranei di Napoli mai aperti al pubblico: acquedotti greci, rifugi bellici segreti e misteri archeologici.',
    
    duration: 'Mezza giornata (4 ore)',
    estimatedCost: '€79-95',
    difficulty: 'impegnativo',
    bestTime: 'tutto il giorno',
    groupSize: '6-10 persone',
    walkingDistance: '1.8 km sotterranei',
    
    timeline: [
      {
        id: 'stop_1',
        time: '10:00',
        duration: 30,
        type: 'briefing_sicurezza',
        title: 'Briefing e Attrezzature',
        location: 'Base Operativa - Piazza San Gaetano',
        coordinates: { lat: 40.8510, lng: 14.2582 },
        description: 'Briefing di sicurezza e consegna attrezzature professionali per l\'esplorazione.',
        highlights: [
          'Elmetto con lampada frontale',
          'Tuta protettiva monouso',
          'Briefing sicurezza completo'
        ],
        estimatedCost: 'Incluso',
        tips: 'Vestiti comodi e scarpe con suola antiscivolo',
        premium: true
      },
      {
        id: 'stop_2',
        time: '10:45',
        duration: 90,
        type: 'tunnel_greci',
        title: 'Acquedotto Greco - Tunnel Originali',
        location: 'Tunnel Greco-Romano (accesso esclusivo)',
        coordinates: { lat: 40.8505, lng: 14.2578 },
        description: 'Esplorazione dei tunnel dell\'acquedotto greco del IV secolo a.C., mai aperti al pubblico.',
        highlights: [
          'Tunnel originali del IV sec. a.C.',
          'Iscrizioni greche antiche',
          'Sistema idraulico antico'
        ],
        estimatedCost: 'Incluso',
        tips: 'Preparati a spazi molto stretti',
        premium: true
      },
      {
        id: 'stop_3',
        time: '12:30',
        duration: 75,
        type: 'rifugi_segreti',
        title: 'Rifugi Bellici - Bunker Segreti',
        location: 'Rifugi Seconda Guerra Mondiale',
        coordinates: { lat: 40.8512, lng: 14.2585 },
        description: 'Rifugi antiaerei della Seconda Guerra Mondiale mai catalogati ufficialmente.',
        highlights: [
          'Rifugi bellici originali',
          'Graffiti e testimonianze storiche',
          'Oggetti d\'epoca conservati'
        ],
        estimatedCost: 'Incluso',
        tips: 'Atmosfera molto suggestiva ma intensa',
        premium: true
      },
      {
        id: 'stop_4',
        time: '13:50',
        duration: 45,
        type: 'scoperta_archeologica',
        title: 'Scoperta Recente - Tempio Nascosto',
        location: 'Tempio Greco (scoperta 2023)',
        coordinates: { lat: 40.8508, lng: 14.2580 },
        description: 'Tempio greco scoperto nel 2023, accessibile solo con tour esclusivi.',
        highlights: [
          'Tempio greco intatto',
          'Scoperta archeologica recente',
          'Accesso esclusivo garantito'
        ],
        estimatedCost: 'Incluso',
        tips: 'Primo gruppo di turisti mai ammessi',
        premium: true
      }
    ],
    
    included: [
      'Attrezzature speleologiche professionali',
      'Guida speleologa certificata',
      'Assicurazione RC e infortuni',
      'Accesso a tunnel esclusivi',
      'Documentazione fotografica',
      'Certificato di partecipazione',
      'Trasferimenti in centro storico'
    ],
    
    notIncluded: [
      'Pranzo o bevande',
      'Acquisti personali',
      'Cambio vestiti (raccomandato)',
      'Mance'
    ],
    
    booking: {
      required: true,
      link: 'https://naplesunderground.com/exclusive-tour',
      price: 79,
      priceNote: 'Prezzo per adulto, ridotto studenti/over 65',
      cancellationPolicy: 'Cancellazione gratuita fino a 24h prima',
      paymentOptions: ['carta_credito', 'paypal'],
      instantConfirmation: false,
      advanceBooking: '48 ore minimo'
    },
    
    requirements: {
      minAge: 16,
      maxAge: 65,
      fitnessLevel: 'buona',
      restrictions: [
        'Claustrofobia',
        'Problemi cardiaci',
        'Gravidanza',
        'Problemi respiratori',
        'Mobilità ridotta'
      ],
      whatToBring: [
        'Documenti identità',
        'Abbigliamento che si può sporcare',
        'Scarpe chiuse antiscivolo',
        'Borraccia d\'acqua'
      ]
    },
    
    rating: 4.8,
    totalReviews: 1456,
    reviews: [
      {
        id: 'review_1',
        user: {
          username: '@Underground_Explorer',
          avatar: '🔦',
          verified: true
        },
        rating: 5,
        date: '2025-06-29',
        comment: 'Esperienza incredibile! Ho visto una Napoli che non immaginavo esistesse. Le guide sono competentissime e l\'adrenalina è garantita!',
        helpful: 78,
        photos: ['📸', '📸', '📸']
      },
      {
        id: 'review_2',
        user: {
          username: '@Adventure_Couple',
          avatar: '👫',
          verified: false
        },
        rating: 4,
        date: '2025-06-27',
        comment: 'Tour molto impegnativo ma bellissimo. Non adatto a chi ha paura degli spazi chiusi. Le scoperte archeologiche sono fantastiche!',
        helpful: 65,
        photos: ['📸', '📸']
      }
    ],
    
    createdDate: '2025-05-01',
    lastUpdated: '2025-06-30',
    tags: ['napoli_sotterranea', 'tunnel_esclusivi', 'speleologia', 'archeologia'],
    featured: true,
    verified: true,
    premium: true,
    
    totalBookings: 1456,
    averageCompletionTime: 4.0,
    
    socialShare: {
      template: 'ho_esplorato_napoli_sotterranea',
      title: 'Ho esplorato la Napoli sotterranea segreta! 🕳️',
      hashtags: ['#JourneyFlux', '#NapoliSotterranea', '#TunnelSegreti', '#ArcheologiaNascosta']
    }
  }
];

// 📊 ARRAY COMPLETO E FUNZIONI HELPER

export const itineraries = [
  ...communityItineraries,
  ...tourOperatorItineraries
];

/**
 * Ottiene tutti gli itinerari
 * @returns {Array} Array di itinerari
 */
export const getAllItineraries = () => itineraries;

/**
 * Ottiene itinerari per città
 * @param {string} city - Nome della città
 * @returns {Array} Array di itinerari per città
 */
export const getItinerariesByCity = (city) => {
  return itineraries.filter(itinerary => 
    itinerary.city.toLowerCase() === city.toLowerCase()
  );
};

/**
 * Ottiene itinerari per tipo
 * @param {string} type - Tipo itinerario (community/tour_operator)
 * @returns {Array} Array di itinerari per tipo
 */
export const getItinerariesByType = (type) => {
  return itineraries.filter(itinerary => itinerary.itineraryType === type);
};

/**
 * Ottiene itinerari community
 * @returns {Array} Array di itinerari community
 */
export const getCommunityItineraries = () => {
  return getItinerariesByType(ITINERARY_TYPES.COMMUNITY);
};

/**
 * Ottiene itinerari tour operator
 * @returns {Array} Array di itinerari tour operator
 */
export const getTourOperatorItineraries = () => {
  return getItinerariesByType(ITINERARY_TYPES.TOUR_OPERATOR);
};

/**
 * Ottiene itinerario per ID
 * @param {string} id - ID dell'itinerario
 * @returns {Object|null} Itinerario o null
 */
export const getItineraryById = (id) => {
  return itineraries.find(itinerary => itinerary.id === id) || null;
};

/**
 * Ottiene itinerari featured
 * @returns {Array} Array di itinerari featured
 */
export const getFeaturedItineraries = () => {
  return itineraries.filter(itinerary => itinerary.featured === true);
};

/**
 * Ottiene itinerari per creatore
 * @param {string} creatorId - ID del creatore
 * @returns {Array} Array di itinerari del creatore
 */
export const getItinerariesByCreator = (creatorId) => {
  return itineraries.filter(itinerary => 
    itinerary.creator?.id === creatorId || itinerary.tourOperator?.id === creatorId
  );
};

/**
 * Ottiene itinerari per fascia di prezzo
 * @param {number} maxPrice - Prezzo massimo
 * @returns {Array} Array di itinerari nella fascia di prezzo
 */
export const getItinerariesByPrice = (maxPrice) => {
  return itineraries.filter(itinerary => {
    if (itinerary.itineraryType === ITINERARY_TYPES.COMMUNITY) return true;
    return itinerary.booking.price <= maxPrice;
  });
};

/**
 * Calcola statistiche degli itinerari
 * @returns {Object} Statistiche aggregate
 */
export const getItinerariesStats = () => {
  return {
    total: itineraries.length,
    community: getCommunityItineraries().length,
    tourOperator: getTourOperatorItineraries().length,
    byCity: itineraries.reduce((acc, itinerary) => {
      acc[itinerary.city] = (acc[itinerary.city] || 0) + 1;
      return acc;
    }, {}),
    averageRating: itineraries.reduce((sum, itinerary) => sum + itinerary.rating, 0) / itineraries.length,
    totalReviews: itineraries.reduce((sum, itinerary) => sum + itinerary.totalReviews, 0),
    averagePrice: getTourOperatorItineraries().reduce((sum, itinerary) => sum + itinerary.booking.price, 0) / getTourOperatorItineraries().length
  };
};

export default {
  itineraries,
  getAllItineraries,
  getItinerariesByCity,
  getItinerariesByType,
  getCommunityItineraries,
  getTourOperatorItineraries,
  getItineraryById,
  getFeaturedItineraries,
  getItinerariesByCreator,
  getItinerariesByPrice,
  getItinerariesStats
};
