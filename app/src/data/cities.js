// Mock data for cities
export const cities = [
  {
    id: 1,
    name: "Milano",
    region: "Lombardia",
    coordinates: { lat: 45.4642, lng: 9.1900 },
    challengesCount: 2,
    image: "🏙️",
    description: "La capitale della moda e del design",
    featured: true
  },
  {
    id: 2,
    name: "Roma",
    region: "Lazio",
    coordinates: { lat: 41.9028, lng: 12.4964 },
    challengesCount: 1,
    image: "🏛️",
    description: "La città eterna ricca di storia",
    featured: true
  },
  {
    id: 3,
    name: "Napoli",
    region: "Campania",
    coordinates: { lat: 40.8518, lng: 14.2681 },
    challengesCount: 1,
    image: "🌋",
    description: "La culla della pizza e della tradizione",
    featured: true
  },
  {
    id: 4,
    name: "Firenze",
    region: "Toscana",
    coordinates: { lat: 43.7696, lng: 11.2558 },
    challengesCount: 1,
    image: "🎨",
    description: "Il cuore del Rinascimento italiano",
    featured: true
  },
  {
    id: 5,
    name: "Toscana",
    region: "Toscana",
    coordinates: { lat: 43.3439, lng: 11.3161 },
    challengesCount: 1,
    image: "🏞️",
    description: "Paesaggi mozzafiato e borghi storici",
    featured: false
  }
];

export const getFeaturedCities = () => {
  return cities.filter(city => city.featured);
};

export const getCityById = (id) => {
  return cities.find(city => city.id === id);
};

export const getCityByName = (name) => {
  return cities.find(city => city.name.toLowerCase() === name.toLowerCase());
};
