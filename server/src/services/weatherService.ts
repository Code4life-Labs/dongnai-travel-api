import axios from "axios";
import AppConfig from "../app.config.json";

const weatherConfig = AppConfig.apis.openWeather;

export class WeatherService {
  private apiKey: string;
  private baseURL: string;
  private settings: typeof weatherConfig.settings;
  private isConfigured: boolean;

  constructor() {
    this.apiKey = weatherConfig.apiKey || "";
    this.baseURL = weatherConfig.baseURL;
    this.settings = weatherConfig.settings;
    this.isConfigured = !!this.apiKey;

    if (!this.isConfigured) {
      console.warn("Weather API is not configured. Weather data will not be available.");
    }
  }

  async getWeatherData(lat: number, lng: number) {
    if (!this.isConfigured) {
      return {
        success: false,
        message: "Weather API is not configured",
        data: null
      };
    }

    try {
      const response = await axios.get(`${this.baseURL}/data/2.5/forecast`, {
        params: {
          lat,
          lon: lng,
          appid: this.apiKey,
          units: this.settings.units,
          lang: this.settings.language || "en",
          cnt: this.settings.cnt
        }
      });

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return {
        success: false,
        message: "Failed to fetch weather data",
        error
      };
    }
  }

  // Add other weather-related methods as needed
}

export default new WeatherService(); 