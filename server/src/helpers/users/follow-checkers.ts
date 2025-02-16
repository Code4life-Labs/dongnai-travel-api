import mongoose from "mongoose";

// Import validators
import { FollowValidator } from "src/services/validators/follow";

// Import types
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";

export async function checkFollow(
  MC: DongNaiTravelModelsType,
  data: any,
  o: any
) {
  const validationResult = FollowValidator.validate(data);
  if (validationResult.error) {
    o.code = 400;
    throw new Error(validationResult.error.message);
  }

  if (validationResult.value.source === validationResult.value.target) {
    o.code = 400;
    throw new Error(
      "Invalid follow request, source user and target user are the same"
    );
  }

  // Check if source user and target user are valid users
  const users = await MC.Users.find({
    $or: [
      { _id: validationResult.value.source },
      { _id: validationResult.value.target },
    ],
  }).exec();

  // There is a invalid user
  if (users.length === 1) {
    const resultId = users[0]._id.toHexString();

    o!.code = 400;
    // If invalid user is source
    if (resultId !== validationResult.value.source)
      throw new Error("Source user isn't valid");

    // If invalid user is target
    if (resultId !== validationResult.value.target)
      throw new Error("Target user isn't valid");
  } else if (users.length === 0) {
    o.code = 400;
    throw new Error("None of source and target user is valid user");
  }

  return validationResult.value;
}

export async function checkFollowWhenCreateInRequest(
  MC: DongNaiTravelModelsType,
  req: any,
  o: any
) {
  const { id, userId } = req.params;

  if (id === userId) {
    o.code = 400;
    throw new Error("Id and userId in params are same");
  }

  const validData = await checkFollow(MC, req.body, o);

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
