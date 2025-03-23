// Import classes
import { Endpoints } from "src/classes/Endpoints";

// Import database
import db from "src/databases/dongnaitravel";

// Import helpers
import postBanner from "src/helpers/banners/endpoints/post-banner";
import { deleteAllFilesDependOnRequest } from "src/helpers/other/delete-terminators";

// Import services
import { AuthMiddlewares } from "src/services/auth/middlewares";
import { UploadMediaFileMiddlewares } from "src/services/upload-file/middlewares";

// Import types
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";

const bannerEndpoints = new Endpoints("banner");
let DNTModels: DongNaiTravelModelsType;

db().then((models) => {
  DNTModels = models;
});

// Add your handlers here
/**
 * Create new banner
 */
bannerEndpoints
  .createHandler("")
  .use(AuthMiddlewares.checkToken)
  .use(AuthMiddlewares.createPolicyChecker("banner", "banner:createBanner"))
  .use(UploadMediaFileMiddlewares.preProcessUploadFiles)
  .use(UploadMediaFileMiddlewares.uploadOne("newImage"))
  .post(
    async (req, res, o) => {
      return postBanner(DNTModels, req, res, o);
    },
    function (error, o, req) {
      console.error("Error - Create new banner:", error);
      if (req.files) deleteAllFilesDependOnRequest(req.files);
    }
  );

export default bannerEndpoints;
