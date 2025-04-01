// Import classes
import { Endpoints } from "src/classes/Endpoints";

const userEndpoints = new Endpoints("user");

// Add your handlers here
userEndpoints.createHandler("").get((req, res) => {
  return "Hello from user root endpoint";
});

export default userEndpoints;
