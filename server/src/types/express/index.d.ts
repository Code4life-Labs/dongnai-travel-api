import type { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    locals?: any;
  }
}
