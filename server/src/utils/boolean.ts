export class BooleanUtils {
  /**
   * Check if a target is empty or not.
   * @param target
   * @returns
   */
  static isEmpty(target: any) {
    if (target === undefined || target === null || target === "") return true;
    return false;
  }
}
