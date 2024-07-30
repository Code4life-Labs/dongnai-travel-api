import { Module } from "src/classes/Module";

import { PlaceController } from "src/controllers/place.controller";

// Import types
import type { Databases } from "src/databases";
import type { Services } from "src/services";
import type { Middlewares } from "src/middlewares";

export class PlaceModule extends Module {
  constructor(dbs: Databases, serv: Services, midws: Middlewares) {
    super("/places", midws);
    this.controllers = {
      place: new PlaceController(dbs, serv, midws),
    };
  }
}
