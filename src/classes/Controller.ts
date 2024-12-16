/**
 * Classes in this file are used for inheritance.
 */
import { Base } from "./Base";

// Import settings
import { AuthSettings } from "src/auth.settings";

// Import types
import type { Request, Response, NextFunction } from "express";
import type { Databases } from "src/databases";
import type { Services } from "src/services";
import type { Middlewares } from "src/middlewares";

export type HandlerFunction = (
  req: Request,
  res: Response,
  next?: NextFunction
) => any;
export type MiddlewareFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => any;

/**
 * A handlers manager
 */
export class Controller extends Base {
  static ReservedMethods = ["constructor", "buildWithMiddlewares"];

  protected dbs!: Databases;
  protected serv!: Services;
  protected midws!: Middlewares;
  withMiddlewares!: Map<string, Array<MiddlewareFunction | HandlerFunction>>;

  constructor(dbs: Databases, serv: Services, midws: Middlewares) {
    super();
    this.dbs = dbs;
    this.serv = serv;
    this.midws = midws;
    this.withMiddlewares = new Map();

    // Bind all methods
    // Methods will be removed after server is built completely.
    this.utils.object.bindClassInstance(this, {
      reservedMethods: Controller.ReservedMethods,
    });
  }

  /**
   * Use this method to build a handler with middlewares. By default, handler will be build standalone,
   * when use this method, all middlewares will be arranged before the handler.
   * @param name
   * @param middlewares
   * @returns
   */
  buildWithMiddlewares(
    name: string,
    ...middlewares: Array<MiddlewareFunction | HandlerFunction>
  ) {
    if (!(this as any)[name]) {
      console.log(`Handler [${name}] doesn't exist`);
      return;
    }

    middlewares.push((this as any)[name]);

    this.withMiddlewares.set(name, middlewares);

    delete Object.getPrototypeOf(this)[name];
  }

  get [Symbol.toStringTag]() {
    return "Controller";
  }
}
