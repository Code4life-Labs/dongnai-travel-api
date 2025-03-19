// Import helpers
import { checkReportWhenUpdate } from "src/helpers/reports/report-checkers";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function patchReport(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  if (!req.params.reportId) {
    o!.code = 400;
    throw new Error("Id of report is required");
  }

  const validData = await checkReportWhenUpdate(req.body, o!);

  // Add new follow
  const result = await MC.Reports.updateOne(
    { _id: req.params.reportId },
    validData
  );

  if (!result) {
    o!.code = 500;
    throw new Error(`Cannot find any report with id [${req.params.reportId}]`);
  }

  o!.code = 201;

  return result;
}
