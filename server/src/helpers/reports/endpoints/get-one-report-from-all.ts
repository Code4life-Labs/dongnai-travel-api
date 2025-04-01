// Import helpers
import { buildFullProjection } from "src/helpers/reports/projections";

// Impor services
import { AuthService } from "src/services/auth";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function getOneReportFromAllUsers(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  if (!req.params.id) {
    o!.code = 400;
    throw new Error("Id of report is required");
  }

  // Get report from database
  let query = MC.Reports.findOne({ _id: req.params.id });

  // Build populations
  buildFullProjection(query);

  const report = await query.exec();

  if (!report) {
    o!.code = 404;
    throw new Error(`Place isn't found`);
  }

  return report;
}
