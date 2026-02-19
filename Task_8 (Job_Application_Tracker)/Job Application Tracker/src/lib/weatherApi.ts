// Weather API utilities with mock data
// To use real API: Replace YOUR_API_KEY_HERE with your actual OpenWeatherMap API key

const API_KEY = 'YOUR_API_KEY_HERE';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  coords: {
    lat: number;
    lon: number;
  };
}

export interface ForecastDay {
  date: string;
  tempMax: number;
  tempMin: number;
  description: string;
  icon: string;
  humidity: number;
}

// Mock weather data for demonstration
const mockWeatherData: Record<string, WeatherData> = {
  'new york': {
    city: 'New York',
    country: 'US',
    temperature: 18,
    feelsLike: 16,
    description: 'Partly cloudy',
    icon: '02d',
    humidity: 65,
    windSpeed: 4.5,
    pressure: 1013,
    coords: { lat: 40.7128, lon: -74.006 },
  },
  'london': {
    city: 'London',
    country: 'GB',
    temperature: 12,
    feelsLike: 10,
    description: 'Light rain',
    icon: '10d',
    humidity: 78,
    windSpeed: 6.2,
    pressure: 1008,
    coords: { lat: 51.5074, lon: -0.1278 },
  },
  'tokyo': {
    city: 'Tokyo',
    country: 'JP',
    temperature: 22,
    feelsLike: 21,
    description: 'Clear sky',
    icon: '01d',
    humidity: 55,
    windSpeed: 3.1,
    pressure: 1015,
    coords: { lat: 35.6762, lon: 139.6503 },
  },
  'paris': {
    city: 'Paris',
    country: 'FR',
    temperature: 15,
    feelsLike: 14,
    description: 'Overcast clouds',
    icon: '04d',
    humidity: 70,
    windSpeed: 5.0,
    pressure: 1011,
    coords: { lat: 48.8566, lon: 2.3522 },
  },
  'sydney': {
    city: 'Sydney',
    country: 'AU',
    temperature: 25,
    feelsLike: 24,
    description: 'Sunny',
    icon: '01d',
    humidity: 60,
    windSpeed: 4.0,
    pressure: 1018,
    coords: { lat: -33.8688, lon: 151.2093 },
  },
  'dubai': {
    city: 'Dubai',
    country: 'AE',
    temperature: 32,
    feelsLike: 35,
    description: 'Hot and sunny',
    icon: '01d',
    humidity: 45,
    windSpeed: 2.5,
    pressure: 1010,
    coords: { lat: 25.2048, lon: 55.2708 },
  },
};

const mockForecastData: Record<string, ForecastDay[]> = {
  'new york': [
    { date: 'Tomorrow', tempMax: 20, tempMin: 15, description: 'Sunny', icon: '01d', humidity: 60 },
    { date: 'Thu', tempMax: 19, tempMin: 14, description: 'Partly cloudy', icon: '02d', humidity: 65 },
    { date: 'Fri', tempMax: 17, tempMin: 13, description: 'Cloudy', icon: '03d', humidity: 70 },
  ],
  'london': [
    { date: 'Tomorrow', tempMax: 14, tempMin: 9, description: 'Light rain', icon: '10d', humidity: 80 },
    { date: 'Thu', tempMax: 13, tempMin: 8, description: 'Rainy', icon: '09d', humidity: 85 },
    { date: 'Fri', tempMax: 15, tempMin: 10, description: 'Partly cloudy', icon: '02d', humidity: 75 },
  ],
  'tokyo': [
    { date: 'Tomorrow', tempMax: 24, tempMin: 18, description: 'Clear', icon: '01d', humidity: 50 },
    { date: 'Thu', tempMax: 23, tempMin: 17, description: 'Sunny', icon: '01d', humidity: 52 },
    { date: 'Fri', tempMax: 22, tempMin: 16, description: 'Partly cloudy', icon: '02d', humidity: 58 },
  ],
  'paris': [
    { date: 'Tomorrow', tempMax: 16, tempMin: 11, description: 'Cloudy', icon: '04d', humidity: 68 },
    { date: 'Thu', tempMax: 17, tempMin: 12, description: 'Partly cloudy', icon: '02d', humidity: 65 },
    { date: 'Fri', tempMax: 18, tempMin: 13, description: 'Sunny', icon: '01d', humidity: 60 },
  ],
  'sydney': [
    { date: 'Tomorrow', tempMax: 26, tempMin: 20, description: 'Sunny', icon: '01d', humidity: 58 },
    { date: 'Thu', tempMax: 27, tempMin: 21, description: 'Clear', icon: '01d', humidity: 55 },
    { date: 'Fri', tempMax: 25, tempMin: 19, description: 'Partly cloudy', icon: '02d', humidity: 62 },
  ],
  'dubai': [
    { date: 'Tomorrow', tempMax: 34, tempMin: 28, description: 'Hot', icon: '01d', humidity: 42 },
    { date: 'Thu', tempMax: 35, tempMin: 29, description: 'Sunny', icon: '01d', humidity: 40 },
    { date: 'Fri', tempMax: 33, tempMin: 27, description: 'Clear', icon: '01d', humidity: 43 },
  ],
};

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getCurrentWeather(city: string): Promise<WeatherData> {
  // Simulate API call delay
  await delay(800);

  // In production, use real API:
  // const response = await fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`);
  // const data = await response.json();
  // return parseWeatherData(data);

  const cityKey = city.toLowerCase();
  const weatherData = mockWeatherData[cityKey];

  if (!weatherData) {
    throw new Error('City not found');
  }

  return weatherData;
}

export async function getForecast(city: string): Promise<ForecastDay[]> {
  // Simulate API call delay
  await delay(800);

  // In production, use real API:
  // const response = await fetch(`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`);
  // const data = await response.json();
  // return parseForecastData(data);

  const cityKey = city.toLowerCase();
  const forecastData = mockForecastData[cityKey];

  if (!forecastData) {
    throw new Error('City not found');
  }

  return forecastData;
}

export async function getWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
  // Simulate API call delay
  await delay(800);

  // In production, use real API:
  // const response = await fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
  // const data = await response.json();
  // return parseWeatherData(data);

  // For demo, return New York weather for any coordinates
  return {
    city: 'Your Location',
    country: 'US',
    temperature: 20,
    feelsLike: 18,
    description: 'Partly cloudy',
    icon: '02d',
    humidity: 62,
    windSpeed: 4.8,
    pressure: 1012,
    coords: { lat, lon },
  };
}

export function getWeatherIconUrl(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

// Helper function to get suggestions for autocomplete
export function getCitySuggestions(query: string): string[] {
  const cities = Object.values(mockWeatherData).map(data => data.city);
  const lowerQuery = query.toLowerCase();
  return cities.filter(city => city.toLowerCase().includes(lowerQuery)).slice(0, 5);
}
