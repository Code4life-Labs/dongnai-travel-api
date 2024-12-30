// Import classes
import { Endpoints } from "src/classes/Endpoints";

const placesEndpoints = new Endpoints("places");

// Add your handlers here
placesEndpoints.createHandler("").get((req, res) => {
  return "Hello from places root endpoint";
});

export default placesEndpoints;
