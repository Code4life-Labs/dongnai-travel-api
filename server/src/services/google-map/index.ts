import axios from "axios";

// Import utils
import { ErrorUtils } from "src/utils/error";
import { ConfigUtils } from "src/utils/config";

export class GoogleMapService {
  nearByRadius!: string;
  maxPhotoWidth!: string;

  private _baseUrl!: string;
  private _apiKey!: string;
  private _defaultLanguage!: string;

  constructor() {
    const googleMapConfig = ConfigUtils.getApiConfig("googleMap");
    
    this.nearByRadius = googleMapConfig.settings.nearByRadius;
    this.maxPhotoWidth = googleMapConfig.settings.maxPhotoWidth;

    this._baseUrl = googleMapConfig.baseURL;
    this._apiKey = googleMapConfig.apiKey;
    this._defaultLanguage = googleMapConfig.settings.language;
  }

  static StandardDirectionFields = [
    "origin",
    "destination",
    "alternatives",
    "arrival_time",
    "avoid",
    "departure_time",
    "language",
    "mode",
    "region",
    "traffic_model",
    "transit_mode",
    "transit_routing_preference",
    "units",
    "waypoints",
    "key",
  ];

  static StandardPlaceFields = [
    "query",
    "radius",
    "rankby",
    "language",
    "location",
    "maxprice",
    "minprice",
    "opennow",
    "pagetoken",
    "region",
    "type",
    "key",
  ];

  static StandardPlacePhotoFields = [
    "photo_reference",
    "maxheight",
    "maxwidth",
    "key",
  ];

  /**
   * Use to get id of place by its coordinate
   * @param coor
   * @returns
   */
  async requestPlaceIdFromCoor(coor: any) {
    return ErrorUtils.handleInterchangeError(this, async function () {
      if (!coor)
        throw new Error(
          "Error: GoogleMapService - Coordinate of place is required"
        );

      if (coor && (!coor.latitude || !coor.longitude))
        throw new Error(
          "Error: GoogleMapService - latitude and longitude of place are required"
        );

      const params = {
        latlng: `${coor.latitude},${coor.longitude}`,
        key: this._apiKey,
      };

      const response = await axios.get(`${this._baseUrl}/geocode/json`, {
        params,
      });

      return response.data;
    });
  }

  /**
   * Use to get id of place by its address
   * @param coor
   * @returns
   */
  async requestPlaceIdFromAddress(address: string) {
    return ErrorUtils.handleInterchangeError(this, async function () {
      if (!address)
        throw new Error(
          "Error: GoogleMapService - Address of place is required"
        );

      const params = {
        address: address,
        key: this._apiKey,
      };

      const response = await axios.get(`${this._baseUrl}/geocode/json`, {
        params,
      });

      return response.data;
    });
  }

  /**
   * Use to get direction
   * @param params
   * @returns
   */
  async requestRouteDirection(params: any) {
    const url = `${this._baseUrl}/directions/json`;

    return ErrorUtils.handleInterchangeError(this, async function () {
      GoogleMapService.StandardDirectionFields.map((field) => {
        // Phuong: url mẫu:
        // https://maps.googleapis.com/maps/api/directions/json
        // ?avoid=highways
        // &destination=Montreal
        // &mode=bicycling
        // &origin=Toronto
        // &key=YOUR_API_KEY

        if (!params[field] && field === "language")
          params.language = this._defaultLanguage;

        if (!params[field] && field === "alternatives")
          params.alternatives = "true";

        params.key = this._apiKey;

        // Old code
        // if (!params[field] && field === "language")
        //   url = url + field + "=" + env.LANGUAGE_CODE_DEFAULT + "&";
        // // Phuong: chỉ nhiều hơn 1 đường đi
        // if (!params[field] && field === "alternatives")
        //   url = url + field + "=true&";
        // // Phuong: Giải quyết TH nếu key
        // else if (!params[field] && field === "key")
        //   url = url + field + "=" + env.MAP_API_KEY;
        // else if (params[field]) url = url + field + "=" + params[field];

        // // Phuong: Cuối cùng phải thêm dấu &
        // if (field !== "key" && params[field]) url = url + "&";
      });

      const request = await axios.get(url, { params });

      return request.data;
    });
  }

  /**
   * Use to get places
   * @param params
   * @returns
   */
  async requestPlaces(params: any) {
    const url = `${this._baseUrl}/place/textsearch/json`;

    return ErrorUtils.handleInterchangeError(this, async function () {
      // Code cũ
      // if (field === "query") {
      //   url = url + field + "=" + encodeUrl(params[field]);
      // } else if (field === "location") {
      //   url =
      //     url +
      //     field +
      //     "=" +
      //     params[field].latitude +
      //     "%2C" +
      //     params[field].longitude;
      // }
      // // Phuong: Giải quyết TH nếu language là rổng thì sẽ cho mặc định là tiếng việt
      // else if (!params[field] && field === "language")
      //   url = url + field + "=" + env.LANGUAGE_CODE_DEFAULT + "&";
      // // Phuong: Giải quyết TH nếu key
      // else if (!params[field] && field === "key")
      //   url = url + field + "=" + env.MAP_API_KEY;
      // else if (params[field]) url = url + field + "=" + params[field];
      // // Phuong: Cuối cùng phải thêm dấu &
      // if (field !== "key" && params[field]) url = url + "&";

      GoogleMapService.StandardPlaceFields.map((field) => {
        if (!params[field] && field === "language")
          params.language = this._defaultLanguage;

        if (!params[field] && field === "fields")
          params.fields = params.fields.join(",");

        if (!params[field] && field === "rankby")
          params.rankby = this.nearByRadius;

        // Transform
        if (field === "location") {
          params.location = `${params.location.latitude},${params.location.longitude}`;
        }
      });

      params.key = this._apiKey;

      const request = await axios.get(url, { params });

      return request.data;
    });
  }

  /**
   * Use to get photos of place
   * @param params
   * @returns
   */
  async requestPlacePhotos(params: any) {
    const url = `${this._baseUrl}/place/photo`;

    return ErrorUtils.handleInterchangeError(this, async function () {
      // Code cũ
      // if (!params[field] && field === "maxwidth") {
      //   if (!params["maxheight"])
      //     url = url + field + "=" + env.WIDTH_PHOTO_DEFAULT + "&";
      // }
      // // Phuong: Giải quyết TH nếu key
      // else if (!params[field] && field === "key")
      //   url = url + field + "=" + env.MAP_API_KEY;
      // // Phuong: Các TH khác
      // else if (params[field]) url = url + field + "=" + params[field];

      // // Phuong: Cuối cùng phải thêm dấu &
      // if (field !== "key" && params[field]) url = url + "&";

      GoogleMapService.StandardPlacePhotoFields.map((field) => {
        if (!params[field] && field === "maxwidth") {
          if (!params["maxheight"]) params.maxwidth = this.maxPhotoWidth;
        }
      });

      const request = await axios.get(url, { params });

      return request.data;
    });
  }
}

export const googleMapService = new GoogleMapService();
