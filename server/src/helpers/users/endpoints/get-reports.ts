import { Types } from "mongoose";

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

export default async function getReports(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  if (!req.params.id) {
    o!.code = 400;
    throw new Error("Id of user is required");
  }

  // Get `limit` and `skip` from request
  const { limit, skip } = RequestUtils.getLimitNSkip(req);

  // Get reports from database
  let query = MC.Reports.find({ reporterId: new Types.ObjectId(req.params.id) })
    .skip(skip)
    .limit(limit);

  // Build filters
  buildBriefProjection(query);

  const reports = await query.exec();

  // Return reports
  return reports;
}
