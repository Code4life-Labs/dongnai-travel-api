// Import helpers
import { checkFollow } from "../follow-checkers";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function deleteFollow(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  const validData = checkFollow(
    { source: req.params.id, target: req.params.userId },
    o!
  );

  // Check if has follow
  if (
    !(await MC.Follows.findOne({
      $or: [{ source: validData.source }, { target: validData.target }],
    }).exec())
  ) {
    o!.code = 400;
    throw new Error("You don't followed this user before");
  }

  // Delete existed follow
  const result = await MC.Follows.deleteOne({
    $or: [{ source: validData.source }, { target: validData.target }],
  });

  if (!result) {
    o!.code = 500;
    throw new Error("Cannot unfollow this user");
  }

  o!.code = 201;

  return "You have just unfollowed this user";
}
