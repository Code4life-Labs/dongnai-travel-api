import Joi from "joi";

export const FollowValidator = Joi.object({
  source: Joi.string().required().messages({
    "string.empty": `"source" cannot be empty (it's user's id)`,
    "string.base": `"source" should be a type of 'text'`,
  }),
  target: Joi.string().required().messages({
    "string.empty": `"target" cannot be empty (it's user's id)`,
    "string.base": `"target" should be a type of 'text'`,
  }),
});
