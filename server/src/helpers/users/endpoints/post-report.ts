// Import helpers
import { checkReportWhenCreate } from "src/helpers/reports/report-checkers";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function postReport(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  const validData = await checkReportWhenCreate(req.body, o!);

  // Add new follow
  const result = await MC.Reports.create(validData);

  if (!result) {
    o!.code = 500;
    throw new Error("Cannot follow this user");
  }

  o!.code = 201;

  return result;
}
