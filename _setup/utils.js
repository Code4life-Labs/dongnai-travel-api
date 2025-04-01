const fs = require("fs");
const path = require("path");

const argFormats = {
  "--": {
    regex: /^(--[a-zA-Z-]+)=([a-zA-Z;\-:\[\]\/]+)$/,
    example: "--name=value",
  },
  "-": {
    regex: /^-([a-zA-Z]){1}$/,
    example: "-name",
  },
};

const orms = {
  mysql: "sequelize",
  postgresql: "sequelize",
  sqlite: "sequelize",
  mssql: "sequelize",
  mongodb: "mongoose",
};

module.exports = {
  getSrcPath(startPath) {
    let cwd = startPath
      ? path.resolve(process.cwd(), startPath)
      : process.cwd();
    const srcPath = "src";
    const packageJsonPath = "package.json";

    while (!cwd.endsWith(srcPath)) {
      const paths = fs.readdirSync(cwd);
      let count = 0;

      // List current directory to find `src` and `package.json`
      for (const _path of paths) {
        if (_path === srcPath || _path === packageJsonPath) {
          count++;
        }

        if (count == 2) {
          cwd = path.resolve(cwd, srcPath);
          return cwd;
        }
      }

      // If not, go to outside
      cwd = path.resolve(cwd, "..");
    }

    return cwd;
  },

  /**
   * Parse `args` to js object
   * @param {Array<string>} args
   * @param {Array<{ value: string, description: string, example: string }> | undefined} supportedArgs
   */
  parseArgs(args, supportedArgs) {
    if (!Array.isArray(args)) throw new Error("Args must be an array");
    if (supportedArgs && !Array.isArray(args))
      throw new Error("Supported Args must be an array");

    const result = [];

    for (const arg of args) {
      // If start with --
      if (arg.startsWith("--")) {
        const match = arg.match(argFormats["--"].regex);

        // If is --help flag
        if (match === null && arg === "--help") {
          console.table(supportedArgs);
          break;
        }

        // If match is null
        if (match === null)
          throw new Error(
            `The arg ${arg} is invalid. It must be ${argFormats["--"].example}`
          );

        // Check if arg is in supported args
        if (
          !supportedArgs.find((supportedArg) => supportedArg.value === match[1])
        ) {
          console.table(supportedArgs);
          throw new Error(`The arg ${arg} is not supported`);
        }

        result.push({ name: match[1], value: match[2] });
        continue;
      }

      // If start with -
      if (arg.startsWith("-")) {
        const match = arg.match(argFormats["-"].regex);

        // If is -h
        if (match[0] === "-h") {
          console.table(supportedArgs);
          break;
        }

        if (match === null)
          throw new Error(
            `The arg ${arg} is invalid. It must be ${argFormats["-"].example}`
          );

        // Check if arg is in supported args
        if (
          !supportedArgs.find((supportedArg) => supportedArg.value === match[0])
        ) {
          console.table(supportedArgs);
          throw new Error(`The arg ${arg} is not supported`);
        }

        result.push({ name: match[0], value: "" });
        continue;
      }

      result[result.length - 1].value = arg;
    }

    if (args[0] !== "--help" && args[0] !== "-h" && result.length === 0) {
      console.table(supportedArgs);
      throw new Error(
        "Information of endpoint is required, see more in the table below"
      );
    }

    return result;
  },

  /**
   * Get supported ORM by name of database
   * @param {string} databaseName
   * @returns
   */
  getSupportedORM(databaseName) {
    const result = orms[databaseName];

    if (!result)
      throw new Error(
        `The database ${databaseName} is not supported and doesn't have any supported ORM`
      );

    return result;
  },
};
