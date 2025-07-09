import { useState, useEffect } from 'react';

/**
 * Hook per gestire i reminder geografici (mock)
 * Simula la posizione dell'utente e identifica le tappe vicine
 */
export const useGeoReminder = (steps = []) => {
  const [userLocation, setUserLocation] = useState(null);
  const [nearbySteps, setNearbySteps] = useState([]);
  const [locationHistory, setLocationHistory] = useState([]);

  // Mock locations per Roma (per test)
  const MOCK_LOCATIONS = [
    { lat: 41.9028, lng: 12.4964, name: 'Centro Roma' },
    { lat: 41.9016, lng: 12.4667, name: 'Castel Sant\'Angelo' },
    { lat: 41.8986, lng: 12.4768, name: 'Pantheon' },
    { lat: 41.8919, lng: 12.4863, name: 'Colosseo' },
    { lat: 41.8943, lng: 12.4934, name: 'Foro Romano' },
    { lat: 41.9009, lng: 12.4833, name: 'Piazza Navona' },
    { lat: 41.9003, lng: 12.4731, name: 'Fontana di Trevi' },
    { lat: 41.9016, lng: 12.4823, name: 'Vaticano' },
  ];

  // Simula il movimento dell'utente
  useEffect(() => {
    const simulateMovement = () => {
      const randomLocation = MOCK_LOCATIONS[Math.floor(Math.random() * MOCK_LOCATIONS.length)];
      
      // Aggiungi un po' di variazione casuale
      const newLocation = {
        lat: randomLocation.lat + (Math.random() - 0.5) * 0.01,
        lng: randomLocation.lng + (Math.random() - 0.5) * 0.01,
        name: randomLocation.name,
        timestamp: Date.now(),
      };
      
      setUserLocation(newLocation);
      
      // Aggiungi alla cronologia
      setLocationHistory(prev => [...prev.slice(-10), newLocation]);
    };

    // Simula il movimento ogni 30 secondi
    const interval = setInterval(simulateMovement, 30000);
    
    // Imposta posizione iniziale
    simulateMovement();
    
    return () => clearInterval(interval);
  }, []);

  // Calcola la distanza tra due punti geografici (formula di Haversine)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Raggio della Terra in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c * 1000; // Distanza in metri
  };

  // Controlla le tappe vicine quando cambia la posizione
  useEffect(() => {
    if (!userLocation || !steps.length) return;

    const PROXIMITY_THRESHOLD = 200; // 200 metri
    const nearby = [];

    steps.forEach(step => {
      if (step.coordinates) {
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          step.coordinates.lat,
          step.coordinates.lng
        );

        if (distance <= PROXIMITY_THRESHOLD) {
          nearby.push(step.id);
        }
      }
    });

    setNearbySteps(nearby);
  }, [userLocation, steps]);

  // Funzione per aggiornare manualmente la posizione
  const updateLocation = (newLocation) => {
    const locationWithTimestamp = {
      ...newLocation,
      timestamp: Date.now(),
    };
    
    setUserLocation(locationWithTimestamp);
    setLocationHistory(prev => [...prev.slice(-10), locationWithTimestamp]);
  };

  // Funzione per simulare il movimento verso una tappa specifica
  const simulateMovementToStep = (stepId) => {
    const step = steps.find(s => s.id === stepId);
    if (!step || !step.coordinates) return;

    // Simula il movimento verso la tappa
    const newLocation = {
      lat: step.coordinates.lat + (Math.random() - 0.5) * 0.001,
      lng: step.coordinates.lng + (Math.random() - 0.5) * 0.001,
      name: step.title,
      timestamp: Date.now(),
    };

    updateLocation(newLocation);
  };

  // Funzione per ottenere la distanza da una tappa specifica
  const getDistanceFromStep = (stepId) => {
    if (!userLocation) return null;
    
    const step = steps.find(s => s.id === stepId);
    if (!step || !step.coordinates) return null;

    const distance = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      step.coordinates.lat,
      step.coordinates.lng
    );

    return Math.round(distance);
  };

  // Funzione per ottenere le tappe ordinate per distanza
  const getStepsByDistance = () => {
    if (!userLocation) return steps;

    return steps
      .filter(step => step.coordinates)
      .map(step => ({
        ...step,
        distance: calculateDistance(
          userLocation.lat,
          userLocation.lng,
          step.coordinates.lat,
          step.coordinates.lng
        )
      }))
      .sort((a, b) => a.distance - b.distance);
  };

  // Funzione per verificare se una tappa è stata visitata di recente
  const isStepRecentlyVisited = (stepId) => {
    if (!locationHistory.length) return false;

    const step = steps.find(s => s.id === stepId);
    if (!step || !step.coordinates) return false;

    const RECENT_VISIT_THRESHOLD = 100; // 100 metri
    const RECENT_TIME_THRESHOLD = 30 * 60 * 1000; // 30 minuti

    return locationHistory.some(location => {
      const distance = calculateDistance(
        location.lat,
        location.lng,
        step.coordinates.lat,
        step.coordinates.lng
      );

      const timeAgo = Date.now() - location.timestamp;

      return distance <= RECENT_VISIT_THRESHOLD && timeAgo <= RECENT_TIME_THRESHOLD;
    });
  };

  return {
    userLocation,
    nearbySteps,
    locationHistory,
    updateLocation,
    simulateMovementToStep,
    getDistanceFromStep,
    getStepsByDistance,
    isStepRecentlyVisited,
  };
};
