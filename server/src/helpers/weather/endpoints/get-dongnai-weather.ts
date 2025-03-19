import axios from "axios";
import AppConfig from "src/app.config.json";

// Import types
import type { Request, Response } from "express";
import type { HTTPResponseDataType } from "src/utils/http";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";

const DONGNAI_LAT = 10.9377;
const DONGNAI_LON = 106.8230;

export default async function getDongNaiWeather(
  models: DongNaiTravelModelsType,
  req: Request,
  res: Response,
  result: HTTPResponseDataType
) {
  try {
    const { apiKey, baseURL, settings } = AppConfig.apis.openWeather;
    
    const response = await axios.get(`${baseURL}/data/2.5/forecast`, {
      params: {
        lat: DONGNAI_LAT,
        lon: DONGNAI_LON,
        appid: apiKey,
        units: settings.units,
        lang: settings.language || req.query.lang || "en",
        cnt: settings.cnt
      }
    });

    // Tạo một đối tượng mới để tránh circular references
    const weatherData = {
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
      list: response.data.list.map((item: any) => ({
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

    // Tạo một đối tượng kết quả mới thay vì sử dụng result trực tiếp
    const safeResult = {
      data: weatherData
    };

    return safeResult;
  } catch (error) {
    console.error("Get Dong Nai Weather Error:", error);
    
    // Tạo một đối tượng lỗi mới
    return {
      error: {
        title: "Internal Server Error",
        content: "Failed to fetch weather data"
      }
    };
  }
}