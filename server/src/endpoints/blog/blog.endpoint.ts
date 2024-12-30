// Import classes
import { Endpoints } from "src/classes/Endpoints";

const blogEndpoints = new Endpoints("blog");

// Add your handlers here
blogEndpoints.createHandler("").get((req, res) => {
  return "Hello from blog root endpoint";
});

export default blogEndpoints;
