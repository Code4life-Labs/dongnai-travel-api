// Import classes
import { Endpoints } from "src/classes/Endpoints";

const _rootEndpoints = new Endpoints("");

// Add handler
_rootEndpoints.createHandler("/").get((req, res) => {
  return "Welcome to `NodeTS auto-built template`";
});

export default _rootEndpoints;
