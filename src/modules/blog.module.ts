import { Module } from "src/classes/Module";

import { BlogController } from "src/controllers/blog.controller";

// Import types
import type { Databases } from "src/databases";
import type { Services } from "src/services";
import type { Middlewares } from "src/middlewares";

export class BlogModule extends Module {
  constructor(dbs: Databases, serv: Services, midws: Middlewares) {
    super("/blogs", midws);
    this.controllers = {
      blog: new BlogController(dbs, serv, midws),
    };
  }
}
