import Joi from "joi";

// Import constants
import {
  BANNER_BRANDNAME_LIMITS,
  BANNER_TITLE_LIMITS,
} from "src/utils/constants";

const _BaseTitleValidator = Joi.string()
  .min(BANNER_TITLE_LIMITS[0])
  .max(BANNER_TITLE_LIMITS[1])
  .messages({
    "string.empty": `"title" cannot be empty`,
    "string.base": `"title" should be a type of 'text'`,
    "string.min": `"title" should have a minimum length of {#limit}`,
    "string.max": `"title" should have a maximum length of {#limit}`,
  });

const _BaseImageUrlValidator = Joi.string().uri().messages({
  "string.empty": `"imageUrl" cannot be empty`,
  "string.base": `"imageUrl" should be a type of 'text'`,
  "string.uri": `"imageUrl" should be a valid URI`,
});

const _BaseTargetUrlValidator = Joi.string().uri().messages({
  "string.empty": `"targetUrl" cannot be empty`,
  "string.base": `"targetUrl" should be a type of 'text'`,
  "string.uri": `"targetUrl" should be a valid URI`,
});

const _BaseBrandValidator = Joi.object({
  name: Joi.string()
    .min(BANNER_BRANDNAME_LIMITS[0])
    .max(BANNER_BRANDNAME_LIMITS[1])
    .required()
    .messages({
      "string.empty": `"brand.name" cannot be empty`,
      "string.base": `"brand.name" should be a type of 'text'`,
      "string.min": `"brand.name" should have a minimum length of {#limit}`,
      "string.max": `"brand.name" should have a maximum length of {#limit}`,
    }),
  logoUrl: Joi.string().uri().messages({
    "string.base": `"brand.logoUrl" should be a type of 'text'`,
    "string.uri": `"brand.logoUrl" should be a valid URI`,
  }),
  website: Joi.string().uri().messages({
    "string.base": `"brand.website" should be a type of 'text'`,
    "string.uri": `"brand.website" should be a valid URI`,
  }),
}).required();

const _BaseDateValidator = Joi.date().iso().messages({
  "date.base": `"date" should be a valid date`,
  "date.format": `"date" should be in ISO 8601 format`,
});

const _BasePriorityValidator = Joi.number().integer().min(1).messages({
  "number.base": `"priority" should be a number`,
  "number.integer": `"priority" should be an integer`,
  "number.min": `"priority" should be at least {#limit}`,
});

const _BaseIsActiveValidator = Joi.boolean().messages({
  "boolean.base": `"isActive" should be a boolean value.`,
});

// Create Banner Validator
export const BannerCreateValidator = Joi.object({
  title: _BaseTitleValidator.required(),
  image: _BaseImageUrlValidator.required(),
  target: _BaseTargetUrlValidator.required(),
  brand: _BaseBrandValidator,
  startDate: _BaseDateValidator.required(),
  endDate: _BaseDateValidator.required(),
  isActive: _BaseIsActiveValidator.default(true),
});

// Update Banner Validator
export const BannerUpdateValidator = Joi.object({
  title: _BaseTitleValidator,
  image: _BaseImageUrlValidator,
  target: _BaseTargetUrlValidator,
  brand: _BaseBrandValidator,
  startDate: _BaseDateValidator,
  endDate: _BaseDateValidator,
  priority: _BasePriorityValidator,
  isActive: _BaseIsActiveValidator,
});
