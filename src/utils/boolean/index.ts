// Import base
import { Util } from "src/classes/Util";

export class BooleanUtil extends Util {
  isTrue(data?: any) {
    let check = Boolean(data);

    if (typeof check === "number") check = !Number.isNaN(data);

    return data !== undefined && data !== null && check;
  }

  isFalse(data?: any) {
    let check = !Boolean(data);

    if (typeof check === "number") check = Number.isNaN(data);

    return data !== undefined && data !== null && check;
  }

  isEmpty<T>(data?: T): data is undefined {
    switch (typeof data) {
      case "string": {
        return !data;
      }

      case "number": {
        return data === undefined || data === null || Number.isNaN(data);
      }

      case "object": {
        if (Array.isArray(data)) return data.length === 0;
        return Object.getOwnPropertyNames(data).length === 0;
      }

      case "undefined": {
        return true;
      }

      default:
        return data === undefined || data === null || false;
    }
  }
}