// Import validators
import {
  PlaceReviewValidator,
  PlaceReviewUpdateValidator,
  BlogCommentValidator,
  BlogCommentUpdateValidator,
} from "src/services/validators/content";

// Import types
import type { HTTPResponseDataType } from "src/utils/http";

export function checkPlaceReviewWhenCreate(data: any, o: HTTPResponseDataType) {
  // Check content first
  const validationResult = PlaceReviewValidator.validate(data);
  if (validationResult.error) {
    o!.code = 400;
    throw new Error(validationResult.error.message);
  }

  return validationResult.value;
}

export function checkPlaceReviewWhenUpdate(data: any, o: HTTPResponseDataType) {
  // Check content first
  const validationResult = PlaceReviewUpdateValidator.validate(data);
  if (validationResult.error) {
    o!.code = 400;
    throw new Error(validationResult.error.message);
  }

  if (!validationResult.value.content && !validationResult.value.rating) {
    o!.code = 205;
    return "Nothing change";
  }

  return validationResult.value;
}

export function checkBlogCommentWhenCreate(data: any, o: HTTPResponseDataType) {
  // Check content first
  const validationResult = BlogCommentValidator.validate(data);
  if (validationResult.error) {
    o!.code = 400;
    throw new Error(validationResult.error.message);
  }

  return validationResult.value;
}

export function checkBlogCommentWhenUpdate(data: any, o: HTTPResponseDataType) {
  // Check content first
  const validationResult = BlogCommentUpdateValidator.validate(data);
  if (validationResult.error) {
    o!.code = 400;
    throw new Error(validationResult.error.message);
  }

  if (!validationResult.value.content) {
    o!.code = 205;
    return "Nothing change";
  }

  return validationResult.value;
}
