// Import classes
import { Endpoints } from "src/classes/Endpoints";

const blogsEndpoints = new Endpoints("blogs");

// Add your handlers here
blogsEndpoints.createHandler("").get((req, res) => {
  return "Hello from blogs root endpoint";
});

export default blogsEndpoints;
