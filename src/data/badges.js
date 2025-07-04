// Mock data for user badges
export const badges = [
  {
    id: 1,
    name: "Maestro dell'Aperitivo",
    description: "Completato il tour aperitivo romano",
    icon: "🍸",
    color: "#FF6B6B",
    earned: true,
    earnedDate: "2025-06-15"
  },
  {
    id: 2,
    name: "Primo Esploratore",
    description: "Completata la prima sfida di viaggio",
    icon: "🌟",
    color: "#4ECDC4",
    earned: true,
    earnedDate: "2025-06-10"
  },
  {
    id: 3,
    name: "Maestro della Sfogliatella",
    description: "Esperto di dolci napoletani",
    icon: "🥐",
    color: "#45B7D1",
    earned: false,
    earnedDate: null
  },
  {
    id: 4,
    name: "Esploratore del Duomo",
    description: "Svelati i segreti del Duomo di Milano",
    icon: "🏰",
    color: "#FFA07A",
    earned: false,
    earnedDate: null
  },
  {
    id: 5,
    name: "Scopritore di Borghi",
    description: "Maestro dell'esplorazione rurale",
    icon: "🏔️",
    color: "#98D8C8",
    earned: false,
    earnedDate: null
  },
  {
    id: 6,
    name: "Cacciatore di Street Art",
    description: "Esperto di arte urbana",
    icon: "🎨",
    color: "#F06292",
    earned: false,
    earnedDate: null
  },
  {
    id: 7,
    name: "Maestro del Gelato",
    description: "Intenditore di gelato artigianale",
    icon: "🍦",
    color: "#FFB74D",
    earned: false,
    earnedDate: null
  },
  {
    id: 8,
    name: "Viaggiatore Dedicato",
    description: "Completate 5 sfide di viaggio",
    icon: "🎒",
    color: "#9C27B0",
    earned: false,
    earnedDate: null
  }
];

export const getEarnedBadges = () => {
  return badges.filter(badge => badge.earned);
};

export const getAvailableBadges = () => {
  return badges.filter(badge => !badge.earned);
};

export const getBadgeById = (id) => {
  return badges.find(badge => badge.id === id);
};
