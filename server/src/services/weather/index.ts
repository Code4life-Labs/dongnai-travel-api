import axios from "axios";

// Import utils
import { ErrorUtils } from "src/utils/error";

// Import AppConfig
import AppConfig from "src/app.config.json";

export class WeatherService {
  units!: string;
  cnt!: number;

  private _baseUrl!: string;
  private _apiKey!: string;
  private _defaultLanguage!: string;

  constructor() {
    this.units = AppConfig.apis.openWeather.settings.units;
    this.cnt = AppConfig.apis.openWeather.settings.cnt;

    this._baseUrl = AppConfig.apis.openWeather.baseURL;
    this._apiKey = AppConfig.apis.openWeather.apiKey;
    this._defaultLanguage = AppConfig.apis.openWeather.settings.language;
  }

  /**
   * Use to get current weather
   * @param coor
   */
  async requestCurrentWeather(coor: any) {
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
   * @param coor
   * @returns
   */
  async forecastWeather(coor: any) {
    return ErrorUtils.handleInterchangeError(this, async function () {
      const params = {
        lat: coor.latitude,
        lon: coor.longitude,
        units: this.units,
        cnt: this.cnt,
        lang: this._defaultLanguage,
        appid: this._apiKey,
      };

      const response = await axios.get(`${this._baseUrl}/data/2.5/forecast`, {
        params,
      });

      return response.data;
    });
  }

  /**
   * Use to forecast weather by address
   * @param address
   * @returns
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

      const response = await axios.get(`${this._baseUrl}/data/2.5/forecast`, {
        params,
      });

      return response.data;
    });
  }

  async requestGeoCodingDirect(address: string) {
    return ErrorUtils.handleInterchangeError(this, async function () {
      const params = {
        q: address,
        limit: 1,
        appid: this._apiKey,
      };

      const response = await axios.get(`${this._baseUrl}/geo/1.0/direct`, {
        params,
      });

      return {
        name: response.data[0].name,
        coor: {
          longitude: response.data[0].lon,
          latitude: response.data[0].lat,
        },
      };
    });
  }

  async requestGeoCodingReverse(coor: any) {
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

      return {
        name: response.data[0].name,
      };
    });
  }
}

export const weatherService = new WeatherService();
