// Import validators
import { FollowValidator } from "src/services/validators/follow";

export function checkFollow(data: any, o: any) {
  const validationResult = FollowValidator.validate(data);
  if (validationResult.error) {
    o.code = 400;
    throw new Error(validationResult.error.message);
  }

  return validationResult.value;
}

export function checkFollowWhenCreateInRequest(req: any, o: any) {
  const bodyData = req.body;
  const { id, userId } = req.params;

  if (!id) {
    o.code = 400;
    throw new Error("Id of source user is required");
  }

  if (!userId) {
    o.code = 400;
    throw new Error("Id of target user is required");
  }

  const validData = checkFollow(req.body, o);

  if (validData.source !== id) {
    o.code = 400;
    throw new Error("Id and source are mismatch");
  }

  if (validData.target !== userId) {
    o.code = 400;
    throw new Error("UserId and target are mismatch");
  }

  return validData;
}
