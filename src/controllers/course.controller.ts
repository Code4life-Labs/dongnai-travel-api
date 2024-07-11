// Import classes
import { Controller } from "../classes/Controller";

// Import types
import type { Request, Response } from "express";
import type { Databases } from "src/databases";
import type { Services } from "src/services";
import type { Middlewares } from "src/middlewares";
import type {
  MySQL_CoursesQuery,
  MySQL_TeachersQuery,
  MySQL_CourseResponseData,
  MySQL_Teacher,
  MySQL_CoursesParams,
  MySQL_TeachersParams
} from "src/databases/mysql/index.types";

export class CourseController extends Controller {
  constructor(dbs: Databases, serv: Services, midws: Middlewares) {
    super(dbs, serv, midws);
  }

  async ["get::"](req: Request, res: Response) {
    return await this.handleResponseError<MySQL_CourseResponseData[], this>(this, res, async function(o) {
      let query = req.query as MySQL_CoursesQuery;
      let result = await this.dbs.mysql.course.queryMultiply(query);
      
      if(!result.code) throw new Error(result.message!);
      
      o.data = result.data;
      o.success!.message = result.message!;

      return o;
    });
  }

  async ["get::/teachers"](req: Request, res: Response) {
    return await this.handleResponseError<MySQL_Teacher[], this>(this, res, async function(o) {
      let query = req.query as MySQL_TeachersQuery;
      let result = await this.dbs.mysql.teacher.queryMultiply(query);
      
      if(!result.code) throw new Error(result.message!);
      
      o.data = result.data;
      o.success!.message = result.message!;

      return o;
    });
  }

  async ["get::/:id"](req: Request, res: Response) {
    return await this.handleResponseError<MySQL_CourseResponseData, this>(this, res, async function(o) {
      let params = req.params as MySQL_CoursesParams;
      let result = await this.dbs.mysql.course.query(params);
      
      if(!result.code) throw new Error(result.message!);
      
      o.data = result.data;
      o.success!.message = result.message!;

      return o;
    });
  }

  async ["get::/teachers/:id"](req: Request, res: Response) {
    return await this.handleResponseError<MySQL_Teacher, this>(this, res, async function(o) {
      let params = req.params as MySQL_TeachersParams;
      let result = await this.dbs.mysql.teacher.query(params);
      
      if(!result.code) throw new Error(result.message!);
      
      o.data = result.data;
      o.success!.message = result.message!;

      return o;
    });
  }
}