import bcrypt from "bcrypt";

// Import classes
import { Endpoints } from "src/classes/Endpoints";

// Import models
import db from "src/databases/dongnaitravel";

// Import helpers
import { buildUserPopulation } from "src/helpers/users/populations";
import { checkUser } from "src/helpers/users/user-checkers";
import { generateOtp } from "src/helpers/other/otp-generator";

// Import services
import { authService } from "src/services/auth";
import { emailService } from "src/services/email";

// Import validators
import {
  UserDataSignInValidator,
  UserDataSignUpValidator,
} from "src/services/validators/user";

// Import utils
import { DatetimeUtils } from "src/utils/datetime";

// Import types
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";

const authEndpoints = new Endpoints("auth");
let DNTModels: DongNaiTravelModelsType;

db().then((models) => {
  DNTModels = models;
});

const salt = 5;

// Add your handlers here
/**
 * Apllow guest creates his/her account
 */
authEndpoints.createHandler("sign-up").post(async (req, res, o) => {
  const data = req.body;

  // Validate data
  const validationResult = UserDataSignUpValidator.validate(data);
  // Check validation result
  if (validationResult.error) {
    o.code = 400;
    throw new Error(validationResult.error.message);
  }

  // Check if user with that email or username exists
  if (await checkUser(DNTModels.Users, validationResult.value)) {
    o.code = 400;
    throw new Error("The account with this username or email is registered");
  }

  // Hashed password
  const hashedPassword = bcrypt.hashSync(data.password, salt);

  // Delete password and confirmPassword
  delete data.password;
  delete data.confirmPassword;

  // Get role
  const role = await DNTModels.UserRoles.findOne({
    value: "user",
  });

  // Insert user to database
  const insertResult = (
    await DNTModels.Users.create({
      ...data,
      roleId: role!._id,
      hashedPassword,
    })
  ).toJSON();

  // Send greeting email to user
  emailService.sendEmail(
    validationResult.value.email,
    "DongNaiTravel: say hello to new Traveller",
    {
      isHTML: true,
      content: `
      <h4>Welcome to DongNaiTravelApp</h4>
      <p>Wish you have a lot of fun while exploring our application!</p>
      <p>Sincerely,<br/> - DongNaiTravelApp Team - </p>
    `,
    }
  );

  return {
    user: { ...validationResult.value, id: insertResult.id, role },
    token: authService.createToken(role.name),
  };
});

/**
 * Allow user verifies his/her account.
 */
authEndpoints.createHandler("sign-in").post(async (req, res, o) => {
  const data = req.body;

  // Validate data
  const validationResult = UserDataSignInValidator.validate(data);
  // Check validation result
  if (validationResult.error) {
    o.code = 400;
    throw new Error(validationResult.error.message);
  }

  // Find user with username
  const query = DNTModels.Users.findOne({
    username: data.username,
  });

  // Build populations
  buildUserPopulation(query);

  const findUserResult = await query.exec();

  if (!findUserResult) {
    o.code = 400;
    throw new Error(`The user \`${data.username}\` is not registered`);
  }

  const user = findUserResult.toJSON();
  let tokenCheck = (await authService.verifyToken(data.token)).code === 0;

  if (data.token && !tokenCheck) {
    o.code = 401;
    throw new Error("Invalid token");
  } else if (data.token && tokenCheck) {
    // Token is valid
    return {
      user: user,
    };
  }

  if (!data.password) {
    o.code = 400;
    throw new Error("Password is required");
  }

  let passwordCheck = bcrypt.compareSync(data.password, user.hashedPassword);
  // Check password
  if (data.password && !passwordCheck) {
    o.code = 400;
    throw new Error("Incorrect password");
  }

  // Delete some fields
  delete user.hashedPassword;
  delete user.roleId;

  return {
    user: user,
    token: authService.createToken(user.role.name),
  };
});

/**
 * Allow user reset his/her password
 */
authEndpoints.createHandler("reset-password").patch(async (req, res, o) => {
  const userData = req.body;

  // Find user with username
  const query = DNTModels.Users.findOne({
    email: userData.email,
  });

  const findUserResult = await query.exec();

  if (!findUserResult) {
    o.code = 400;
    throw new Error(`The user \`${userData.email}\` is not registered`);
  }

  const user = findUserResult.toJSON();
  const hashedPassword = bcrypt.hashSync(userData.password, salt);

  if (hashedPassword === user.hashedPassword) {
    o.code = 400;
    throw new Error(`This is your password!!`);
  }

  // Set new hashed password
  user.hashedPassword = hashedPassword;

  // Update user
  DNTModels.Users.updateOne(
    {
      _id: user._id,
    },
    user
  );

  return "Your passwor is reset!";
});

/**
 * Allow user gets otp to verify his/her account
 */
authEndpoints.createHandler("otp/:email").get(async (req, res, o) => {
  const userData = req.params;

  // Check if user with that email exists
  if (!(await checkUser(DNTModels.Users, userData))) {
    o.code = 400;
    throw new Error("The account with this email isn't registered");
  }

  // Create OTP code
  const otpCode = generateOtp();
  const expireAt = DatetimeUtils.getTime("2m");

  // Save OTP code
  await DNTModels.Otps.create({
    userEmail: userData.email,
    value: otpCode,
    expireAt,
  });

  // Send OTP code to email
  emailService.sendEmail(
    userData.email,
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
});

/**
 * Allow user verifies his/her otp
 */
authEndpoints.createHandler("otp/:email").post(async (req, res, o) => {
  const userData = req.params;
  const optCode = req.body.otpCode;

  // Check if user with that email exists
  if (!(await checkUser(DNTModels.Users, userData))) {
    o.code = 400;
    throw new Error("The account with this email isn't registered");
  }

  // Get OTP code from database
  const findOtpResult = await DNTModels.Otps.findOne({
    $or: [{ value: optCode }, { userEmail: userData.email }],
  });

  // Check if otp is found or not
  if (!findOtpResult) {
    o.code = 404;
    throw new Error("Otp not found");
  }

  // Compare
  if (findOtpResult.expireAt <= Date.now()) {
    o.code = 400;
    throw new Error("This OTP code is expired");
  }

  return "Your OTP is valid!";
});

export default authEndpoints;
