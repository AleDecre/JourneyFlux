// Percorsi Narrativi per JourneyFlux MVP 2.0
// Mini-avventure che svelano i segreti nascosti delle città italiane

import { CONTENT_TYPES, NARRATIVE_CATEGORIES, BADGE_TYPES } from './contentTypes.js';

// 🎭 PERCORSI NARRATIVI - ROMA
const narrativePathsRoma = [
  {
    id: 'np_roma_fantasmi_castel',
    type: CONTENT_TYPES.NARRATIVE_PATH,
    title: 'I Fantasmi di Castel Sant\'Angelo',
    category: NARRATIVE_CATEGORIES.MISTERO,
    city: 'Roma',
    
    // Intro narrativa (il "gancio" emotivo)
    introduction: 'Nel 590 d.C., mentre la peste devastava Roma, Papa Gregorio Magno vide l\'Arcangelo Michele ringuainare la spada sulla sommità del Mausoleo di Adriano. La pestilenza cessò, ma le anime dei prigionieri continuano a vagare tra le mura del castello...',
    
    description: 'Scopri la leggenda dell\'Angelo di Hadrian e i segreti delle prigioni papali che hanno custodito i più pericolosi nemici della Chiesa.',
    
    // Metadati percorso
    difficulty: 'media',
    duration: 55, // minuti
    estimatedSteps: 4500, // passi
    
    // Coordinate centro percorso
    coordinates: { lat: 41.9031, lng: 12.4663 },
    
    // Tappe del percorso (2-3 max per mantenere focus)
    steps: [
      {
        id: 'step_1',
        title: 'Ponte Sant\'Angelo - I Guardiani',
        description: 'Trova la statua che custodisce l\'iscrizione misteriosa degli angeli di Bernini',
        coordinates: { lat: 41.9016, lng: 12.4667 },
        storyContent: 'Le dieci statue angeliche di Bernini non sono solo decorazioni. Ciascuna nasconde un simbolo legato alle torture inflitte ai prigionieri del castello. Cerca l\'angelo con la corona di spine...',
        hint: 'Guarda verso il castello, l\'ultimo angelo a destra tiene qualcosa di speciale',
        validationRadius: 30, // metri
        requiredAction: 'photo', // GPS + foto
        secretToUnlock: 'Il significato della corona di spine angelica'
      },
      {
        id: 'step_2', 
        title: 'Cortile dell\'Angelo - L\'Ingresso Segreto',
        description: 'Scopri l\'antica porta che conduceva alle prigioni segrete',
        coordinates: { lat: 41.9030, lng: 12.4664 },
        storyContent: 'Nel cortile interno, una porta apparentemente normale nasconde l\'ingresso alle "prigioni dimenticate". Qui furono rinchiusi i templari, gli eretici e i nemici personali del Papa...',
        hint: 'Cerca la porta con simboli alchemici incisi nella pietra',
        validationRadius: 25,
        requiredAction: 'photo',
        secretToUnlock: 'La mappa delle prigioni sotterranee'
      },
      {
        id: 'step_3',
        title: 'Terrazza dell\'Angelo - Il Miracolo',
        description: 'Raggiungi il punto esatto dove apparve l\'Arcangelo Michele',
        coordinates: { lat: 41.9034, lng: 12.4661 },
        storyContent: 'Sulla terrazza più alta, dove oggi svetta la statua dell\'angelo, si compì il miracolo. Ma la vera storia è diversa da quella ufficiale...',
        hint: 'Cerca l\'antica iscrizione latina nascosta alla base della statua',
        validationRadius: 20,
        requiredAction: 'photo',
        secretToUnlock: 'La vera storia del miracolo del 590 d.C.'
      }
    ],
    
    // La prova finale (foto-enigma)
    finalChallenge: {
      title: 'Il Codice dell\'Angelo',
      description: 'Fotografa l\'iscrizione segreta che rivela il vero nome dell\'ultimo prigioniero del castello',
      instructions: 'Cerca sotto le ali dell\'angelo di bronzo, dove solo pochi osservatori attenti guardano...',
      hint: 'Non è sulla statua principale, ma su un dettaglio architettonico nascosto',
      validationType: 'photo_with_text', // richiede testo specifico nella foto
      expectedText: 'CLEMENS', // testo che deve apparire nella foto
      location: 'Terrazza dell\'Angelo, base sud-est'
    },
    
    // Ricompense
    rewards: {
      points: 250,
      storyPoints: 50, // Nuova tipologia punti per narrativa
      badge: 'badge_cacciatore_fantasmi',
      unlockContent: {
        title: 'I Prigionieri Illustri',
        content: 'Scopri chi furono davvero gli ultimi prigionieri del castello: dall\'antipapa Giovanni XXIII a Beatrice Cenci, fino al misterioso "Conte di Cagliostro"...'
      }
    },
    
    // Contenuti social
    socialShare: {
      template: 'ho_svelato_fantasmi_castel',
      title: 'Ho svelato i fantasmi di Castel Sant\'Angelo! 👻',
      hashtags: ['#JourneyFlux', '#RomaSegreta', '#CastelSantAngelo', '#MisteriRomani']
    },
    
    // Metadati
    createdBy: 'JourneyFlux_Curator',
    createdDate: '2025-07-06',
    tags: ['storia', 'leggende', 'roma_segreta', 'papi', 'castelli'],
    featured: true,
    premium: false,
    
    // Statistiche
    completionRate: 78, // %
    averageRating: 4.7,
    totalCompletions: 1247,
    
    // Condizioni di sblocco
    requirements: {
      minLevel: 'novizio',
      prerequisites: [], // Nessun prerequisito
      timeRestrictions: null // Disponibile sempre
    }
  },

  {
    id: 'np_roma_alchimia_pantheon',
    type: CONTENT_TYPES.NARRATIVE_PATH,
    title: 'L\'Alchimia Segreta del Pantheon',
    category: NARRATIVE_CATEGORIES.MISTERO,
    city: 'Roma',
    
    introduction: 'Il Pantheon non è solo un tempio romano. I suoi architetti nascosero proporzioni alchemiche che trasformano chi entra in "iniziato". La cupola è un orologio solare che rivela quando aprire la "Porta dell\'Immortalità"...',
    
    description: 'Decifera i simboli alchemici nascosti nel Pantheon e scopri il segreto della "Porta dell\'Immortalità" che ossessionò i maestri del Rinascimento.',
    
    difficulty: 'difficile',
    duration: 45,
    estimatedSteps: 3200,
    coordinates: { lat: 41.8986, lng: 12.4769 },
    
    steps: [
      {
        id: 'step_1',
        title: 'Piazza della Rotonda - Il Cerchio Perfetto',
        description: 'Scopri perché l\'obelisco è posizionato esattamente in quel punto',
        coordinates: { lat: 41.8985, lng: 12.4770 },
        storyContent: 'L\'obelisco di Ramses II non è stato piazzato a caso. La sua posizione crea un triangolo perfetto con due edifici circostanti, formando il simbolo alchemico del fuoco...',
        hint: 'Posizionati tra l\'obelisco e la fontana, guarda verso il Pantheon',
        validationRadius: 35,
        requiredAction: 'photo',
        secretToUnlock: 'Il significato del triangolo alchemico'
      },
      {
        id: 'step_2',
        title: 'Portico del Pantheon - Le Colonne Parlanti',
        description: 'Decifera il messaggio nascosto nelle proporzioni delle colonne',
        coordinates: { lat: 41.8987, lng: 12.4768 },
        storyContent: 'Le 16 colonne del portico seguono la sequenza di Fibonacci. Ma c\'è di più: le loro ombre a mezzogiorno disegnano una mappa stellare che indica...',
        hint: 'Conta le colonne da sinistra, fermati alla quinta',
        validationRadius: 20,
        requiredAction: 'photo',
        secretToUnlock: 'La mappa stellare del Pantheon'
      },
      {
        id: 'step_3',
        title: 'Interno - L\'Oculus e la Luce Dorata',
        description: 'Scopri l\'ora esatta in cui la luce rivela il simbolo segreto',
        coordinates: { lat: 41.8986, lng: 12.4768 },
        storyContent: 'L\'oculus non è solo un\'apertura. A certe ore del giorno, la luce che entra proietta simboli alchemici sulle pareti. Il più importante appare alle 14:30 del solstizio...',
        hint: 'Guarda il pavimento marmoreo quando c\'è il sole pieno',
        validationRadius: 25,
        requiredAction: 'photo',
        secretToUnlock: 'I simboli alchemici della luce'
      }
    ],
    
    finalChallenge: {
      title: 'La Porta dell\'Immortalità',
      description: 'Trova l\'iscrizione che rivela la formula alchemica della trasformazione',
      instructions: 'Cerca nel pavimento marmoreo, dove i cerchi concentrici creano un pattern nascosto...',
      hint: 'Non è scritta in latino, ma in simboli alchemici',
      validationType: 'photo_with_symbols',
      expectedSymbols: ['⚜️', '🔻', '⭕'], // simboli che devono apparire
      location: 'Pavimento centrale, cerchi concentrici'
    },
    
    rewards: {
      points: 300,
      storyPoints: 75,
      badge: 'badge_alchimista_pantheon',
      unlockContent: {
        title: 'I Segreti degli Architetti',
        content: 'Scopri come Bramante, Michelangelo e Bernini utilizzarono i principi alchemici del Pantheon per i loro capolavori...'
      }
    },
    
    socialShare: {
      template: 'ho_decifrato_alchimia_pantheon',
      title: 'Ho decifrato l\'alchimia del Pantheon! ⚗️',
      hashtags: ['#JourneyFlux', '#PantheonSegreto', '#AlchimiaRomana', '#MisteriAntichi']
    },
    
    createdBy: 'JourneyFlux_Curator',
    createdDate: '2025-07-06',
    tags: ['alchimia', 'pantheon', 'simboli', 'architettura_segreta'],
    featured: true,
    premium: false,
    
    completionRate: 64, // Più difficile
    averageRating: 4.8,
    totalCompletions: 892,
    
    requirements: {
      minLevel: 'cercatore',
      prerequisites: ['np_roma_fantasmi_castel'], // Richiede primo percorso
      timeRestrictions: 'daylight' // Solo di giorno per la luce
    }
  },

  {
    id: 'np_roma_via_appia_spiriti',
    type: CONTENT_TYPES.NARRATIVE_PATH,
    title: 'Gli Spiriti della Via Appia',
    category: NARRATIVE_CATEGORIES.LEGGENDA,
    city: 'Roma',
    
    introduction: 'La Via Appia Antica non è solo una strada romana. È un ponte tra i mondi, dove le anime dei gladiatori e dei martiri cristiani si manifestano ancora oggi. I pastori locali evitano certi tratti dopo il tramonto...',
    
    description: 'Percorri la strada più infestata di Roma e scopri perché i fantasmi dei gladiatori continuano a cercare la loro libertà perduta.',
    
    difficulty: 'media',
    duration: 70,
    estimatedSteps: 6800,
    coordinates: { lat: 41.8583, lng: 12.5146 },
    
    steps: [
      {
        id: 'step_1',
        title: 'Porta San Sebastiano - L\'Ultimo Saluto',
        description: 'Scopri il rituale che i gladiatori compivano prima di lasciare Roma',
        coordinates: { lat: 41.8756, lng: 12.4966 },
        storyContent: 'Qui i gladiatori che avevano guadagnato la libertà uscivano da Roma per l\'ultima volta. Molti però non riuscivano mai a staccarsi completamente dalla città...',
        hint: 'Cerca i graffiti antichi sulla torre di guardia',
        validationRadius: 40,
        requiredAction: 'photo',
        secretToUnlock: 'Il significato dei graffiti gladiatori'
      },
      {
        id: 'step_2',
        title: 'Catacombe di San Callisto - I Martiri Nascosti',
        description: 'Trova l\'ingresso segreto alle catacombe mai aperte al pubblico',
        coordinates: { lat: 41.8569, lng: 12.5152 },
        storyContent: 'Non tutte le catacombe sono state scoperte. Alcune rimangono sigillate, contenendo i corpi di martiri cristiani che si dice proteggano ancora la strada...',
        hint: 'Guarda oltre la recinzione, verso i cipressi secolari',
        validationRadius: 30,
        requiredAction: 'photo',
        secretToUnlock: 'La mappa delle catacombe perdute'
      },
      {
        id: 'step_3',
        title: 'Circo di Massenzio - L\'Arena Maledetta',
        description: 'Scopri perché questo circo non fu mai utilizzato dopo la sua costruzione',
        coordinates: { lat: 41.8544, lng: 12.5180 },
        storyContent: 'L\'imperatore Massenzio costruì questo circo per onorare suo figlio morto. Ma gli auguri videro presagi terribili e proibirono qualsiasi spettacolo...',
        hint: 'Cerca l\'altare sacrificale nascosto nella vegetazione',
        validationRadius: 50,
        requiredAction: 'photo',
        secretToUnlock: 'I presagi che fermarono i giochi'
      }
    ],
    
    finalChallenge: {
      title: 'La Pietra degli Spiriti',
      description: 'Trova la pietra miliare che segna il confine tra il mondo dei vivi e quello dei morti',
      instructions: 'Cerca il miglio XIII, dove la strada si biforca misteriosamente...',
      hint: 'La pietra è coperta di edera, ma l\'iscrizione è ancora visibile',
      validationType: 'photo_with_text',
      expectedText: 'XIII',
      location: 'Via Appia Antica, presso il bivio abbandonato'
    },
    
    rewards: {
      points: 280,
      storyPoints: 60,
      badge: 'badge_custode_appia',
      unlockContent: {
        title: 'Le Apparizioni Documentate',
        content: 'Leggi le testimonianze storiche di chi ha incontrato gli spiriti della Via Appia, dai soldati napoleonici ai pellegrini medievali...'
      }
    },
    
    socialShare: {
      template: 'ho_camminato_spiriti_appia',
      title: 'Ho camminato con gli spiriti della Via Appia! 👻',
      hashtags: ['#JourneyFlux', '#ViaAppia', '#SpiritiRomani', '#LeggendeAntiche']
    },
    
    createdBy: 'JourneyFlux_Curator',
    createdDate: '2025-07-06',
    tags: ['leggende', 'via_appia', 'fantasmi', 'catacombe', 'gladiatori'],
    featured: false,
    premium: false,
    
    completionRate: 71,
    averageRating: 4.5,
    totalCompletions: 634,
    
    requirements: {
      minLevel: 'novizio',
      prerequisites: [],
      timeRestrictions: 'any' // Disponibile sempre, ma più suggestivo al tramonto
    }
  }
];

