// Import utils
import { MIN_MAX_RATING } from "src/utils/constants";

// Import types
import type { HTTPResponseDataType } from "src/utils/http";

export function checkRating(rating: any, o: HTTPResponseDataType) {
  if (rating === undefined || rating === null) {
    o.code = 400;
    throw new Error("Rating is required");
  }

  if (typeof rating !== "number") {
    o.code = 400;
    throw new Error("Rating must be a number");
  }

  if (rating < MIN_MAX_RATING[0]) {
    o.code = 400;
    throw new Error(
      `Rating is lower than minimun (${rating} is lower than ${MIN_MAX_RATING[0]})`
    );
  }

  if (rating > MIN_MAX_RATING[1]) {
    o.code = 400;
    throw new Error(
      `Rating is greater than maximum (${rating} is greater than ${MIN_MAX_RATING[1]})`
    );
  }

  return rating;
}
