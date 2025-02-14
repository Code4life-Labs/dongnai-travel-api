// Import utils
import { REVIEW_COMMENT_CHARACTER_LIMIT } from "src/utils/constants";

// Import types
import type { HTTPResponseDataType } from "src/utils/http";

export function checkReviewOrCommentContent(
  content: any,
  o: HTTPResponseDataType
) {
  // Check content first
  if (content === undefined || content === null) {
    o.code = 400;
    throw new Error("Content is required");
  }

  if (typeof content !== "string") {
    o.code = 400;
    throw new Error("Content must be a string");
  }

  if (content.length > REVIEW_COMMENT_CHARACTER_LIMIT) {
    o.code = 400;
    throw new Error(
      `Content exceeds amount of characters (reach limit at ${REVIEW_COMMENT_CHARACTER_LIMIT})`
    );
  }

  return content;
}