// 🎭 PERCORSI NARRATIVI - NAPOLI
const narrativePathsNapoli = [
  {
    id: 'np_napoli_sangue_gennaro',
    type: CONTENT_TYPES.NARRATIVE_PATH,
    title: 'Il Sangue di San Gennaro',
    category: NARRATIVE_CATEGORIES.MISTERO,
    city: 'Napoli',
    
    introduction: 'Tre volte l\'anno, il sangue di San Gennaro si liquefa. Ma la scienza non riesce a spiegarlo completamente. Cosa nasconde davvero la reliquia più misteriosa del mondo? E perché alcune volte il miracolo "fallisce"?',
    
    description: 'Indaga sui segreti scientifici e esoterici del miracolo di San Gennaro, scoprendo connessioni con antichi culti napoletani mai scomparsi.',
    
    difficulty: 'media',
    duration: 60,
    estimatedSteps: 4200,
    coordinates: { lat: 41.9028, lng: 14.2582 },
    
    steps: [
      {
        id: 'step_1',
        title: 'Duomo di Napoli - La Cappella Segreta',
        description: 'Scopri l\'ingresso alla cappella dove si custodisce il vero tesoro di San Gennaro',
        coordinates: { lat: 41.9029, lng: 14.2583 },
        storyContent: 'Oltre alla cappella principale, esiste una cripta segreta dove si conservano reliquie ancora più antiche. Qui si svolgevano rituali che precedevano il cristianesimo...',
        hint: 'Cerca la porta con i simboli alchemici accanto all\'altare maggiore',
        validationRadius: 25,
        requiredAction: 'photo',
        secretToUnlock: 'I rituali pre-cristiani di San Gennaro'
      },
      {
        id: 'step_2',
        title: 'Monastero di Santa Chiara - Il Laboratorio Nascosto',
        description: 'Trova il luogo dove i monaci medievali studiavano la scienza del miracolo',
        coordinates: { lat: 41.8994, lng: 14.2533 },
        storyContent: 'Le suore di Santa Chiara custodivano testi alchemici che spiegavano fenomeni "miracolosi". Alcuni di questi manoscritti sono nascosti ancora oggi...',
        hint: 'Guarda nel chiostro maiolicato, verso la decima colonna',
        validationRadius: 30,
        requiredAction: 'photo',
        secretToUnlock: 'I manoscritti alchemici delle suore'
      },
      {
        id: 'step_3',
        title: 'Napoli Sotterranea - I Tunnel dei Misteri',
        description: 'Scopri come i tunnel sotterranei collegano tutti i luoghi sacri della città',
        coordinates: { lat: 41.9010, lng: 14.2560 },
        storyContent: 'Una rete di tunnel collega il Duomo, Santa Chiara e altri luoghi sacri. Questi passaggi venivano usati per trasportare reliquie "particolari" senza essere visti...',
        hint: 'Cerca l\'ingresso nascosto dietro l\'altare della cripta',
        validationRadius: 35,
        requiredAction: 'photo',
        secretToUnlock: 'La mappa dei tunnel sacri'
      }
    ],
    
    finalChallenge: {
      title: 'La Formula del Miracolo',
      description: 'Trova l\'iscrizione che rivela la composizione chimica originale del sangue',
      instructions: 'Cerca nella cripta del Duomo, dove le iscrizioni latine nascondono formule alchemiche...',
      hint: 'Non è sul sarcofago principale, ma su una pietra laterale',
      validationType: 'photo_with_text',
      expectedText: 'FERRUM',
      location: 'Cripta del Duomo, parete nord'
    },
    
    rewards: {
      points: 270,
      storyPoints: 65,
      badge: 'badge_custode_sangue',
      unlockContent: {
        title: 'Le Analisi Scientifiche Segrete',
        content: 'Leggi i risultati delle analisi scientifiche mai pubblicate sul sangue di San Gennaro e scopri cosa rende davvero "miracoloso" questo fenomeno...'
      }
    },
    
    socialShare: {
      template: 'ho_svelato_mistero_gennaro',
      title: 'Ho svelato il mistero di San Gennaro! 🩸',
      hashtags: ['#JourneyFlux', '#SanGennaro', '#MisteriNapoli', '#MiracoliScientifici']
    },
    
    createdBy: 'JourneyFlux_Curator',
    createdDate: '2025-07-06',
    tags: ['miracoli', 'san_gennaro', 'alchimia', 'napoli_sotterranea'],
    featured: true,
    premium: false,
    
    completionRate: 82,
    averageRating: 4.9,
    totalCompletions: 1456,
    
    requirements: {
      minLevel: 'novizio',
      prerequisites: [],
      timeRestrictions: null
    }
  },

  {
    id: 'np_napoli_sirene_partenope',
    type: CONTENT_TYPES.NARRATIVE_PATH,
    title: 'Le Sirene di Partenope',
    category: NARRATIVE_CATEGORIES.LEGGENDA,
    city: 'Napoli',
    
    introduction: 'Napoli sorge sul corpo della sirena Partenope, morta per amore di Ulisse. Ma la leggenda nasconde una verità: le sirene non erano mostri, ma custodi di conoscenze antiche. E alcune sono ancora vive...',
    
    description: 'Segui le tracce delle sirene nella mitologia napoletana e scopri dove si nascondono ancora oggi i loro segreti.',
    
    difficulty: 'facile',
    duration: 50,
    estimatedSteps: 3800,
    coordinates: { lat: 40.8359, lng: 14.2488 },
    
    steps: [
      {
        id: 'step_1',
        title: 'Castel dell\'Ovo - La Tomba di Partenope',
        description: 'Trova il punto esatto dove si dice sia sepolta la sirena fondatrice',
        coordinates: { lat: 40.8284, lng: 14.2473 },
        storyContent: 'Sotto Castel dell\'Ovo riposa Partenope. Il suo corpo si trasformò nell\'isola di Megaride, ma la sua anima canta ancora nelle notti di tempesta...',
        hint: 'Cerca la grotta marina sotto il castello',
        validationRadius: 40,
        requiredAction: 'photo',
        secretToUnlock: 'Il canto di Partenope'
      },
      {
        id: 'step_2',
        title: 'Via Caracciolo - L\'Eco del Mare',
        description: 'Scopri il punto dove si sente ancora l\'eco del canto delle sirene',
        coordinates: { lat: 40.8320, lng: 14.2380 },
        storyContent: 'Lungo Via Caracciolo, in certi punti, il suono delle onde crea echi particolari. I pescatori dicono che sono le sirene che chiamano i marinai...',
        hint: 'Ascolta vicino ai frangiflutti, quando il vento soffia da sud',
        validationRadius: 50,
        requiredAction: 'photo',
        secretToUnlock: 'I punti di risonanza delle sirene'
      },
      {
        id: 'step_3',
        title: 'Palazzo Reale - La Sala delle Sirene',
        description: 'Trova la stanza segreta dove i Borboni custodivano le reliquie delle sirene',
        coordinates: { lat: 40.8368, lng: 14.2468 },
        storyContent: 'I re Borboni erano ossessionati dalle sirene. Raccoglievano ogni reliquia e documento che ne provasse l\'esistenza reale...',
        hint: 'Cerca la sala con affreschi marini, al piano nobile',
        validationRadius: 30,
        requiredAction: 'photo',
        secretToUnlock: 'Le reliquie borboniche delle sirene'
      }
    ],
    
    finalChallenge: {
      title: 'Il Tesoro di Partenope',
      description: 'Trova il simbolo che indica dove Partenope nascose la sua conoscenza',
      instructions: 'Cerca nella Biblioteca Nazionale, tra i manoscritti medievali...',
      hint: 'Il simbolo è una conchiglia con una perla nera',
      validationType: 'photo_with_symbol',
      expectedSymbol: '🐚',
      location: 'Biblioteca Nazionale, sala manoscritti'
    },
    
    rewards: {
      points: 220,
      storyPoints: 45,
      badge: 'badge_cantore_sirene',
      unlockContent: {
        title: 'I Canti delle Sirene',
        content: 'Ascolta le registrazioni dei canti tradizionali napoletani che conservano le melodie delle sirene antiche...'
      }
    },
    
    socialShare: {
      template: 'ho_seguito_sirene_partenope',
      title: 'Ho seguito le sirene di Partenope! 🧜‍♀️',
      hashtags: ['#JourneyFlux', '#SireneNapoli', '#Partenope', '#MitologiaNapoletana']
    },
    
    createdBy: 'JourneyFlux_Curator',
    createdDate: '2025-07-06',
    tags: ['sirene', 'partenope', 'mitologia', 'castel_ovo', 'leggende_marine'],
    featured: false,
    premium: false,
    
    completionRate: 89,
    averageRating: 4.6,
    totalCompletions: 978,
    
    requirements: {
      minLevel: 'novizio',
      prerequisites: [],
      timeRestrictions: null
    }
  },

  {
    id: 'np_napoli_pizza_margherita_complotto',
    type: CONTENT_TYPES.NARRATIVE_PATH,
    title: 'Il Complotto della Pizza Margherita',
    category: NARRATIVE_CATEGORIES.GASTRONOMIA,
    city: 'Napoli',
    
    introduction: 'La pizza Margherita non fu creata per onorare la regina. Fu un messaggio politico segreto dei pizzaioli napoletani contro l\'unità d\'Italia. Ogni ingrediente nascondeva un simbolo di resistenza...',
    
    description: 'Scopri la vera storia politica della pizza Margherita e come i pizzaioli napoletani usarono il cibo per la resistenza.',
    
    difficulty: 'media',
    duration: 65,
    estimatedSteps: 4500,
    coordinates: { lat: 40.8514, lng: 14.2663 },
    
    steps: [
      {
        id: 'step_1',
        title: 'Pizzeria Brandi - La Nascita del Simbolo',
        description: 'Scopri i documenti segreti che rivelano il vero significato della pizza tricolore',
        coordinates: { lat: 40.8518, lng: 14.2681 },
        storyContent: 'Raffaele Esposito non inventò la Margherita per patriottismo. Era un messaggio in codice: il rosso del pomodoro per il sangue versato, il bianco della mozzarella per le lacrime, il verde del basilico per la speranza...',
        hint: 'Cerca la targa nascosta dietro il bancone storico',
        validationRadius: 25,
        requiredAction: 'photo',
        secretToUnlock: 'Il codice segreto della pizza Margherita'
      },
      {
        id: 'step_2',
        title: 'Quartieri Spagnoli - La Rete dei Pizzaioli',
        description: 'Trova i simboli che i pizzaioli usavano per riconoscersi come resistenti',
        coordinates: { lat: 40.8465, lng: 14.2505 },
        storyContent: 'I pizzaioli dei Quartieri Spagnoli formavano una rete di resistenza. Usavano simboli nascosti sui loro forni per comunicare informazioni politiche...',
        hint: 'Cerca il forno con la stella a otto punte',
        validationRadius: 35,
        requiredAction: 'photo',
        secretToUnlock: 'I simboli della resistenza pizzaiola'
      },
      {
        id: 'step_3',
        title: 'Palazzo Reale - Il Pranzo della Verità',
        description: 'Scopri cosa accadde davvero quando la regina assaggiò la pizza',
        coordinates: { lat: 40.8368, lng: 14.2468 },
        storyContent: 'La regina Margherita capì il messaggio nascosto nella pizza. Ma invece di punire i pizzaioli, decise di giocare il loro stesso gioco...',
        hint: 'Cerca la sala da pranzo con gli affreschi alimentari',
        validationRadius: 30,
        requiredAction: 'photo',
        secretToUnlock: 'La reazione segreta della regina'
      }
    ],
    
    finalChallenge: {
      title: 'La Ricetta della Libertà',
      description: 'Trova la ricetta originale che conteneva il messaggio politico completo',
      instructions: 'Cerca negli archivi di Palazzo San Giacomo, tra i documenti del 1889...',
      hint: 'La ricetta è scritta in dialetto napoletano con parole in codice',
      validationType: 'photo_with_text',
      expectedText: 'LIBERTÀ',
      location: 'Archivi storici, fondo gastronomico'
    },
    
    rewards: {
      points: 240,
      storyPoints: 55,
      badge: 'badge_pizzaiolo_rivoluzionario',
      unlockContent: {
        title: 'Le Ricette della Resistenza',
        content: 'Scopri come altri piatti tradizionali napoletani nascondevano messaggi politici e di resistenza...'
      }
    },
    
    socialShare: {
      template: 'ho_svelato_complotto_margherita',
      title: 'Ho svelato il complotto della Pizza Margherita! 🍕',
      hashtags: ['#JourneyFlux', '#PizzaMargherita', '#StoriaSegreta', '#ResistenzaNapoletana']
    },
    
    createdBy: 'JourneyFlux_Curator',
    createdDate: '2025-07-06',
    tags: ['pizza', 'storia_politica', 'resistenza', 'gastronomia_politica'],
    featured: true,
    premium: false,
    
    completionRate: 76,
    averageRating: 4.7,
    totalCompletions: 1123,
    
    requirements: {
      minLevel: 'novizio',
      prerequisites: [],
      timeRestrictions: null
    }
  }
];

