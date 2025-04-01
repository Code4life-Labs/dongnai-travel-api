import bcrypt from "bcrypt";

// Import helpers
import { checkUserDataWhenUseEmail } from "../data-checkers";

// Import utils
import { PASSWORD_SALT } from "src/utils/constants";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function resetPassword(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  const validData = checkUserDataWhenUseEmail(req.body, o!);

  // Find user with username
  const query = MC.Users.findOne({
    email: validData.email,
  });

  const findUserResult = await query.exec();

  if (!findUserResult) {
    o!.code = 400;
    throw new Error(`The user \`${validData.email}\` is not registered`);
  }

  const user = findUserResult.toJSON();
  const hashedPassword = bcrypt.hashSync(validData.password, PASSWORD_SALT);

  if (hashedPassword === user.hashedPassword) {
    o!.code = 400;
    throw new Error(`This is your password!!`);
  }

  // Set new hashed password
  user.hashedPassword = hashedPassword;

  // Update user
  MC.Users.updateOne(
    {
      _id: user._id,
    },
    user
  );

  return "Your password is reset!";
}
