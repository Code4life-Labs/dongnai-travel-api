// Import classes
import { Endpoints } from "src/classes/Endpoints";

// Import models
import db from "src/databases/dongnaitravel";

// Import helpers
import getBlog from "src/helpers/blogs/endpoints/get-blog";
import getBlogs from "src/helpers/blogs/endpoints/get-blogs";
import getBlogTypes from "src/helpers/blogs/endpoints/get-blog-types";
import getBlogComments from "src/helpers/blogs/endpoints/get-blog-comments";

// Import types
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";

const blogsEndpoints = new Endpoints("blogs");
let DNTModels: DongNaiTravelModelsType;

db().then((models) => {
  DNTModels = models;
});

// Add your handlers here
/**
 * Get blogs
 */
blogsEndpoints.createHandler("").get(async (req, res, o) => {
  return getBlogs(DNTModels, req, res, o);
});

/**
 * Get all types of blogs
 */
blogsEndpoints.createHandler("/types").get(async (req, res, o) => {
  return getBlogTypes(DNTModels, req, res, o);
});

/**
 * Get details of blog
 */
blogsEndpoints.createHandler("/:id").get(async (req, res, o) => {
  return getBlog(DNTModels, req, res, o);
});

/**
 * Delete blog
 */
blogsEndpoints.createHandler("/:id").delete(async (req, res, o) => {
  return getBlog(DNTModels, req, res, o);
});

/**
 * Get comments of blog
 */
blogsEndpoints.createHandler("/:id/comments").get(async (req, res, o) => {
  return getBlogComments(DNTModels, req, res, o);
});

export default blogsEndpoints;