// 📊 ARRAY COMPLETO E FUNZIONI HELPER

export const narrativePaths = [
  ...narrativePathsRoma,
  ...narrativePathsNapoli
];

/**
 * Ottiene tutti i percorsi narrativi
 * @returns {Array} Array di percorsi narrativi
 */
export const getAllNarrativePaths = () => narrativePaths;

/**
 * Ottiene percorsi narrativi per città
 * @param {string} city - Nome della città
 * @returns {Array} Array di percorsi per la città
 */
export const getNarrativePathsByCity = (city) => {
  return narrativePaths.filter(path => 
    path.city.toLowerCase() === city.toLowerCase()
  );
};

/**
 * Ottiene percorsi narrativi per categoria
 * @param {string} category - Categoria del percorso
 * @returns {Array} Array di percorsi per categoria
 */
export const getNarrativePathsByCategory = (category) => {
  return narrativePaths.filter(path => path.category === category);
};

/**
 * Ottiene percorso narrativo per ID
 * @param {string} id - ID del percorso
 * @returns {Object|null} Percorso narrativo o null
 */
export const getNarrativePathById = (id) => {
  return narrativePaths.find(path => path.id === id) || null;
};

/**
 * Ottiene percorsi narrativi featured
 * @returns {Array} Array di percorsi featured
 */
