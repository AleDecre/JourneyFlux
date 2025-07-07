import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { theme } from './utils/theme';
import { Platform } from 'react-native';

// Screens
import HomeScreen from './screens/HomeScreen';
import ChallengeScreen from './screens/ChallengeScreen';
import ChallengeCompleteScreen from './screens/ChallengeCompleteScreen';
import ExperienceCompleteScreen from './screens/ExperienceCompleteScreen';
import MapScreen from './screens/MapScreen';
import ProfileScreen from './screens/ProfileScreen';
import NarrativePathScreen from './screens/NarrativePathScreen';
import ItineraryScreen from './screens/ItineraryScreen';
import PartnerExperienceScreen from './screens/PartnerExperienceScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack Navigator per Home e Challenge
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Challenge" component={ChallengeScreen} />
      <Stack.Screen name="ChallengeComplete" component={ChallengeCompleteScreen} />
      <Stack.Screen name="ExperienceComplete" component={ExperienceCompleteScreen} />
      <Stack.Screen name="NarrativePath" component={NarrativePathScreen} />
      <Stack.Screen name="Itinerary" component={ItineraryScreen} />
      <Stack.Screen name="PartnerExperience" component={PartnerExperienceScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

// Tab Navigator principale
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'MapTab') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'ProfileTab') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4ECDC4',
        tabBarInactiveTintColor: '#95A5A6',
        tabBarStyle: {
          backgroundColor: '#F8F9FA',
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          height: 60,
          ...(Platform.OS !== 'web' ? { paddingBottom: 12 } : {}), // padding solo su mobile
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: theme.fonts.semiBold,
        },
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeStack} 
        options={{
          tabBarLabel: 'Esplora'
        }}
      />
      <Tab.Screen 
        name="MapTab" 
        component={MapScreen} 
        options={{
          tabBarLabel: 'Mappa'
        }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileScreen} 
        options={{
          tabBarLabel: 'Profilo'
        }}
      />
    </Tab.Navigator>
  );
};

// Navigation Container principale
export default function Navigation() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
