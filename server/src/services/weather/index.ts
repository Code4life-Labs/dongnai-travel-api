import axios from "axios";

// Import utils
import { ErrorUtils } from "src/utils/error";
import { ConfigUtils } from "src/utils/config";

// Import types
import { Coordinates, WeatherForecast } from "src/types/weather";
import { InterchangeDateType } from "src/utils/http";

interface GeoCodingResponse {
  name: string;
  coor?: Coordinates;
}

export class WeatherService {
  units!: string;
  cnt!: number;

  private _baseUrl!: string;
  private _apiKey!: string;
  private _defaultLanguage!: string;

  constructor() {
    const weatherConfig = ConfigUtils.getApiConfig("openWeather");
    
    this.units = weatherConfig.settings.units;
    this.cnt = weatherConfig.settings.cnt;

    this._baseUrl = weatherConfig.baseURL;
    this._apiKey = weatherConfig.apiKey;
    this._defaultLanguage = weatherConfig.settings.language;
  }

  /**
   * Use to get current weather
   * @param coor Latitude and longitude coordinates
   * @returns Current weather data
   */
  async requestCurrentWeather(coor: Coordinates) {
    return ErrorUtils.handleInterchangeError(this, async function () {
      const params = {
        lat: coor.latitude,
        lon: coor.longitude,
        units: this.units,
        lang: this._defaultLanguage,
        appid: this._apiKey,
      };

      const response = await axios.get(`${this._baseUrl}/data/2.5/weather`, {
        params,
      });

      return response.data;
    });
  }

  /**
   * Use to forecast weather
   * @param coor Latitude and longitude coordinates
   * @returns Weather forecast data
   */
  async forecastWeather(coor: Coordinates) {
    return ErrorUtils.handleInterchangeError(this, async function () {
      const params = {
        lat: coor.latitude,
        lon: coor.longitude,
        units: this.units,
        cnt: this.cnt,
        lang: this._defaultLanguage,
        appid: this._apiKey,
      };

      const response = await axios.get<WeatherForecast>(`${this._baseUrl}/data/2.5/forecast`, {
        params,
      });

      return response.data;
    });
  }

  /**
   * Use to forecast weather by address
   * @param address Location address string
   * @returns Weather forecast data
   */
  async forecastWeatherByAddress(address: string) {
    return ErrorUtils.handleInterchangeError(this, async function () {
      const params = {
        q: address,
        units: this.units,
        cnt: this.cnt,
        lang: this._defaultLanguage,
        appid: this._apiKey,
      };

      const response = await axios.get<WeatherForecast>(`${this._baseUrl}/data/2.5/forecast`, {
        params,
      });

      return response.data;
    });
  }

  /**
   * Get coordinates from location address
   * @param address Location address string
   * @returns Location name and coordinates
   */
  async requestGeoCodingDirect(address: string): Promise<InterchangeDateType<GeoCodingResponse>> {
    return ErrorUtils.handleInterchangeError(this, async function () {
      const params = {
        q: address,
        limit: 1,
        appid: this._apiKey,
      };

      const response = await axios.get(`${this._baseUrl}/geo/1.0/direct`, {
        params,
      });

      if (!response.data || !response.data[0]) {
        return { name: address };
      }

      return {
        name: response.data[0].name,
        coor: {
          longitude: response.data[0].lon,
          latitude: response.data[0].lat,
        },
      };
    });
  }

  /**
   * Get location name from coordinates
   * @param coor Latitude and longitude coordinates
   * @returns Location name
   */
  async requestGeoCodingReverse(coor: Coordinates): Promise<InterchangeDateType<GeoCodingResponse>> {
    return ErrorUtils.handleInterchangeError(this, async function () {
      const params = {
        lat: coor.latitude,
        lon: coor.longitude,
        limit: 1,
        appid: this._apiKey,
      };

      const response = await axios.get(`${this._baseUrl}/geo/1.0/reverse`, {
        params,
      });

      if (!response.data || !response.data[0]) {
        return { name: `${coor.latitude},${coor.longitude}` };
      }

      return {
        name: response.data[0].name,
      };
    });
  }
}

export const weatherService = new WeatherService();
