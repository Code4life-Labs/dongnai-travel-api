// Use to create ORM for configured database
// Note: you have to setup database's setting in `app.config.json`
// Note: This script is suitable for first initialization and you can
// sync new database's configuration.

const fs = require("fs");
const path = require("path");

// Import utils
const { parseArgs, getSrcPath, getSupportedORM } = require("./utils");

console.log(
  "Currently, this script only supports Sequelize\n" +
    "as ORM for MySQL, PostgreSQL, ... and Mongoose for MongoDB.\n" +
    "Please note that - Tuan"
);

const [n, f, ...args] = process.argv;

const supportedArgs = [
  {
    value: "--app",
    description: "Define the application",
    example: "--app=task-service",
  },
];

const parsedArgs = parseArgs(args, supportedArgs);
if (parsedArgs.length === 0) process.exit(0);

const applicationArg = parsedArgs.find(
  (parsedArg) => parsedArg.name === "--app"
);

const srcPath = getSrcPath(applicationArg.value);

// Import config
const AppConfig = require(path.resolve(srcPath, "app.config.json"));
const DatabaseConfig = require(path.resolve(srcPath, "db.config.json"));

// Check the `databases` config
const databaseConfigurations = DatabaseConfig.databases;

// Declare some variables
const templatePath = path.resolve(".", "_templates");
const targetDirPath = path.resolve(srcPath, AppConfig.folders.databases);

// Check
if (!Array.isArray(databaseConfigurations))
  throw new Error("Configuration of databases must be stored in an Array.");
else if (databaseConfigurations.length === 0)
  throw new Error("Configure of databases cannot be empty.");

if (!fs.existsSync(targetDirPath))
  throw new Error("The `src/databases` is required");
console.log("Generating from your `databases` configuration...");

// Declare and assign some variables
const sequelizeSetupTemplateName = "sequelize-setup.template";
const sequelizeModelTemplateName = "sequelize-model.template";
const mongooseSetupTemplateName = "mongoose-setup.template";
const placeHolders = {
  databaseName: "[DATABASE_NAME]",
  databaseConfigurationIndex: "[INDEX]",
  modelName: "[MODEL_NAME]",
  objects: "[OBJECTS]",
  sequelizeAssociations: "[SEQUELIZE_ASSOCIATIONS]",
  tableName: "[TABLE_NAME]",
  collectionName: "[COLLECTION_NAME]",
};

// Read templates
const sequelizeSetupTemplate = fs
  .readFileSync(path.resolve(templatePath, sequelizeSetupTemplateName))
  .toString();
const sequelizeModelTemplate = fs
  .readFileSync(path.resolve(templatePath, sequelizeModelTemplateName))
  .toString();
const mongooseSetupTemplate = fs
  .readFileSync(path.resolve(templatePath, mongooseSetupTemplateName))
  .toString();

let index = 0;
for (const config of databaseConfigurations) {
  const orm = getSupportedORM(config.engine);

  switch (orm) {
    /**
     * If the ORM is sequelize, I'll process
     * the configuration follow standard of Sequelize
     */
    case "sequelize": {
      // Replace value in sequelize-setup template
      let template = sequelizeSetupTemplate
        .replaceAll(placeHolders.databaseName, config.name)
        .replaceAll(placeHolders.databaseConfigurationIndex, index);
      let targetDatabaseDirPath = path.resolve(targetDirPath, config.name);

      // Check if folder of database exists
      if (!fs.existsSync(targetDatabaseDirPath)) {
        // Create folder
        fs.mkdirSync(targetDatabaseDirPath);

        // Create index file
        fs.writeFileSync(
          path.resolve(targetDatabaseDirPath, "index.ts"),
          template
        );
      }

      // Iterate the objects property
      for (const key in config.objects) {
        let modelFolderPath = path.resolve(
          targetDatabaseDirPath,
          config.objects[key].tableName
        );
        let modelFilePath = path.resolve(modelFolderPath, "model.ts");
        let modelTemplate = sequelizeModelTemplate
          .replaceAll(placeHolders.modelName, key)
          .replaceAll(
            placeHolders.sequelizeAssociations,
            JSON.stringify(config.objects[key].associations)
          )
          .replaceAll(placeHolders.tableName, config.objects[key].tableName);

        // Check if folder of model exist
        if (!fs.existsSync(modelFolderPath)) {
          // Create new
          fs.mkdirSync(modelFolderPath);
        }

        // Check if file of model exist
        if (!fs.existsSync(modelFilePath)) {
          // Create new
          fs.writeFileSync(modelFilePath, modelTemplate);
        } else {
          // Update
        }
      }
      break;
    }

    /**
     * If the ORM is mongoose, I'll process
     * the configuration follow standard of Mongoose
     */
    case "mongoose": {
      // Replace value in mongoose-setup template

      // Iterate the objects property

      // Check if folder of database exists

      // Create folder

      // Check if folder and file of model exist

      // Create folder and file for model
      break;
    }

    default:
      throw new Error(`The ORM ${orm} isn't supported`);
  }

  index++;
}

console.log("Done!");
