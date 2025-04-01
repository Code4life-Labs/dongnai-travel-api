// Import helpers
import { buildBriefProjection } from "src/helpers/reports/projections";

// Impor services
import { AuthService } from "src/services/auth";

// Import utils
import { RequestUtils } from "src/utils/request";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function getAllReports(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  // Get `limit` and `skip` from request
  const { limit, skip } = RequestUtils.getLimitNSkip(req);

  // Get reports from database
  let query = MC.Reports.find({}).skip(skip).limit(limit);

  // Build filters
  buildBriefProjection(query);

  const reports = await query.exec();

  // Return reports
  return reports;
}
