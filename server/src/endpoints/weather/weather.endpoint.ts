// Import classes
import { Endpoints } from "src/classes/Endpoints";

// Import database
import db from "src/databases/dongnaitravel";

// Import helpers
import getDongNaiWeather from "src/helpers/weather/endpoints/get-dongnai-weather";
import getLocationWeather from "src/helpers/weather/endpoints/get-location-weather";

// Import services
import { AuthMiddlewares } from "src/services/auth/middlewares";

// Import types
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";

const weatherEndpoints = new Endpoints("weather");
let DNTModels: DongNaiTravelModelsType;

db().then((models) => {
  DNTModels = models;
});

// Add your handlers here
/**
 * Get Dong Nai weather
 */
weatherEndpoints
  .createHandler("/dongnai")
  .use(AuthMiddlewares.allowGuest)
  .use(AuthMiddlewares.checkToken)
  .get(
    async (req, res, o) => {
      try {
        return await getDongNaiWeather(DNTModels, req, res, o);
      } catch (error) {
        console.error("Get DongNai weather error: ", error);
        return {
          data: null,
          error: {
            title: "Weather Service Error",
            content: "An unexpected error occurred while fetching weather data.",
          },
        };
      }
    },
    function (error) {
      console.error("Get DongNai weather error: ", error);
    }
  );

/**
 * Get weather by location
 */
weatherEndpoints
  .createHandler("/location")
  .use(AuthMiddlewares.allowGuest)
  .use(AuthMiddlewares.checkToken)
  .get(
    async (req, res, o) => {
      try {
        return await getLocationWeather(DNTModels, req, res, o);
      } catch (error) {
        console.error("Get location weather error: ", error);
        return {
          data: null,
          error: {
            title: "Weather Service Error",
            content: "An unexpected error occurred while fetching weather data.",
          },
        };
      }
    },
    function (error) {
      console.error("Get location weather error: ", error);
    }
  );

export default weatherEndpoints;
