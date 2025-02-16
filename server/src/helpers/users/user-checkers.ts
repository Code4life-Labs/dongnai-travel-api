// Import validators
import { UserDataUpdateValidator } from "src/services/validators/user";

// Import types
import type { Model } from "mongoose";

/**
 * Use to check if user exists or not by his/her `_id`
 * @param model
 * @param data
 * @returns
 */
export async function checkUserById(model: Model<any>, id: string) {
  const userCount = await model.countDocuments({
    _id: id,
  });

  if (userCount === 0) return false;
  return true;
}

/**
 * Use to check if user exists or not by his/her `username`
 * @param model
 * @param data
 * @returns
 */
export async function checkUserByUsername(model: Model<any>, username: string) {
  const userCount = await model.countDocuments({
    username,
  });

  if (userCount === 0) return false;
  return true;
}

/**
 * Use to check if user exists or not by his/her `username` or `email`
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

/**
 * Use to check if user data is correct (valid)
 * @param data
 * @param o
 * @returns
 */
export function checkUserDataWhenUpdate(data: any, o: any) {
  const validationResult = UserDataUpdateValidator.validate(data);
  if (validationResult.error) {
    o.code = 400;
    throw new Error(validationResult.error.message);
  }

  return validationResult.value;
}
