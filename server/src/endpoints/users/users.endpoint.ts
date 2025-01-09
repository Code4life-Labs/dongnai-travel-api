// Import classes
import { Endpoints } from "src/classes/Endpoints";

// Import models
import db from "src/databases/dongnaitravel";

// Import helpers
import { buildUserPopulation } from "src/helpers/users/populations";

const usersEndpoints = new Endpoints("users");
let DNTModes: DongNaiTravelModelsType;

// Import types
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";

db().then((models) => {
  DNTModes = models;
});

// Add your handlers here
/**
 * Get users
 */
usersEndpoints.createHandler("").get((req, res) => {
  return "Hello from users root endpoint";
});

/**
 * Get user by id
 */
usersEndpoints.createHandler("/:id").get(async (req, res, o) => {
  if (req.params.id) {
    o.code = 400;
    throw new Error("Id of user is required");
  }

  // Get user from database
  let query = DNTModes.Users.findOne({ _id: req.params.id });

  // Build populations
  buildUserPopulation(query);

  const user = await query.exec();

  // Compute user's state

  return user;
});

export default usersEndpoints;
