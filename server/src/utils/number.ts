export class NumberUtils {
  /**
   * Get random number in range [min, max].
   * @param min
   * @param max
   * @returns
   */
  static getRandom(min = 0, max = 10) {
    return Math.floor(Math.random() * (min + max + 1));
  }
}
