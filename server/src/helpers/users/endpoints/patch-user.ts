import bcrypt from "bcrypt";

// Import helpers
import {
  checkUserById,
  checkUserByUsername,
  checkUserDataWhenUpdate,
} from "../user-checkers";

// Import utils
import { PASSWORD_SALT } from "src/utils/constants";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function patchUser(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  // Check if request data is valid
  const validData = checkUserDataWhenUpdate(req.body, o!);

  // Check if user exists
  if (!(await checkUserById(MC.Users, req.params.id))) {
    o!.code = 400;
    throw new Error("This user isn't found");
  }

  if (validData.username) {
    if (await checkUserByUsername(MC.Users, validData.username)) {
      o!.code = 400;
      throw new Error('This "username" is registered by another user');
    }
  }

  // Hashed new password
  const hashedPassword = bcrypt.hashSync(validData.password, PASSWORD_SALT);

  // Repare data
  delete validData.password;
  validData.hashedPassword = hashedPassword;
  validData.updatedAt = Date.now();
  const updateResult = await MC.Users.updateOne(
    { _id: req.params.id },
    validData
  ).exec();

  if (updateResult.modifiedCount === 0) {
    o!.code = 400;
    throw new Error("Cannot update this user's information");
  }

  return "Update user successfully";
}
