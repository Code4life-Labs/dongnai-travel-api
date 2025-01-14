import fs from "fs";
import path from "path";

// Import utils
import { StringUtils } from "./string";

export class FileUtils {
  /**
   * Use to read file from root of this project
   * @param parts
   */
  static readFile(...parts: Array<string>) {
    const rootDir = path.resolve(StringUtils.getSrcPath(), "..");
    const pathToFile = path.resolve(rootDir, ...parts);
    return fs.readFileSync(pathToFile);
  }

  /**
   * Use to read file from root of this project
   * @param parts
   */
  static async readFileAsync(...parts: Array<string>) {
    const rootDir = path.resolve(StringUtils.getSrcPath(), "..");
    const pathToFile = path.resolve(rootDir, ...parts);

    return new Promise((resolve, reject) => {
      fs.readFile(pathToFile, function (err, data) {
        if (err) reject(err);
        resolve(data);
      });
    });
  }
}
