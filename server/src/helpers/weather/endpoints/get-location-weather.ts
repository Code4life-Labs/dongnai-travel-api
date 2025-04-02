import axios from "axios";
import AppConfig from "src/app.config.json";

// Import types
import type { Request, Response } from "express";
import type { HTTPResponseDataType } from "src/utils/http";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import { WeatherResponse, ForecastItem, WeatherForecast } from "src/types/weather";

export default async function getLocationWeather(
  models: DongNaiTravelModelsType,
  req: Request,
  res: Response,
  result: HTTPResponseDataType
): Promise<WeatherResponse> {
  try {
    // Lấy tọa độ từ query parameters
    const { lat, lon } = req.query;
    
    // Kiểm tra xem có đủ thông tin tọa độ không
    if (!lat || !lon) {
      return {
        error: {
          title: "Missing Parameters",
          content: "Latitude (lat) and longitude (lon) are required"
        }
      };
    }

    const { apiKey, baseURL, settings } = AppConfig.apis.openWeather;
    
    const response = await axios.get(`${baseURL}/data/2.5/forecast`, {
      params: {
        lat,
        lon,
        appid: apiKey,
        units: settings.units,
        lang: settings.language || req.query.lang || "en",
        cnt: settings.cnt
      }
    });

    // Tạo một đối tượng mới để tránh circular references
    const weatherData: WeatherForecast = {
      city: {
        id: response.data.city.id,
        name: response.data.city.name,
        coord: {
          lat: response.data.city.coord.lat,
          lon: response.data.city.coord.lon
        },
        country: response.data.city.country,
        timezone: response.data.city.timezone
      },
      list: response.data.list.map((item: any): ForecastItem => ({
        dt: item.dt,
        main: {
          temp: item.main.temp,
          feels_like: item.main.feels_like,
          temp_min: item.main.temp_min,
          temp_max: item.main.temp_max,
          pressure: item.main.pressure,
          humidity: item.main.humidity
        },
        weather: item.weather.map((w: any) => ({
          id: w.id,
          main: w.main,
          description: w.description,
          icon: w.icon
        })),
        clouds: {
          all: item.clouds.all
        },
        wind: {
          speed: item.wind.speed,
          deg: item.wind.deg
        },
        dt_txt: item.dt_txt
      }))
    };

    // Tạo một đối tượng kết quả mới
    return {
      data: weatherData
    };
  } catch (error) {
    console.error("Get Location Weather Error:", error);
    
    // Provide more detailed error information
    const errorResponse: WeatherResponse = {
      error: {
        title: "Internal Server Error",
        content: "Failed to fetch weather data"
      }
    };
    
    // If it's an axios error, add more details
    if (axios.isAxiosError(error) && errorResponse.error) {
      errorResponse.error.details = {
        status: error.response?.status,
        message: error.response?.data?.message || error.message
      };
    }
    
    return errorResponse;
  }
}