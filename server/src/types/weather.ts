/**
 * Weather-related type definitions
 */

import { WeatherData } from "./chatbot";

// Coordinates interface
export interface Coordinates {
  latitude: number;
  longitude: number;
}

// Weather item interface
export interface WeatherItem {
  id: number;
  main: string;
  description: string;
  icon: string;
}

// Weather data main metrics
export interface WeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

// City information
export interface WeatherCity {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  timezone: number;
}

// Weather forecast item
export interface ForecastItem {
  dt: number;
  main: WeatherMain;
  weather: WeatherItem[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  dt_txt: string;
}

// Complete weather forecast data
export interface WeatherForecast {
  city: WeatherCity;
  list: ForecastItem[];
}

// API response format
export interface WeatherResponse {
  data?: WeatherForecast;
  error?: {
    title: string;
    content: string;
    details?: any;
  };
}

/**
 * Converts WeatherForecast to WeatherData format required by chatbot
 */
export function convertToWeatherData(forecast: WeatherForecast): WeatherData {
  // Extract first item for current weather
  const currentItem = forecast.list[0];
  
  return {
    name: forecast.city.name,
    country: forecast.city.country,
    current: {
      temp: currentItem.main.temp,
      feels_like: currentItem.main.feels_like,
      humidity: currentItem.main.humidity,
      wind_speed: currentItem.wind.speed,
      weather: currentItem.weather.map(w => ({
        main: w.main,
        description: w.description,
        icon: w.icon
      }))
    },
    forecast: forecast.list.slice(1).map(item => ({
      dt: item.dt,
      dt_txt: item.dt_txt,
      temp: item.main.temp,
      feels_like: item.main.feels_like,
      humidity: item.main.humidity,
      wind_speed: item.wind.speed,
      weather: item.weather[0]
    }))
  };
} 