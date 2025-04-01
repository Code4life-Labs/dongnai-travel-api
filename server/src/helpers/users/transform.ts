import { pick } from "lodash";

/**
 * Use to get some fields of user
 * @param user
 */
export function transformUser(user: any) {
  if (!user) return {};
  return pick(user, [
    "_id",
    "email",
    "username",
    "displayName",
    "avatar",
    "coverPhoto",
    "role",
    "lastName",
    "firstName",
    "birthday",
    "createdAt",
    "updatedAt",
  ]);
}
