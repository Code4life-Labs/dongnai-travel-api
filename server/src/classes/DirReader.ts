// Define you application's endpoints in `src/endpoints` directory.
// Please follow the conventions to avoid errors

import fs from "fs";
import path from "path";

export class DirReader {
  blackList?: Array<string>;
  blackListRegexp?: Record<string, RegExp>;

  constructor(blackList?: Array<string>) {
    this.blackList = blackList;

    if (this.blackList) {
      this.blackListRegexp = {};
      for (const restrict of this.blackList) {
        this.blackListRegexp[restrict] = new RegExp(restrict, "i");
      }
    }
  }

  /**
   * Use to check if `path` is in `black list`.
   * @param path
   * @returns
   */
  isInBlackList(path: string) {
    if (!this.blackList) return false;
    if (!this.blackListRegexp) return false;

    for (const restrict of this.blackList) {
      // To Regexp
      if (this.blackListRegexp[restrict].test(path)) return true;
    }
    return false;
  }

  /**
   * Use to get paths of content in `pathDir` directory.
   * @param pathDir
   * @param fn
   * @returns
   */
  async readDir(
    pathDir: string,
    fn: (files: Array<string>) => Array<string> = (files: Array<string>) =>
      files
  ) {
    return new Promise<Array<string>>((resolve, reject) => {
      fs.readdir(pathDir, function (err, files) {
        // Skip error
        if (err) {
          console.error(err);
          return [];
        }
        resolve(fn(files));
      });
    });
  }

  /**
   * Use to get path to files of directory recursively, including sub directory.
   * @param startPath
   * @param accumulation
   * @returns
   */
  async getAllPathsToFiles(
    startPath: string,
    accumulation: Array<string> = []
  ) {
    const files = await this.readDir(startPath);

    for (const file of files) {
      // Check if file is in blacklist or not include in choice list
      if (this.isInBlackList(file)) continue;

      let pathToFile = path.resolve(startPath, file);
      const stat = fs.statSync(pathToFile);

      if (stat.isDirectory()) {
        await this.getAllPathsToFiles(pathToFile, accumulation);
      } else {
        pathToFile = pathToFile.replaceAll(/\\+/g, "/");
        accumulation.push(pathToFile);
      }
    }

    return accumulation;
  }

  /**
   * Use to synchronously get path to files of directory recursively, including sub directory.
   * @param startPath
   * @param accumulation
   * @returns
   */
  getAllPathsToFilesSync(startPath: string, accumulation: Array<string> = []) {
    const files = fs.readdirSync(startPath);

    for (const file of files) {
      // Check if file is in blacklist or not include in choice list
      if (this.isInBlackList(file)) continue;

      let pathToFile = path.resolve(startPath, file);
      const stat = fs.statSync(pathToFile);

      if (stat.isDirectory()) {
        this.getAllPathsToFilesSync(pathToFile, accumulation);
      } else {
        pathToFile = pathToFile.replaceAll(/\\+/g, "/");
        accumulation.push(pathToFile);
      }
    }

    return accumulation;
  }
}
