// Import classes
import { Endpoints } from "src/classes/Endpoints";

const usersEndpoints = new Endpoints("users");

// Add your handlers here
usersEndpoints.createHandler("").get((req, res) => {
  return "Hello from users root endpoint";
});

export default usersEndpoints;
