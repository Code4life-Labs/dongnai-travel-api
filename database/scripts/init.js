// init.js

// Get env
let database = "DongNaiTravel";

// Create user
// db.createUser({
//   user: "root",
//   pwd: "letmein12345",
//   roles: [{ role: "root", db: database }],
// });

// Create or switch to database
instance = db.getSiblingDB(database);

// Create collections
instance.createCollection("Users");
instance.createCollection("UserRoles");
instance.createCollection("Follows");
instance.createCollection("Places");
instance.createCollection("Blogs");
instance.createCollection("PlaceTypes");
instance.createCollection("BlogTypes");
instance.createCollection("BlogComments");
instance.createCollection("BusinessStatuses");
instance.createCollection("PlaceReviews");
instance.createCollection("UserFavoritedPlaces");
instance.createCollection("UserFavoritedBlogs");
instance.createCollection("UserVisitedPlaces");
