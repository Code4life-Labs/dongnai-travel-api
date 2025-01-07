// Import classes
import { Endpoints } from "src/classes/Endpoints";

// Import models
import db from "src/databases/dongnaitravel";

// Import utils
import { RequestUtils } from "src/utils/request";

// Import helpers
import { buildBlogPopulation } from "src/helpers/blogs/populations";
import {
  buildBlogTypeFilter,
  buildBlogNameFilter,
} from "src/helpers/blogs/to-filter";

// Import types
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";

const blogsEndpoints = new Endpoints("blogs");
let DNTModes: DongNaiTravelModelsType;

db().then((models) => {
  DNTModes = models;
});

// Add your handlers here
blogsEndpoints.createHandler("").get(async (req, res) => {
  // Get `limit` and `skip` from request
  const { limit, skip } = RequestUtils.getLimitNSkip(req);

  // Get blogs from database
  let query = DNTModes.Places.find({}).skip(skip).limit(limit);

  // Build filters
  [buildBlogTypeFilter, buildBlogNameFilter].forEach((fn) => fn(query, req));

  const blogs = await query.exec();

  // Compute user's state

  // Return blogs
  return blogs;
});

/**
 * Get all types of blogs
 */
blogsEndpoints.createHandler("/types").get(async (req, res, o) => {
  // Get blog from database
  let query = DNTModes.BlogTypes.find();

  const blog = await query.exec();

  // Return blogs
  return blog;
});

/**
 * Get details of blog
 */
blogsEndpoints.createHandler("/:id").get(async (req, res, o) => {
  if (req.params.id) {
    o.code = 400;
    throw new Error("Id of blog is required");
  }

  // Get blog from database
  let query = DNTModes.Blogs.findOne({ _id: req.params.id });

  // Build populations
  buildBlogPopulation(query);

  const blog = await query.exec();

  // Compute user's state

  // Return blogs
  return blog;
});

export default blogsEndpoints;
