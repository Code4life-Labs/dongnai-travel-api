import path from "path";
import mongoose, { Model } from "mongoose";

// Import classes
import { DirReader } from "src/classes/DirReader";

// Import configs
import AppConfig from "src/app.config.json";
import DatabaseConfig from "src/db.config.json";

const database = DatabaseConfig.databases[1];

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

export type TaskManagerModelsType = {
  Task: Model<any>;
  Assignment: Model<any>;
  TaskStatus: Model<any>;
  TaskPriority: Model<any>;
  TaskSize: Model<any>;
};

export default async function () {
  const models = {};
  const connectionString = `mongodb://${databaseUsername}:${databasePassword}@${databaseHost}:27017/${databaseName}`;

  await mongoose.connect(connectionString, {
    authSource: "admin",
  });

  const modelFilePaths = reader.getAllPathsToFilesSync(rootPath);

  for (const modelFilePath of modelFilePaths) {
    const modelDefault = require(modelFilePath);

    if (!modelDefault.default)
      throw new Error("Model should be exported as default.");

    const model = modelDefault.default;

    // Init
    const result = model();
    (models as any)[result.name] = result.model;
  }

  return models as TaskManagerModelsType;
}
