import { HTTPUtils } from "./http";

import type { Response, Request } from "express";
import type { HTTPResponseDataType, InterchangeDateType } from "./http";

/**
 * Hàm này giúp loại bỏ các tham chiếu vòng tròn trong đối tượng
 * để tránh lỗi khi chuyển đổi sang JSON
 */
function removeCircularReferences(obj: any, seen = new WeakSet()): any {
  // Đối với null hoặc các kiểu dữ liệu nguyên thủy, trả về ngay
  if (!obj || typeof obj !== 'object') return obj;
  
  // Nếu đối tượng đã được thấy trước đó, có nghĩa là có tham chiếu vòng tròn
  if (seen.has(obj)) return '[Circular Reference]';
  
  // Đánh dấu đối tượng này đã được xử lý
  seen.add(obj);
  
  // Xử lý mảng
  if (Array.isArray(obj)) {
    return obj.map(item => removeCircularReferences(item, seen));
  }
  
  // Xử lý đối tượng
  const result: any = {};
  for (const [key, value] of Object.entries(obj)) {
    // Bỏ qua các thuộc tính đặc biệt hoặc các thuộc tính có tiền tố _
    if (key.startsWith('_') || key === 'socket' || key === 'client' || key === 'parser') {
      continue;
    }
    result[key] = removeCircularReferences(value, seen);
  }
  
  return result;
}

export class ErrorUtils {
  /**
   * Use this function to wrap a function that can cause errors. The result of this function
   * is `HTTPResponse` so it's suitable to use with controller's handlers.
   * @param ctx
   * @param fn
   * @returns
   */
  static async handleJSONResponseError<C>(
    ctx: C,
    req: Request,
    res: Response,
    fn: (
      this: C,
      req: Request,
      res: Response,
      result: HTTPResponseDataType
    ) => any,
    errorFn?: (error: any, result: HTTPResponseDataType, req: Request) => void
  ) {
    let result = HTTPUtils.generateHTTPResponseData(200, "Successfully");
    try {
      let maybePromisedData = fn.call(ctx, req, res, result);
      // If function is an async function
      if (maybePromisedData instanceof Promise) {
        result.data = await maybePromisedData;
      } else {
        result.data = maybePromisedData;
      }
    } catch (error: any) {
      if (errorFn) {
        errorFn(error, result, req);
      }
      let code = result.code === 200 ? 500 : result.code;
      result = HTTPUtils.generateHTTPResponseData(code, error.message);
    } finally {
      // Xử lý dữ liệu để loại bỏ tham chiếu vòng tròn trước khi trả về
      const safeResult = removeCircularReferences(result);
      return res.status(safeResult.code).json(safeResult);
    }
  }

  /**
   * Use this function to handle error in streamming response, if there
   * is any error, return JSON Response.
   *
   * Used in streamming / file response.
   * @param ctx
   * @param res
   * @param fn
   * @returns
   */
  static async handleError<C>(
    ctx: C,
    req: Request,
    res: Response,
    fn: (
      this: C,
      req: Request,
      res: Response,
      result: HTTPResponseDataType
    ) => any,
    errorFn?: (error: any, result: HTTPResponseDataType, req: Request) => void
  ) {
    let result = HTTPUtils.generateHTTPResponseData(200, "Successfully");

    try {
      await fn.call(ctx, req, res, result);
    } catch (error: any) {
      if (errorFn) {
        errorFn(error, result, req);
      }
      let code = result.code === 200 ? 500 : result.code;
      result = HTTPUtils.generateHTTPResponseData(code, error.message);
      // Xử lý dữ liệu để loại bỏ tham chiếu vòng tròn trước khi trả về
      const safeResult = removeCircularReferences(result);
      return res.status(safeResult.code).json(safeResult);
    }
  }

  /**
   * Use this function to wrap a function that can cause errors. The result of this function
   * is `Interchange` so it's suitable to use with some local components.
   * @param ctx
   * @param fn
   * @returns
   */
  static async handleInterchangeError<C, T>(
    ctx: C,
    fn: (
      this: C,
      result: InterchangeDateType<T>
    ) => Promise<T | undefined> | T | undefined,
    errorFn?: (error: any, result: InterchangeDateType<T>) => void
  ) {
    let result = HTTPUtils.generateInterchange<T>();

    try {
      let maybePromisedData = fn.call(ctx, result);
      // If function is an async function
      if (maybePromisedData instanceof Promise) {
        result.data = await maybePromisedData;
      } else result.data = maybePromisedData;
    } catch (error: any) {
      if (errorFn) {
        errorFn(error, result);
      }
      result.code = 1;
      result.message = error.message;
    } finally {
      // Xử lý dữ liệu để loại bỏ tham chiếu vòng tròn
      return removeCircularReferences(result);
    }
  }
}
