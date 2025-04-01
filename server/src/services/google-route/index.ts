import axios from "axios";

// Import utils
import { ErrorUtils } from "src/utils/error";

// Import AppConfig
import AppConfig from "src/app.config.json";

export class RouteService {
  private _baseUrl!: string;
  private _apiKey!: string;
  private _defaultLanguage!: string;

  constructor() {
    this._baseUrl = AppConfig.apis.googleRoute.baseURL;
    this._apiKey = AppConfig.apis.googleRoute.apiKey;
    this._defaultLanguage = AppConfig.apis.googleRoute.settings.language;
  }

  /**
   * Use to get routes ???
   * Old name: `getComputeRoutesGCP`
   * @param data
   * @returns
   */
  async requestComputeRoutes(data: any) {
    return ErrorUtils.handleInterchangeError(this, async function (o) {
      const params = {
        key: this._apiKey,
      };
      const headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": this._apiKey,
        "X-Goog-FieldMask": "routes",
      };
      let body: any = {
        origin: data.origin,
        destination: data.destination,
        travelMode: data.mode,
        routingPreference: "TRAFFIC_AWARE_OPTIMAL",
        polylineQuality: "HIGH_QUALITY",
        polylineEncoding: "ENCODED_POLYLINE",
        computeAlternativeRoutes: true,
        extraComputations: ["TOLLS", "FUEL_CONSUMPTION", "TRAFFIC_ON_POLYLINE"],
        languageCode: data.languageCode
          ? data.languageCode
          : this._defaultLanguage,
      };

      if (data.routeModifiers) {
        body = {
          ...body,
          routeModifiers: data.routeModifiers,
        };
      }

      if (data.mode === "WALK" || data.mode === "BICYCLE")
        delete (body as any).routingPreference;

      const response = await axios.post(this._baseUrl, body, {
        params,
        headers,
      });

      return response.data;
    });
  }
}

export const routeService = new RouteService();
