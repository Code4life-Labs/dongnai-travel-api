// Import types
import type { Model } from "mongoose";

/**
 * Check if user exists or not by his/her `username` or `email`
 * @param model
 * @param data
 * @returns
 */
export async function checkUser(model: Model<any>, data: any) {
  if (!data || (!data.username && !data.email)) return false;

  const userCount = await model.countDocuments({
    $or: [{ username: data.username }, { email: data.email }],
  });

  if (userCount === 0) return false;
  return true;
}
