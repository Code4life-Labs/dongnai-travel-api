// Import classes
import { Endpoints } from "src/classes/Endpoints";

const placeEndpoints = new Endpoints("place");

// Add your handlers here
placeEndpoints.createHandler("").get((req, res) => {
  return "Hello from place root endpoint";
});

export default placeEndpoints;
