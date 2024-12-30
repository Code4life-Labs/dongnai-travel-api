// Import utils
import { ErrorUtils } from "src/utils/error";
import { StringUtils } from "src/utils/string";

import type { Request, Response, NextFunction, Router } from "express";
import type { HTTPResponseDataType } from "src/utils/http";

interface AppMiddleware {
  (req: Request, res: Response, next: NextFunction): any;
}

interface HandlerFnAsync {
  (req: Request, res: Response, result: HTTPResponseDataType): Promise<any>;
}

interface HandlerFn {
  (req: Request, res: Response, result: HTTPResponseDataType): any;
}

type HandlerMetaType = {
  path: string;
  method: string;
  middlewares: Array<AppMiddleware>;
  handlerFn: HandlerFnAsync | HandlerFn | null;
};

type BuiltEndpointType = {
  base: string;
  handlers: Array<Handler>;
};

class Handler {
  result!: HandlerMetaType;

  constructor(path: string = "") {
    this.result = {
      path: path,
      method: "get",
      middlewares: [],
      handlerFn: null,
    };
  }

  /**
   * Use to add middleware to handler function
   * @param middeware
   * @returns
   */
  use(middeware: AppMiddleware): Handler {
    this.result.middlewares.push(middeware);
    return this;
  }

  /**
   * Use to add path for endpoint to this handler
   * @param p
   * @returns
   */
  path(p: string): Handler {
    this.result.path = p;
    return this;
  }

  /**
   * Use to add a get handler function and return the final result
   * @param handlerFn
   * @returns
   */
  get(handlerFn: HandlerFn | HandlerFnAsync): HandlerMetaType {
    if (this.result.handlerFn)
      throw new Error(`The handler of ${this.result.path} is set`);

    this.result.method = "get";
    this.result.handlerFn = function (req, res) {
      return ErrorUtils.handleJSONResponseError(this, req, res, handlerFn);
    };
    return this.result;
  }

  /**
   * Use to add a post handler function and return the final result
   * @param handlerFn
   * @returns
   */
  post(handlerFn: HandlerFn | HandlerFnAsync): HandlerMetaType {
    if (this.result.handlerFn)
      throw new Error(`The handler of ${this.result.path} is set`);

    this.result.method = "post";
    this.result.handlerFn = function (req, res) {
      return ErrorUtils.handleJSONResponseError(this, req, res, handlerFn);
    };
    return this.result;
  }

  /**
   * Use to add a put handler function and return the final result
   * @param handlerFn
   * @returns
   */
  put(handlerFn: HandlerFn | HandlerFnAsync): HandlerMetaType {
    if (this.result.handlerFn)
      throw new Error(`The handler of ${this.result.path} is set`);

    this.result.method = "put";
    this.result.handlerFn = function (req, res) {
      return ErrorUtils.handleJSONResponseError(this, req, res, handlerFn);
    };
    return this.result;
  }

  /**
   * Use to add a delete handler function and return the final result
   * @param handlerFn
   * @returns
   */
  delete(handlerFn: HandlerFn | HandlerFnAsync): HandlerMetaType {
    if (this.result.handlerFn)
      throw new Error(`The handler of ${this.result.path} is set`);

    this.result.method = "delete";
    this.result.handlerFn = function (req, res) {
      return ErrorUtils.handleJSONResponseError(this, req, res, handlerFn);
    };
    return this.result;
  }

  /**
   * Use to add a path handler function and return the final result
   * @param handlerFn
   * @returns
   */
  patch(handlerFn: HandlerFn | HandlerFnAsync): HandlerMetaType {
    if (this.result.handlerFn)
      throw new Error(`The handler of ${this.result.path} is set`);

    this.result.method = "patch";
    this.result.handlerFn = function (req, res) {
      return ErrorUtils.handleJSONResponseError(this, req, res, handlerFn);
    };
    return this.result;
  }

  /**
   * Use to get the final result
   */
  build() {
    return this.result;
  }
}

export class Endpoints {
  result!: BuiltEndpointType;

  constructor(base: string) {
    this.result = {
      base: base,
      handlers: [],
    };
  }

  /**
   * Use to create a handler
   * @returns
   */
  createHandler(path?: string): Handler {
    const _handler = new Handler(path);
    this.result.handlers.push(_handler);
    return _handler;
  }

  /**
   * Use to build Endpoints
   * @param appRouter
   * @param databaseModels
   */
  async build(appRouter: Router) {
    const _modules = [];

    for (const handler of this.result.handlers) {
      const fullPath = StringUtils.getPath(
        this.result.base,
        handler.result.path
      );

      // Build final path
      handler.path(fullPath);
      const handlerMeta = handler.build();

      (appRouter as any)[handlerMeta.method](
        handlerMeta.path,
        ...handlerMeta.middlewares,
        handlerMeta.handlerFn
      );

      _modules.push(handlerMeta);
    }

    console.table(_modules);
  }

  get [Symbol.toStringTag]() {
    return "Endpoints";
  }
}
