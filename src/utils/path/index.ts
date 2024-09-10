import _path from "path";

export class PathUtils {
  /**
   * Get the root dir of project
   * @returns
   */
  getRootDir() {
    return process.cwd();
  }

  /**
   * Get the entire path to a specific dir
   * @param path
   */
  getRootDirTo(...path: Array<string>) {
    return _path.resolve(this.getRootDir(), ...path);
  }
}
