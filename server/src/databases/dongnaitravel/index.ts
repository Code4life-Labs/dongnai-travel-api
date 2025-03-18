import path from "path";
import mongoose, { Model } from "mongoose";

// Import classes
import { DirReader } from "src/classes/DirReader";

// Import configs
import AppConfig from "src/app.config.json";
import DatabaseConfig from "src/db.config.json";

const database = DatabaseConfig.databases[0];

// Get path of endpoints folder
const rootFolder = AppConfig.folders.databases;
const rootPath = path.resolve(`./src/${rootFolder}/${database.name}`);

const reader = new DirReader(AppConfig.unListedEndpointsDir);

const uppercasedDatabaseName = database.name.toUpperCase();
const databaseName = database.database
  ? database.database
  : process.env[`${uppercasedDatabaseName}_NAME`];
const databaseUsername = database.username
  ? database.username
  : process.env[`${uppercasedDatabaseName}_USERNAME`];
const databasePassword = database.password
  ? database.password
  : process.env[`${uppercasedDatabaseName}_PASSWORD`];
const databaseHost = database.host
  ? database.host
  : process.env[`${uppercasedDatabaseName}_HOST`];
const databaseEngine = database.engine
  ? database.engine
  : process.env[`${uppercasedDatabaseName}_ENGINE`];

export type DongNaiTravelModelsType = {
  Blogs: Model<any>;
  BlogComments: Model<any>;
  BlogTypes: Model<any>;
  BusinessStatuses: Model<any>;
  Follows: Model<any>;
  Places: Model<any>;
  PlaceReviews: Model<any>;
  PlaceTypes: Model<any>;
  Reports: Model<any>;
  ReportReasons: Model<any>;
  ReportStatuses: Model<any>;
  Users: Model<any>;
  UserFavoritedBlogs: Model<any>;
  UserFavoritedPlaces: Model<any>;
  UserRoles: Model<any>;
  UserVisitedPlaces: Model<any>;
  Otps: Model<any>;
};

const models = {};
let isConnected = false;

export default async function () {
  const hasModels = Object.keys(models).length > 0;

  // Everythings is cached, return the final result
  if (hasModels) return models as DongNaiTravelModelsType;

  // Build model
  const modelFilePaths = reader.getAllPathsToFilesSync(rootPath);

  console.log(`[${databaseName}] Start building models from schemas...`);

  for (const modelFilePath of modelFilePaths) {
    const modelDefault = require(modelFilePath);

    if (!modelDefault.default)
      throw new Error("Model should be exported as default.");

    const model = modelDefault.default;

    // Init
    const result = model();
    (models as any)[result.name] = result.model;
  }

  console.log(`[${databaseName}] Finish build models`);

  const connectionString = `mongodb://${databaseUsername}:${databasePassword}@${databaseHost}:27017/${databaseName}`;

  console.log(`[${databaseName}] Connecting to MongoDB Database...`);

  await mongoose.connect(connectionString, {
    authSource: "admin",
  });
  isConnected = true;

  console.log(`[${databaseName}] Connected to MongoDB Database`);

  return models as DongNaiTravelModelsType;
}
