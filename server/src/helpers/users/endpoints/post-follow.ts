// Import helpers
import { checkFollowWhenCreateInRequest } from "../follow-checkers";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function postFollow(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  const validData = checkFollowWhenCreateInRequest(req, o!);

  // Check if has follow
  if (
    await MC.Follows.findOne({
      $or: [{ source: validData.source }, { target: validData.target }],
    }).exec()
  ) {
    o!.code = 400;
    throw new Error("You followed this user before");
  }

  // Add new follow
  const result = await MC.Follows.create(validData);

  if (!result) {
    o!.code = 500;
    throw new Error("Cannot follow this user");
  }

  o!.code = 201;

  return "You have just followed this user";
}
