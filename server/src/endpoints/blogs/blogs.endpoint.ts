// Import classes
import { Endpoints } from "src/classes/Endpoints";

// Import models
import db from "src/databases/dongnaitravel";

// Import helpers
import getBlog from "src/helpers/blogs/endpoints/getBlog";
import getBlogs from "src/helpers/blogs/endpoints/getBlogs";
import getBlogTypes from "src/helpers/blogs/endpoints/getBlogTypes";

// Import types
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";

const blogsEndpoints = new Endpoints("blogs");
let DNTModes: DongNaiTravelModelsType;

db().then((models) => {
  DNTModes = models;
});

// Add your handlers here
/**
 * Get blogs
 */
blogsEndpoints.createHandler("").get(async (req, res, o) => {
  return getBlogs(DNTModes, req, res, o);
});

/**
 * Get all types of blogs
 */
blogsEndpoints.createHandler("/types").get(async (req, res, o) => {
  return getBlogTypes(DNTModes, req, res, o);
});

/**
 * Get details of blog
 */
blogsEndpoints.createHandler("/:id").get(async (req, res, o) => {
  return getBlog(DNTModes, req, res, o);
});

/**
 * Delete blog
 */
blogsEndpoints.createHandler("/:id").delete(async (req, res, o) => {
  return getBlog(DNTModes, req, res, o);
});

export default blogsEndpoints;
