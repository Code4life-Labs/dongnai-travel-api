// Import helpers
import { checkBlogWhenCreate } from "../blog-checkers";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function checkBlogMetadata(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  // Return blog comments
  return checkBlogWhenCreate(req.body, o!);
}
