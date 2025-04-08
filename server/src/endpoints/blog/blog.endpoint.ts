// Import classes
import { Endpoints } from "src/classes/Endpoints";

// Import database
import db from "src/databases/dongnaitravel";

// Import helpers
import checkBlogMetadata from "src/helpers/blogs/endpoints/check-blog-metadata";

// Import types
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";

const blogEndpoints = new Endpoints("blog");
let DNTModels: DongNaiTravelModelsType;

db().then((models) => {
  DNTModels = models;
});

// Add your handlers here
blogEndpoints.createHandler("/check").post((req, res, o) => {
  return checkBlogMetadata(DNTModels, req, res, o);
});

export default blogEndpoints;
