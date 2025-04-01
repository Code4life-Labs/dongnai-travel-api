// Import validators
import {
  PlaceCreateValidator,
  PlaceUpdateValidator,
} from "src/services/validators/place";

// Import types
import type { Model } from "mongoose";
import type { HTTPResponseDataType } from "src/utils/http";

export async function isPlaceExistsWithId(model: Model<any>, id: string) {
  const userCount = await model.countDocuments({
    _id: id,
  });

  if (userCount === 0) return false;
  return true;
}

export async function checkPlaceWhenCreate(data: any, o: HTTPResponseDataType) {
  const validationResult = PlaceCreateValidator.validate(data);
  if (validationResult.error) {
    o!.code = 400;
    throw new Error(validationResult.error.message);
  }

  return validationResult.value;
}

export async function checkPlaceWhenUpdate(data: any, o: HTTPResponseDataType) {
  const validationResult = PlaceUpdateValidator.validate(data);
  if (validationResult.error) {
    o!.code = 400;
    throw new Error(validationResult.error.message);
  }

  return validationResult.value;
}
