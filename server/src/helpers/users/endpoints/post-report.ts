// Import helpers
import { checkReportWhenCreate } from "src/helpers/reports/report-checkers";
import { SimpleMemoryStore } from "src/helpers/other/memory-store";

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
  const reportStatuses = SimpleMemoryStore.get("report-statuses");

  if (req.params.id !== req.body.reporterId) {
    o!.code = 400;
    throw new Error("Id in params and in body are mismatch");
  }

  // Update status
  validData.statusId = reportStatuses.find(
    (status: any) => status.value === "pending"
  );

  // Add new follow
  const result = await MC.Reports.create(validData);

  if (!result) {
    o!.code = 500;
    throw new Error("Cannot create report");
  }

  o!.code = 201;

  return result;
}
