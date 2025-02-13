// Import classes
import { Endpoints } from "src/classes/Endpoints";

// Import models
import db from "src/databases/dongnaitravel";

// Import utils
import { RequestUtils } from "src/utils/request";

// Import helpers
import {
  buildBlogProjection,
  buildBriefProjection,
} from "src/helpers/blogs/projections";
import {
  buildBlogTypeFilter,
  buildBlogNameFilter,
} from "src/helpers/blogs/to-filter";
import { computeStateOfBlog } from "src/helpers/blogs/states-computer";

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

  // Process query
  const { userId } = req.query as any;

  // Get blogs from database
  let query = DNTModes.Blogs.find({}).skip(skip).limit(limit);

  // Build filters & projections
  [buildBlogTypeFilter, buildBlogNameFilter, buildBriefProjection].forEach(
    (fn) => fn(query, req)
  );

  const blogs = await query.exec();

  // Return blogs
  return blogs.map((blog) => computeStateOfBlog(blog.toJSON(), userId));
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
  if (!req.params.id) {
    o.code = 400;
    throw new Error("Id of blog is required");
  }

  // Process query
  const { userId } = req.query as any;

  // Get blog from database
  let query = DNTModes.Blogs.findOne({ _id: req.params.id });

  // Build populations
  buildBlogProjection(query);

  const blog = await query.exec();

  // Return blog
  return computeStateOfBlog(blog.toJSON(), userId);
});

export default blogsEndpoints;
