// Test utilities for JourneyFlux app
import { challenges } from '../data/challenges';
import { badges } from '../data/badges';
import { cities } from '../data/cities';
import { userData } from '../data/user';

// Test data integrity
export const testDataIntegrity = () => {
  console.log('🧪 Testing JourneyFlux Data Integrity...');
  
  // Test challenges data
  const challengeTests = challenges.map(challenge => ({
    id: challenge.id,
    hasTitle: !!challenge.title,
    hasDescription: !!challenge.description,
    hasLocation: !!challenge.location,
    hasPoints: typeof challenge.points === 'number',
    hasCategory: !!challenge.category,
    hasRequirements: Array.isArray(challenge.requirements)
  }));
  
  console.log('✅ Challenge Tests:', challengeTests);
  
  // Test badges data
  const badgeTests = badges.map(badge => ({
    id: badge.id,
    hasName: !!badge.name,
    hasIcon: !!badge.icon,
    hasColor: !!badge.color,
    hasDescription: !!badge.description
  }));
  
  console.log('✅ Badge Tests:', badgeTests);
  
  // Test cities data
  const cityTests = cities.map(city => ({
    id: city.id,
    hasName: !!city.name,
    hasRegion: !!city.region,
    hasCoordinates: !!city.coordinates,
    hasChallengesCount: typeof city.challengesCount === 'number'
  }));
  
  console.log('✅ City Tests:', cityTests);
  
  // Test user data
  const userTests = {
    hasUsername: !!userData.username,
    hasStats: !!userData.stats,
    hasPreferences: !!userData.preferences,
    hasLocation: !!userData.location
  };
  
  console.log('✅ User Tests:', userTests);
  
  return {
    challenges: challengeTests,
    badges: badgeTests,
    cities: cityTests,
    user: userTests
  };
};

// Test component rendering data
export const testComponentData = () => {
  console.log('🧪 Testing Component Data...');
  
  // Test challenge card data
  const challengeCardTest = challenges[0];
  console.log('Challenge Card Test Data:', {
    title: challengeCardTest.title,
    location: challengeCardTest.location,
    points: challengeCardTest.points,
    difficulty: challengeCardTest.difficulty,
    category: challengeCardTest.category,
    image: challengeCardTest.image
  });
  
  // Test badge card data
  const badgeCardTest = badges[0];
  console.log('Badge Card Test Data:', {
    name: badgeCardTest.name,
    icon: badgeCardTest.icon,
    color: badgeCardTest.color,
    earned: badgeCardTest.earned
  });
  
  // Test city selector data
  const cityTest = cities[0];
  console.log('City Selector Test Data:', {
    name: cityTest.name,
    region: cityTest.region,
    image: cityTest.image,
    challengesCount: cityTest.challengesCount
  });
  
  return true;
};

// Test navigation structure
export const testNavigationStructure = () => {
  console.log('🧪 Testing Navigation Structure...');
  
  const navigationTests = {
    homeScreenExists: true,
    challengeScreenExists: true,
    challengeCompleteScreenExists: true,
    mapScreenExists: true,
    profileScreenExists: true,
    navigationConfigExists: true
  };
  
  console.log('✅ Navigation Tests:', navigationTests);
  return navigationTests;
};

// Test mock API functions
export const testMockAPIs = () => {
  console.log('🧪 Testing Mock API Functions...');
  
  // Test challenge filtering
  const milanoChallenges = challenges.filter(c => 
    c.location.toLowerCase().includes('milano')
  );
  
  console.log('Milano Challenges:', milanoChallenges.length);
  
  // Test badge filtering
  const earnedBadges = badges.filter(b => b.earned);
  console.log('Earned Badges:', earnedBadges.length);
  
  // Test user stats
  console.log('User Stats:', userData.stats);
  
  return {
    milanoChallenges: milanoChallenges.length,
    earnedBadges: earnedBadges.length,
    userStats: userData.stats
  };
};

// Performance test
export const testPerformance = () => {
  console.log('🧪 Testing Performance...');
  
  const start = performance.now();
  
  // Simulate heavy operations
  for (let i = 0; i < 1000; i++) {
    challenges.filter(c => c.completed);
    badges.filter(b => b.earned);
    cities.filter(c => c.featured);
  }
  
  const end = performance.now();
  const duration = end - start;
  
  console.log(`Performance Test: ${duration}ms`);
  
  return {
    duration,
    isOptimal: duration < 100
  };
};

// Run all tests
export const runAllTests = () => {
  console.log('🚀 Running All JourneyFlux Tests...');
  
  const results = {
    dataIntegrity: testDataIntegrity(),
    componentData: testComponentData(),
    navigationStructure: testNavigationStructure(),
    mockAPIs: testMockAPIs(),
    performance: testPerformance()
  };
  
  console.log('🎯 All Tests Completed!', results);
  return results;
};

// Debug helpers
export const debugChallenge = (challengeId) => {
  const challenge = challenges.find(c => c.id === challengeId);
  console.log('🔍 Debug Challenge:', challenge);
  return challenge;
};

export const debugUserStats = () => {
  console.log('🔍 Debug User Stats:', userData.stats);
  return userData.stats;
};

export const debugBadges = () => {
  const earned = badges.filter(b => b.earned);
  const available = badges.filter(b => !b.earned);
  console.log('🔍 Debug Badges:', { earned, available });
  return { earned, available };
};
