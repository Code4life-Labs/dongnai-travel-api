// Import classes
import { Endpoints } from "src/classes/Endpoints";

// Import database
import db from "src/databases/dongnaitravel";

// Import helpers
import postBanner from "src/helpers/banners/endpoints/post-banner";

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
  .use(UploadMediaFileMiddlewares.uploadOne("image"))
  .post(
    async (req, res, o) => {
      return postBanner(DNTModels, req, res, o);
    },
    function (error) {
      console.error("Error - Create new banner:", error);
    }
  );

export default bannerEndpoints;
