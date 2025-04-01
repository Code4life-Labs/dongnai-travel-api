// Import utils
import { NumberUtils } from "src/utils/number";

const numbersStr = "0123456789";

/**
 * Use to generate a random OTP Code
 * @returns
 */
export function generateOtp() {
  let result = "";

  for (let i = 0; i < 6; i++) {
    result += NumberUtils.getRandom(0, numbersStr.length - 1);
  }

  return result;
}
