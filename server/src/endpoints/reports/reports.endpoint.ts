// Import classes
import { Endpoints } from "src/classes/Endpoints";

// Import database
import db from "src/databases/dongnaitravel";

// Import helpers
import getAllReports from "src/helpers/reports/endpoints/get-all-reports";
import getOneReportFromAllUsers from "src/helpers/reports/endpoints/get-one-report-from-all";
import getReportReasons from "src/helpers/reports/endpoints/get-report-reasons";
import getReportStatuses from "src/helpers/reports/endpoints/get-report-statuses";

// Import services
import { AuthMiddlewares } from "src/services/auth/middlewares";

// Import types
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";

const reportsEndpoints = new Endpoints("reports");
let DNTModels: DongNaiTravelModelsType;

db().then((models) => {
  DNTModels = models;
});

/**
 * Get reports
 */
reportsEndpoints
  .createHandler("")
  .use(AuthMiddlewares.checkToken)
  .use(AuthMiddlewares.checkVerifiedUser)
  .use(AuthMiddlewares.createPolicyChecker("report", "report:getAllReports"))
  .get(async (req, res, o) => {
    return getAllReports(DNTModels, req, res, o);
  });

/**
 * Get report statuses
 */
reportsEndpoints.createHandler("/statuses").get(async (req, res, o) => {
  return getReportStatuses(DNTModels, req, res, o);
});

/**
 * Get report reasons
 */
reportsEndpoints.createHandler("/reasons").get(async (req, res, o) => {
  return getReportReasons(DNTModels, req, res, o);
});

/**
 * Get report by id
 */
reportsEndpoints
  .createHandler("/:id")
  .use(AuthMiddlewares.checkToken)
  .use(AuthMiddlewares.checkVerifiedUser)
  .use(
    AuthMiddlewares.createPolicyChecker(
      "report",
      "report:getOneReportFromAllUsers"
    )
  )
  .get(async (req, res, o) => {
    return getOneReportFromAllUsers(DNTModels, req, res, o);
  });

export default reportsEndpoints;