export const getFeaturedNarrativePaths = () => {
  return narrativePaths.filter(path => path.featured === true);
};

/**
 * Ottiene percorsi narrativi per livello utente
 * @param {string} userLevel - Livello utente
 * @returns {Array} Array di percorsi accessibili
 */
export const getNarrativePathsByUserLevel = (userLevel) => {
  const levelHierarchy = ['novizio', 'cercatore', 'maestro', 'leggenda'];
  const userLevelIndex = levelHierarchy.indexOf(userLevel.toLowerCase());
  
  return narrativePaths.filter(path => {
    const requiredLevelIndex = levelHierarchy.indexOf(path.requirements.minLevel.toLowerCase());
    return requiredLevelIndex <= userLevelIndex;
  });
};

/**
 * Ottiene percorsi narrativi disponibili in base a prerequisiti
 * @param {Array} completedPaths - Array di ID percorsi completati
 * @returns {Array} Array di percorsi disponibili
 */
export const getAvailableNarrativePaths = (completedPaths = []) => {
  return narrativePaths.filter(path => {
    if (path.requirements.prerequisites.length === 0) return true;
    return path.requirements.prerequisites.every(prereq => 
      completedPaths.includes(prereq)
    );
  });
};

/**
 * Calcola statistiche dei percorsi narrativi
 * @returns {Object} Statistiche aggregate
 */
export const getNarrativePathsStats = () => {
  return {
    total: narrativePaths.length,
    byCity: narrativePaths.reduce((acc, path) => {
      acc[path.city] = (acc[path.city] || 0) + 1;
      return acc;
    }, {}),
    byCategory: narrativePaths.reduce((acc, path) => {
      acc[path.category] = (acc[path.category] || 0) + 1;
      return acc;
    }, {}),
    byDifficulty: narrativePaths.reduce((acc, path) => {
      acc[path.difficulty] = (acc[path.difficulty] || 0) + 1;
      return acc;
    }, {}),
    averageRating: narrativePaths.reduce((sum, path) => sum + path.averageRating, 0) / narrativePaths.length,
    totalCompletions: narrativePaths.reduce((sum, path) => sum + path.totalCompletions, 0)
  };
};

export default {
  narrativePaths,
  getAllNarrativePaths,
  getNarrativePathsByCity,
  getNarrativePathsByCategory,
  getNarrativePathById,
  getFeaturedNarrativePaths,
  getNarrativePathsByUserLevel,
  getAvailableNarrativePaths,
  getNarrativePathsStats
};
