import express from "express";
import http from "http";
import cors from "cors";

// Use module-alias
import "module-alias/register";

// Import database
import db from "src/databases/dongnaitravel";

// Import config
import AppConfig from "src/app.config.json";

// Import endpoints
import buildEndpoints from "src/endpoints";

// Import helpders
import { SimpleMemoryStore } from "./helpers/other/memory-store";

// Import types
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";

// Import ConfigUtils to initialize configuration with API keys
import { ConfigUtils } from "./utils/config";

const app = express();
const router = express.Router();

// Add global middleware
app.use(
  cors({
    origin: AppConfig.origins,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply router
app.use(router);

// Log that configuration is loaded with API keys
console.log(`Starting ${ConfigUtils.getConfig().app} with API keys loaded from secrets`);

async function main() {
  // Setup server instance
  const instance = http.createServer(app);

  // Connect to Database
  let DNTModels: DongNaiTravelModelsType = await db();

  // Get some initial data
  const [
    userRoleObjects,
    placeTypeObjects,
    blogTypeObjects,
    reportReasonObjects,
    reportStatuseObjects,
  ] = await Promise.all([
    DNTModels.UserRoles.find().exec(),
    DNTModels.PlaceTypes.find().exec(),
    DNTModels.BlogTypes.find().exec(),
    DNTModels.ReportReasons.find().exec(),
    DNTModels.ReportStatuses.find().exec(),
  ]);

  // Save to Memory store
  SimpleMemoryStore.save(
    "user-roles",
    userRoleObjects.map((o) => o.toJSON())
  );
  SimpleMemoryStore.save(
    "place-types",
    placeTypeObjects.map((o) => o.toJSON())
  );
  SimpleMemoryStore.save(
    "blog-types",
    blogTypeObjects.map((o) => o.toJSON())
  );
  SimpleMemoryStore.save(
    "report-reasons",
    reportReasonObjects.map((o) => o.toJSON())
  );
  SimpleMemoryStore.save(
    "report-statuses",
    reportStatuseObjects.map((o) => o.toJSON())
  );

  // Build endpoints
  await buildEndpoints(router);

  // Start listen
  instance.listen(AppConfig.port, AppConfig.hostname, () => {
    console.log(
      `You server is listening on http://${AppConfig.hostname}:${AppConfig.port}`
    );
  });
}

main();
