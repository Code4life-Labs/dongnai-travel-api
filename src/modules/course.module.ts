import { Module } from "src/classes/Module";

import { CourseController } from "src/controllers/course.controller";

// Import types
import type { Databases } from "src/databases";
import type { Services } from "src/services";
import type { Middlewares } from "src/middlewares";

export class CourseModule extends Module {
  constructor(dbs: Databases, serv: Services, midws: Middlewares) {
    super("/courses", midws);
    this.controllers = {
      course: new CourseController(dbs, serv, midws)
    };
  }
}