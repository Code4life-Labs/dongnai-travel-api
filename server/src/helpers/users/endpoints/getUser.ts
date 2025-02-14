// Import helpers
import { buildUserPopulation } from "src/helpers/users/populations";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function getUser(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  if (!req.params.id) {
    o!.code = 400;
    throw new Error("Id of user is required");
  }

  // Get user from database
  let query = MC.Users.findOne({ _id: req.params.id });

  // Build populations
  buildUserPopulation(query);

  const user = await query.exec();

  return user;
}
