import Joi from "joi";

// Import utils
import {
  FIRSTNAME_CHARACTER_LIMITS,
  LASTNAME_CHARACTER_LIMITS,
  USERNAME_CHARACTER_LIMITS,
  PASSWORD_CHARACTER_LIMITS,
} from "src/utils/constants";

const _BaseStringValidator = Joi.string().messages({
  "string.empty": `"data string" cannot be empty`,
  "string.base": `"data string" should be a type of 'text'`,
});

const _BaseUserFirstNameValidator = Joi.string()
  .min(FIRSTNAME_CHARACTER_LIMITS[0])
  .max(FIRSTNAME_CHARACTER_LIMITS[1])
  .pattern(new RegExp("^[a-zA-Z\\s]+$"))
  .messages({
    "string.empty": `"firstName" cannot be empty`,
    "string.base": `"firstName" should be a type of 'text'`,
    "string.min": `"firstName" should have a minimum length of {#limit}`,
    "string.max": `"firstName" should have a maximum length of {#limit}`,
  });

const _BaseUserLastNameValidator = Joi.string()
  .min(LASTNAME_CHARACTER_LIMITS[0])
  .max(LASTNAME_CHARACTER_LIMITS[1])
  .pattern(new RegExp("^[a-zA-Z\\s]+$"))
  .messages({
    "string.empty": `"lastName" cannot be empty`,
    "string.base": `"lastName" should be a type of 'text'`,
    "string.min": `"lastName" should have a minimum length of {#limit}`,
    "string.max": `"lastName" should have a maximum length of {#limit}`,
  });

const _BaseUserDisplayNameValidator = Joi.string()
  .min(LASTNAME_CHARACTER_LIMITS[0])
  .max(LASTNAME_CHARACTER_LIMITS[1] + FIRSTNAME_CHARACTER_LIMITS[1])
  .pattern(new RegExp("^[a-zA-Z\\s]+$"))
  .messages({
    "string.empty": `"displayName" cannot be empty`,
    "string.base": `"displayName" should be a type of 'text'`,
    "string.min": `"displayName" should have a minimum length of {#limit}`,
    "string.max": `"displayName" should have a maximum length of {#limit}`,
  });

const _BaseUserNameValidator = Joi.string()
  .min(USERNAME_CHARACTER_LIMITS[0])
  .max(USERNAME_CHARACTER_LIMITS[1])
  .pattern(new RegExp("^[a-zA-Z0-9]+$"))
  .messages({
    "string.empty": `"username" cannot be empty`,
    "string.base": `"username" should be a type of 'text'`,
    "string.min": `"username" should have a minimum length of {#limit}`,
    "string.max": `"username" should have a maximum length of {#limit}`,
  });

const _BaseUserEmailValidator = Joi.string()
  .email({ tlds: { allow: false } })
  .max(255)
  .messages({
    "string.empty": `"email" cannot be empty`,
    "string.base": `"email" should be a type of 'text'`,
    "string.max": `"email" should have a maximum length of {#limit}`,
  });

const _BaseUserPasswordValidator = Joi.string()
  .min(PASSWORD_CHARACTER_LIMITS[0])
  .max(PASSWORD_CHARACTER_LIMITS[1])
  .pattern(new RegExp("^[a-zA-Z0-9@_]+$"))
  .messages({
    "string.empty": `"password" cannot be empty`,
    "string.base": `"password" should be a type of 'text'`,
    "string.min": `"password" should have a minimum length of {#limit}`,
    "string.max": `"password" should have a maximum length of {#limit}`,
  });

const _BaseUserBirthDayValidator = Joi.number().messages({
  "number.empty": `"birthday" cannot be empty`,
  "number.base": `"birthday" should be a type of 'number'`,
});

export const UserDataSignUpValidator = Joi.object({
  firstName: _BaseUserFirstNameValidator.required(),
  lastName: _BaseUserLastNameValidator.required(),
  username: _BaseUserNameValidator.required(),
  email: _BaseUserEmailValidator.required(),
  confirmedPassword: Joi.ref("password"),
  password: _BaseUserPasswordValidator.required(),
  birthday: _BaseUserBirthDayValidator.required(),
}).with("password", "confirmedPassword");

export const UserDataSignInValidator = Joi.object({
  username: _BaseUserNameValidator.required(),
  token: Joi.string(),
  password: _BaseUserPasswordValidator,
});

export const UserResetPasswordValidator = Joi.object({
  username: _BaseUserNameValidator.required(),
});

export const UserDataUpdateValidator = Joi.object({
  firstName: _BaseUserFirstNameValidator,
  lastName: _BaseUserLastNameValidator,
  username: _BaseUserNameValidator,
  email: _BaseUserEmailValidator,
  displayName: _BaseUserDisplayNameValidator,
  birthday: _BaseUserBirthDayValidator,
  deletedAvatar: _BaseStringValidator,
  deletedCoverPhoto: _BaseStringValidator,
});
