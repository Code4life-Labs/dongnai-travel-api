// Import helpers
import { checkUser } from "src/helpers/users/user-checkers";
import { checkUserDataWhenUseEmail } from "../data-checkers";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function postOTP(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  const validData = checkUserDataWhenUseEmail(req.params, o!);
  const optCode = req.body.otpCode;

  // Check if user with that email exists
  if (!(await checkUser(MC.Users, validData))) {
    o!.code = 400;
    throw new Error("The account with this email isn't registered");
  }

  // Get OTP code from database
  const findOtpResult = await MC.Otps.findOne({
    $or: [{ value: optCode }, { userEmail: validData.email }],
  });

  // Check if otp is found or not
  if (!findOtpResult) {
    o!.code = 404;
    throw new Error("Otp not found");
  }

  // Compare
  if (findOtpResult.expireAt <= Date.now()) {
    o!.code = 400;
    throw new Error("This OTP code is expired");
  }

  return "Your OTP is valid!";
}
