// Import classes
import { Endpoints } from "src/classes/Endpoints";

// Import database
import db from "src/databases/dongnaitravel";

// Import helpers
import getBanners from "src/helpers/banners/endpoints/get-banners";
import getBanner from "src/helpers/banners/endpoints/get-banner";
import patchBanner from "src/helpers/banners/endpoints/patch-banner";

// Import services
import { AuthMiddlewares } from "src/services/auth/middlewares";
import { UploadMediaFileMiddlewares } from "src/services/upload-file/middlewares";

// Import types
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";

const bannersEndpoints = new Endpoints("banners");
let DNTModels: DongNaiTravelModelsType;

db().then((models) => {
  DNTModels = models;
});

// Add your handlers here
/**
 * Get banners
 */
bannersEndpoints.createHandler("").get(
  async (req, res, o) => {
    return getBanners(DNTModels, req, res, o);
  },
  function (error) {
    console.error("Error - Get banners:", error);
  }
);

/**
 * Get banner
 */
bannersEndpoints.createHandler("/:id").get(
  async (req, res, o) => {
    return getBanner(DNTModels, req, res, o);
  },
  function (error) {
    console.error("Error - Get banner:", error);
  }
);

/**
 * Create new banner
 */
bannersEndpoints
  .createHandler("/:id")
  .use(AuthMiddlewares.checkToken)
  .use(AuthMiddlewares.createPolicyChecker("banner", "banner:updateBanner"))
  .use(UploadMediaFileMiddlewares.preProcessUploadFiles)
  .use(UploadMediaFileMiddlewares.uploadOne("image"))
  .patch(
    async (req, res, o) => {
      return patchBanner(DNTModels, req, res, o);
    },
    function (error) {
      console.error("Error - Update banner:", error);
    }
  );

export default bannersEndpoints;
