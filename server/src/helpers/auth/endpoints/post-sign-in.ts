import bcrypt from "bcrypt";

// Import helpers
import { buildUserPopulation } from "src/helpers/users/populations";

// Import services
import { authService } from "src/services/auth";

// Import helpers
import { checkUserDataWhenSignIn } from "../data-checkers";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function signin(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  const validData = checkUserDataWhenSignIn(req.body, o!);

  // Find user with username
  const query = MC.Users.findOne({
    username: validData.username,
  });

  // Build populations
  buildUserPopulation(query);

  const findUserResult = await query.exec();

  if (!findUserResult) {
    o!.code = 400;
    throw new Error(`The user \`${validData.username}\` is not registered`);
  }

  const user = findUserResult.toJSON();
  let tokenCheck = (await authService.verifyToken(validData.token)).code === 0;

  if (validData.token && !tokenCheck) {
    o!.code = 401;
    throw new Error("Invalid token");
  } else if (validData.token && tokenCheck) {
    // Token is valid
    return {
      user: user,
    };
  }

  if (!validData.password) {
    o!.code = 400;
    throw new Error("Password is required");
  }

  let passwordCheck = bcrypt.compareSync(
    validData.password,
    user.hashedPassword
  );
  // Check password
  if (validData.password && !passwordCheck) {
    o!.code = 400;
    throw new Error("Incorrect password");
  }

  // Delete some fields
  delete user.hashedPassword;
  delete user.roleId;

  return {
    user: user,
    token: authService.createToken(user.role.name),
  };
}
