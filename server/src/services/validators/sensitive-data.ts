import Joi from "joi";

function createObjectIdValidator(name: string) {
  return Joi.string()
    .required()
    .messages({
      "string.empty": `"${name}" cannot be empty`,
      "string.base": `"${name}" should be a type of 'text'`,
    });
}

export const UserIdValidator = createObjectIdValidator("userId");
export const PlaceIdValidator = createObjectIdValidator("placeId");
export const BlogIdValidator = createObjectIdValidator("blogId");
