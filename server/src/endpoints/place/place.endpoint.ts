// Import classes
import { Endpoints } from "src/classes/Endpoints";

// Import database
import db from "src/databases/dongnaitravel";

// Import helpers
import postPlace from "src/helpers/users/endpoints/post-place";

// Import services
import { AuthMiddlewares } from "src/services/auth/middlewares";
import { UploadMediaFileMiddlewares } from "src/services/upload-file/middlewares";

// Import types
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";

const placeEndpoints = new Endpoints("place");
let DNTModels: DongNaiTravelModelsType;

db().then((models) => {
  DNTModels = models;
});

// Add your handlers here
/**
 * Create new place
 */
placeEndpoints
  .createHandler("")
  .use(AuthMiddlewares.checkToken)
  .use(AuthMiddlewares.createPolicyChecker("place", "place:createPlace"))
  .use(UploadMediaFileMiddlewares.preProcessUploadFiles)
  .use(
    UploadMediaFileMiddlewares.uploadMultiplyByFields([
      { name: "photos", maxCount: 20 },
    ])
  )
  .post(
    async (req, res, o) => {
      return postPlace(DNTModels, req, res, o);
    },
    function (error) {
      console.error("Error - Create new place:", error);
    }
  );

export default placeEndpoints;
