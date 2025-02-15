import Joi from "joi";

// Import utils
import {
  REVIEW_COMMENT_CHARACTER_LIMITS,
  MIN_MAX_RATING,
} from "src/utils/constants";

export const PlaceReviewValidator = Joi.object({
  content: Joi.string()
    .required()
    .min(REVIEW_COMMENT_CHARACTER_LIMITS[0])
    .max(REVIEW_COMMENT_CHARACTER_LIMITS[1])
    .messages({
      "string.empty": `"content" cannot be empty`,
      "string.base": `"content" should be a type of 'text'`,
      "string.min": `"content" should have a minimum length of {#limit}`,
      "string.max": `"content" should have a maximum length of {#limit}`,
      "any.required": `"content" is required`,
    }),
  rating: Joi.number()
    .required()
    .min(MIN_MAX_RATING[0])
    .max(MIN_MAX_RATING[1])
    .messages({
      "number.base": `"rating" should be a type of 'number'`,
      "number.min": `"rating" should have a minimum length of {#limit}`,
      "number.max": `"rating" should have a maximum length of {#limit}`,
      "any.required": `"rating" is required`,
    }),
});

export const PlaceReviewUpdateValidator = Joi.object({
  content: Joi.string()
    .min(REVIEW_COMMENT_CHARACTER_LIMITS[0])
    .max(REVIEW_COMMENT_CHARACTER_LIMITS[1])
    .messages({
      "string.base": `"content" should be a type of 'text'`,
      "string.min": `"content" should have a minimum length of {#limit}`,
      "string.max": `"content" should have a maximum length of {#limit}`,
    }),
  rating: Joi.number().min(MIN_MAX_RATING[0]).max(MIN_MAX_RATING[1]).messages({
    "number.base": `"rating" should be a type of 'number'`,
    "number.min": `"rating" should have a minimum length of {#limit}`,
    "number.max": `"rating" should have a maximum length of {#limit}`,
  }),
});

export const BlogCommentValidator = Joi.object({
  content: Joi.string()
    .required()
    .min(REVIEW_COMMENT_CHARACTER_LIMITS[0])
    .max(REVIEW_COMMENT_CHARACTER_LIMITS[1])
    .messages({
      "string.empty": `"content" cannot be empty`,
      "string.base": `"content" should be a type of 'text'`,
      "string.min": `"content" should have a minimum length of {#limit}`,
      "string.max": `"content" should have a maximum length of {#limit}`,
      "any.required": `"content" is required`,
    }),
});

export const BlogCommentUpdateValidator = Joi.object({
  content: Joi.string()
    .min(REVIEW_COMMENT_CHARACTER_LIMITS[0])
    .max(REVIEW_COMMENT_CHARACTER_LIMITS[1])
    .messages({
      "string.base": `"content" should be a type of 'text'`,
      "string.min": `"content" should have a minimum length of {#limit}`,
      "string.max": `"content" should have a maximum length of {#limit}`,
    }),
});
