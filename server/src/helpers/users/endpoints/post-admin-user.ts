import bcrypt from "bcrypt";

// Import helpers
import { buildUserProjection } from "src/helpers/users/projections";
import { checkUser } from "src/helpers/users/user-checkers";
import { generateOtp } from "src/helpers/other/otp-generator";

// Import services
import { authService } from "src/services/auth";

// Import helpers
import { checkUserDataWhenSignUp } from "src/helpers/auth/data-checkers";

// Import utils
import { PASSWORD_SALT } from "src/utils/constants";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function createAdminUser(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  const validData = checkUserDataWhenSignUp(req.body, o!);

  // Check if user with that email or username exists
  if (await checkUser(MC.Users, validData)) {
    o!.code = 400;
    throw new Error("The account with this username or email is registered");
  }

  // Hashed password
  const hashedPassword = bcrypt.hashSync(validData.password, PASSWORD_SALT);

  // Delete password and confirmPassword
  delete validData.password;
  delete validData.confirmPassword;

  // Get role
  const role = await MC.UserRoles.findOne({
    value: "admin",
  });

  // Insert user to database
  const insertResult = (
    await MC.Users.create({
      ...validData,
      roleId: role!._id,
      hashedPassword,
    })
  ).toJSON();

  return {
    user: { ...validData.value, id: insertResult._id, role },
    token: authService.createToken(insertResult._id, role.name),
  };
}
