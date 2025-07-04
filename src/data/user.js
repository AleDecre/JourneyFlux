// Mock data for user profile
export const userData = {
  id: 1,
  username: "MarcoDiViaggio",
  email: "marco@journeyflux.com",
  profileImage: "👤",
  joinDate: "2025-05-01",
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
    difficulty: "Media",
    notifications: true,
    language: "it"
  },
  location: {
    currentCity: "Milano",
    homeCity: "Roma"
  },
  achievements: [
    {
      title: "Prima Sfida Completata",
      date: "2025-06-15",
      description: "Hai completato la tua prima sfida di viaggio!"
    }
  ]
};

export const getUserStats = () => {
  return userData.stats;
};

export const getUserProfile = () => {
  return userData;
};

export const updateUserPoints = (points) => {
  userData.stats.totalPoints += points;
  return userData.stats.totalPoints;
};

export const completeChallenge = () => {
  userData.stats.challengesCompleted += 1;
  userData.stats.currentStreak += 1;
  if (userData.stats.currentStreak > userData.stats.longestStreak) {
    userData.stats.longestStreak = userData.stats.currentStreak;
  }
};
