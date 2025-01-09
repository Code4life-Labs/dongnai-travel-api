// Import classes
import { Endpoints } from "src/classes/Endpoints";

const weatherEndpoints = new Endpoints("weather");

// Add your handlers here
/**
 * Allow user get information of weather
 */
weatherEndpoints.createHandler("").get((req, res) => {
  return "Hello from weather root endpoint";
});

export default weatherEndpoints;
