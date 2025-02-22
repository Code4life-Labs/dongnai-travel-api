import Joi from "joi";

// Import utils
import { BLOG_NAME_LIMITS } from "src/utils/constants";

const _BaseBlogNameValidator = Joi.string()
  .min(BLOG_NAME_LIMITS[0])
  .max(BLOG_NAME_LIMITS[1])
  .messages({
    "string.empty": `"name" cannot be empty`,
    "string.base": `"name" should be a type of 'text'`,
    "string.min": `"name" should have a minimum length of {#limit}`,
    "string.max": `"name" should have a maximum length of {#limit}`,
  });

const _BaseTypeIdValidator = Joi.string().messages({
  "string.empty": `"typeId" cannot be empty`,
  "string.base": `"typeId" should be a type of 'text'`,
});

const _BaseBlogContentValidator = Joi.string().messages({
  "string.empty": `"typeId" cannot be empty`,
  "string.base": `"typeId" should be a type of 'text'`,
});

const _BaseMentiondPlacesValidator = Joi.array()
  .items(
    Joi.string().messages({
      "string.empty": `"element of mentioned places" cannot be empty`,
      "string.base": `"element of mentioned places" should be a type of 'text'`,
    })
  )
  .messages({
    "array.empty": `"Mentioned places" cannot be empty`,
    "array.base": `"Mentioned places" should be a type of 'array'`,
  });

const _BaseAuthorIdValidator = Joi.string().messages({
  "string.empty": `"authorId" cannot be empty`,
  "string.base": `"authorId" should be a type of 'text'`,
});

export const BlogCreateValidator = Joi.object({
  name: _BaseBlogNameValidator.required(),
  typeId: _BaseTypeIdValidator.required(),
  content: _BaseBlogContentValidator.required(),
  mentionedPlaces: _BaseMentiondPlacesValidator.required(),
  authorId: _BaseAuthorIdValidator.required(),
});

export const BlogUpdateValidator = Joi.object({
  name: _BaseBlogNameValidator,
  typeId: _BaseTypeIdValidator,
  content: _BaseBlogContentValidator,
  mentionedPlaces: _BaseMentiondPlacesValidator,
});
