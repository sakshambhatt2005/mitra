const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// City coordinates for more accurate data
const CITY_COORDS = {
  'Delhi': { lat: 28.6139, lon: 77.2090 },
  'Mumbai': { lat: 19.0760, lon: 72.8777 },
  'Bangalore': { lat: 12.9716, lon: 77.5946 },
  'Kolkata': { lat: 22.5726, lon: 88.3639 },
  'Chennai': { lat: 13.0827, lon: 80.2707 }
};

export interface WeatherData {
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
    rain?: {
      '1h': number;
    };
  };
  daily: Array<{
    dt: number;
    temp: {
      min: number;
      max: number;
    };
    humidity: number;
    wind_speed: number;
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
    rain?: number;
  }>;
}

const kelvinToCelsius = (kelvin: number): number => {
  return Math.round(kelvin - 273.15);
};

export const getWeatherData = async (city: string): Promise<any> => {
  try {
    const coords = CITY_COORDS[city as keyof typeof CITY_COORDS];
    if (!coords) {
      throw new Error('City coordinates not found');
    }

    // Get current weather
    const currentResponse = await fetch(
      `${BASE_URL}/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
    );

    if (!currentResponse.ok) {
      throw new Error('Current weather data fetch failed');
    }

    // Get forecast
    const forecastResponse = await fetch(
      `${BASE_URL}/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
    );

    if (!forecastResponse.ok) {
      throw new Error('Forecast data fetch failed');
    }

    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();

    return {
      current: currentData,
      forecast: forecastData
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const formatWeatherData = (data: any, city: string) => {
  const current = {
    day: 'today',
    date: new Date(),
    temp: {
      max: kelvinToCelsius(data.current.main.temp),
      min: kelvinToCelsius(data.current.main.temp_min)
    },
    humidity: data.current.main.humidity,
    rainfall: data.current.rain?.['1h'] || 0,
    windSpeed: Math.round(data.current.wind.speed * 3.6), // Convert m/s to km/h
    condition: data.current.weather[0].main.toLowerCase(),
    description: data.current.weather[0].description,
    icon: data.current.weather[0].icon,
    feels_like: kelvinToCelsius(data.current.main.feels_like)
  };

  // Process 5-day forecast data (data comes in 3-hour intervals)
  const dailyForecasts = new Map();
  
  data.forecast.list.forEach((item: any) => {
    const date = new Date(item.dt * 1000);
    const dateKey = date.toDateString();
    
    if (!dailyForecasts.has(dateKey)) {
      dailyForecasts.set(dateKey, {
        temps: [],
        weather: item.weather[0],
        humidity: item.main.humidity,
        windSpeed: item.wind.speed,
        rainfall: item.rain?.['3h'] || 0,
        date: date
      });
    }
    
    const forecast = dailyForecasts.get(dateKey);
    forecast.temps.push(item.main.temp);
  });

  const daily = Array.from(dailyForecasts.values())
    .slice(1, 8) // Next 7 days
    .map(day => ({
      day: 'future',
      date: day.date,
      temp: {
        max: kelvinToCelsius(Math.max(...day.temps)),
        min: kelvinToCelsius(Math.min(...day.temps))
      },
      humidity: day.humidity,
      rainfall: day.rainfall,
      windSpeed: Math.round(day.windSpeed * 3.6), // Convert m/s to km/h
      condition: day.weather.main.toLowerCase(),
      description: day.weather.description,
      icon: day.weather.icon
    }));

  return {
    current,
    daily
  };
}; 