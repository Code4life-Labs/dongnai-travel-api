// Import validators
import {
  UserDataSignUpValidator,
  UserDataSignInValidator,
  UserResetPasswordValidator,
} from "src/services/validators/user";

export function checkUserDataWhenSignUp(data: any, o: any) {
  // Validate data
  const validationResult = UserDataSignUpValidator.validate(data);
  // Check validation result
  if (validationResult.error) {
    o!.code = 400;
    throw new Error(validationResult.error.message);
  }

  return validationResult.value;
}

export function checkUserDataWhenSignIn(data: any, o: any) {
  // Validate data
  const validationResult = UserDataSignInValidator.validate(data);
  // Check validation result
  if (validationResult.error) {
    o!.code = 400;
    throw new Error(validationResult.error.message);
  }

  if (!validationResult.value.token && !validationResult.value.password) {
    o!.code = 400;
    throw new Error("Password or token is datauired");
  }

  return validationResult.value;
}

export function checkUserDataWhenUseEmail(data: any, o: any) {
  // Validate data
  const validationResult = UserResetPasswordValidator.validate(data);
  // Check validation result
  if (validationResult.error) {
    o!.code = 400;
    throw new Error(validationResult.error.message);
  }

  return validationResult.value;
}
