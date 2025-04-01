// Import helpers
import { checkUser } from "src/helpers/users/user-checkers";
import { generateOtp } from "src/helpers/other/otp-generator";
import { checkUserDataWhenUseEmail } from "../data-checkers";

// Import services
import { emailService } from "src/services/email";

// Import utils
import { DatetimeUtils } from "src/utils/datetime";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function getOTP(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  const validData = checkUserDataWhenUseEmail(req.params, o!);

  // Check if user with that email exists
  if (!(await checkUser(MC.Users, validData))) {
    o!.code = 400;
    throw new Error("The account with this email isn't registered");
  }

  // Create OTP code
  const otpCode = generateOtp();
  const expireAt = DatetimeUtils.getTime("2m");

  // Save OTP code
  await MC.Otps.create({
    userEmail: validData.email,
    value: otpCode,
    expireAt,
  });

  // Send OTP code to email
  emailService.sendEmail(
    validData.email,
    "DongNaiTravel: confirm your registration",
    {
      isHTML: true,
      content: `
      <h3>Start your journey with DongNaiTravel</h3>
      <p>Confirm your registration by using the activation code below.</p>
      <strong>Activation code:</strong>
      <h3>${otpCode}</h3>
      <p>Don't share it with anyone. This OTP will be valid for <strong>2 minutes</strong></p>
      <p>Sincerely, DongNaiTravelApp Team</p>
    `,
    }
  );

  return "OTP is sent to your email!";
}
