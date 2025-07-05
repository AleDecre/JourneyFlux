// Mock data for travel challenges
export const challenges = [
  {
    id: 1,
    title: "Sfida Sfogliatella Napoletana",
    description: "Trova la pasticceria più antica di Napoli e scatta una foto della sfogliatella davanti al bancone. Assaggiale e condividi la tua esperienza!",
    location: "Napoli, Campania",
    difficulty: "Facile",
    points: 150,
    category: "Gastronomia",
    image: "🥐",
    coordinates: { lat: 40.8518, lng: 14.2681 },
    requirements: [
      "Scatta una foto della sfogliatella",
      "Geolocalizzazione nel centro storico di Napoli",
      "Condividi una breve recensione"
    ],
    completed: false,
    badge: "Maestro della Sfogliatella"
  },
  {
    id: 2,
    title: "Caccia al Tesoro del Duomo",
    description: "Trova 3 dettagli architettonici segreti del Duomo di Milano. Segui gli indizi e scatta le foto richieste per sbloccare il badge!",
    location: "Milano, Lombardia",
    difficulty: "Media",
    points: 300,
    category: "Cultura",
    image: "🏰",
    coordinates: { lat: 45.4640, lng: 9.1916 },
    requirements: [
      "Trova il leone di pietra nascosto",
      "Fotografa la guglia più piccola",
      "Scopri l'iscrizione latina segreta"
    ],
    completed: false,
    badge: "Esploratore del Duomo"
  },
  {
    id: 3,
    title: "Tour Aperitivo Romano",
    description: "Visita 3 locali storici di Roma per l'aperitivo perfetto. Prova spritz, negroni e supplì in luoghi autentici del centro.",
    location: "Roma, Lazio",
    difficulty: "Media",
    points: 250,
    category: "Gastronomia",
    image: "🍸",
    coordinates: { lat: 41.9028, lng: 12.4964 },
    requirements: [
      "Visita 3 locali diversi",
      "Prova almeno 2 drink diversi",
      "Scatta foto degli aperitivi"
    ],
    completed: true,
    badge: "Maestro dell'Aperitivo"
  },
  {
    id: 4,
    title: "Borghi Nascosti della Toscana",
    description: "Scopri 2 borghi medievali meno conosciuti della Toscana. Trova il punto panoramico migliore e immortala il paesaggio.",
    location: "Toscana",
    difficulty: "Difficile",
    points: 500,
    category: "Natura",
    image: "🏔️",
    coordinates: { lat: 43.3439, lng: 11.3161 },
    requirements: [
      "Visita 2 borghi fuori dalle rotte turistiche",
      "Scatta foto panoramiche",
      "Interagisci con un locale"
    ],
    completed: false,
    badge: "Scopritore di Borghi"
  },
  {
    id: 5,
    title: "Street Art Milanese",
    description: "Trova 5 murales iconici nei quartieri Isola e Brera. Scopri gli artisti dietro le opere e condividi la loro storia.",
    location: "Milano, Lombardia",
    difficulty: "Media",
    points: 200,
    category: "Arte",
    image: "🎨",
    coordinates: { lat: 45.4773, lng: 9.1815 },
    requirements: [
      "Fotografa 5 murales diversi",
      "Identifica almeno 2 artisti",
      "Condividi location precise"
    ],
    completed: false,
    badge: "Cacciatore di Street Art"
  },
  {
    id: 6,
    title: "Gelato Artigianale Fiorentino",
    description: "Assaggia i 3 gusti più originali nelle migliori gelaterie artigianali di Firenze. Scopri i segreti della gelateria tradizionale.",
    location: "Firenze, Toscana",
    difficulty: "Facile",
    points: 180,
    category: "Gastronomia",
    image: "🍦",
    coordinates: { lat: 43.7696, lng: 11.2558 },
    requirements: [
      "Visita 3 gelaterie artigianali",
      "Prova gusti unici del territorio",
      "Scatta foto dei gelati"
    ],
    completed: false,
    badge: "Maestro del Gelato"
  }
];

export const getChallengesByCity = (city) => {
  return challenges.filter(challenge => 
    challenge.location.toLowerCase().includes(city.toLowerCase())
  );
};

export const getChallengeById = (id) => {
  return challenges.find(challenge => challenge.id === id);
};

export const getCompletedChallenges = () => {
  return challenges.filter(challenge => challenge.completed);
};

export const getPendingChallenges = () => {
  return challenges.filter(challenge => !challenge.completed);
};
