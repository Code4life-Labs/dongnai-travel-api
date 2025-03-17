import bcrypt from "bcrypt";

// Import helpers
import { buildUserProjection } from "src/helpers/users/projections";

// Import services
import { authService, AuthService } from "src/services/auth";

// Import helpers
import { checkUserDataWhenSignIn } from "../data-checkers";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function signinAsAdmin(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  const validData = checkUserDataWhenSignIn(req.body, o!);

  // Find user with username
  const query = MC.Users.findOne({
    $or: [{ username: validData.username }, { email: validData.email }],
  });

  // Build populations
  buildUserProjection(query);

  const findUserResult = await query.exec();

  if (!findUserResult) {
    o!.code = 400;
    throw new Error(
      `The user \`${validData.username || validData.email}\` is not registered`
    );
  }

  const user = findUserResult.toJSON();
  const tokenCheck = await authService.verifyToken(validData.token);
  const tokenPayload = tokenCheck.data as any;

  // Check if this user is admin or not?
  if (tokenPayload.role !== AuthService.roles["Admin"]) {
    o!.code = 403;
    throw new Error("You don't have permission to login as admin");
  }

  if (validData.token && tokenCheck.code) {
    o!.code = 401;
    throw new Error("Invalid token");
  } else if (validData.token && !tokenCheck.code) {
    // Delete some fields
    delete user.hashedPassword;

    // Token is valid
    return {
      user: user,
      token: validData.token,
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

  return {
    user: user,
    token: authService.createToken(user._id, user.role.name),
  };
}
