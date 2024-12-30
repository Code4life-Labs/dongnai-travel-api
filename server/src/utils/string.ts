import fs from "fs";
import path from "path";

export class StringUtils {
  constructor() {}

  /**
   * Get valid `path` from various string
   * @param parts
   * @returns
   */
  static getPath(...parts: Array<string>) {
    let result = "";

    for (const part of parts) {
      if (part[0] !== "/") result += "/" + part;
      else result += part.replace(/\/{2,}/, "/");
    }

    if (result[0] !== "/") return "/" + result;

    return result;
  }

  /**
   * Get path of root directory
   * @returns
   */
  static getRootDir() {
    return path.resolve(StringUtils.getSrcPath(), "..");
  }

  /**
   * Get path from root directory to `path`.
   * @param parts
   * @returns
   */
  static getRootDirTo(...parts: Array<string>) {
    return path.resolve(StringUtils.getRootDir(), ...parts);
  }

  /**
   * Get the `src` path from any current working directory
   * @returns
   */
  static getSrcPath() {
    let cwd = process.cwd();
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
  }
}
