// Import types
import type { Model } from "mongoose";

export async function isPlaceExistsWithId(model: Model<any>, id: string) {
  const userCount = await model.countDocuments({
    _id: id,
  });

  if (userCount === 0) return false;
  return true;
}
