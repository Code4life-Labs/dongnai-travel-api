// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function getBanner(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  if (!req.params.id) {
    o!.code = 400;
    throw new Error("The banner with Id [${req.params.id}] isn't found");
  }

  // Get banner from database
  let query = MC.Banners.findOne({ _id: req.params.id });

  const banner = await query.exec();

  // Return banner
  return banner;
}
