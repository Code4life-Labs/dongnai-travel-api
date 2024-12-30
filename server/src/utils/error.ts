import { HTTPUtils } from "./http";

import type { Response, Request } from "express";
import type { HTTPResponseDataType, InterchangeDateType } from "./http";

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
    ) => any
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
      let code = result.code === 200 ? 500 : result.code;
      result = HTTPUtils.generateHTTPResponseData(code, error.message);
    } finally {
      return res.status(result.code).json(result);
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
    ) => any
  ) {
    let result = HTTPUtils.generateHTTPResponseData(200, "Successfully");

    try {
      await fn.call(ctx, req, res, result);
    } catch (error: any) {
      let code = result.code === 200 ? 500 : result.code;
      result = HTTPUtils.generateHTTPResponseData(code, error.message);
      return res.status(result.code).json(result);
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
    ) => Promise<T | undefined> | T | undefined
  ) {
    let result = HTTPUtils.generateInterchange<T>();

    try {
      let maybePromisedData = fn.call(ctx, result);
      // If function is an async function
      if (maybePromisedData instanceof Promise) {
        result.data = await maybePromisedData;
      } else result.data = maybePromisedData;
    } catch (error: any) {
      result.code = 1;
      result.message = error.message;
    } finally {
      return result;
    }
  }
}
