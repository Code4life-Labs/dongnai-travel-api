import dotenv from "dotenv";

// Load all .env.*
dotenv.config({ path: [".env", `.env.${process.env.NODE_ENV}`] });

export const AppSettings = {
  PORT: process.env.EXPOSED_PORT,
  SERCURITY: {
    AUTH_PROVIDER: process.env.AUTH_PROVIDER,
    ALGORITHM: process.env.CRYPTOGRAPHY_ALGORITHM,
    KEY: process.env.CRYPTOGRAPHY_KEY,
    IV: process.env.CRYPTOGRAPHY_IV,
    RESOURCE_ACCESS_RIGHTS: {
      FULL: process.env.FULL_RIGHT,
      GET: process.env.GET_RIGHT,
      POST: process.env.POST_RIGHT,
      PUT: process.env.PUT_N_PATCH_RIGHT,
      PATCH: process.env.PUT_N_PATCH_RIGHT,
      DELETE: process.env.DELETE_RIGHT,
    },
    TOKEN: {
      ACCESS: {
        SIGNATURE: process.env.ACCESS_TOKEN_SIGNATURE,
        LIFE: process.env.ACCESS_TOKEN_LIFE,
      },

      REFRESH: {
        SIGNATURE: process.env.REFRESH_TOKEN_SIGNATURE,
        LIFE: process.env.REFRESH_TOKEN_LIFE,
      },

      OTP: {
        SIGNATURE: process.env.OTP_TOKEN_SIGNATURE,
        LIFE: process.env.OTP_TOKEN_LIFE,
      },
    },
  },
  /**
   * Each database has many differences in implementation, so the configuarations of each
   * database are different too.
   */
  /**
   * Settings for MongoDBs, including cluster settings, each cluster has many database...
   */
  MONGO: {
    MAIN: {
      DOMAIN: process.env.MONGO_MAIN_DOMAIN,
      USERNAME: process.env.MONGO_MAIN_USERNAME,
      PASSWORD: process.env.MONGO_MAIN_PASSWORD,
      /**
       * THIS PROPERTY MUST BE THE SAME IN VARIOUS TYPE OF DATABASE FOR CONSISTANCE
       */
      DBS: {
        dongnaitravelapp: {
          NAME: "dongnaitravelapp",
          OBJECTS: {
            MAPS: "maps",
            PHOTOS: "photos",
            REVIEWS: "reviews",
            USERS: "users",
            BLOGS: "blogs",
            BLOG_COMMENTS: "blog_comments",
            BLOG_CONTENT: "blog_content",
            CONTENT: "content",
          },
        },
      },
    },
  },

  SERVICES: {
    CLOUDINARY: {
      NAME: process.env.CLOUDINARY_CLOUD_NAME,
      API_KEY: process.env.CLOUDINARY_API_KEY,
      API_SECRET: process.env.CLOUDINARY_API_SECRET,
    },

    REDIS: {
      HOST: process.env.REDIS_HOST,
      PORT: process.env.REDIS_PORT,
      USERNAME: process.env.REDIS_USERNAME,
      PASSWORD: process.env.REDIS_PASSWORD,
    },

    GAPI_ROUTE: {
      ENDPOINTS: {
        COMPUTE_ROUTES: process.env.COMPUTE_ROUTES_ENDPOINT,
        COMPUTE_ROUTES_MATRIX: process.env.COMPUTE_ROUTES_MATRIX_ENDPOINT,
      },
    },

    GAPI_MAP: {
      API_KEY: process.env.GAPI_MAP_API_KEY,
      ENPOINTS: {
        PLACE_TEXT_SEARCH: process.env.PLACE_TEXT_SEARCH_BASE_URL,
        PLACE_DETAILS: process.env.PLACE_DETAILS_BASE_URL,
        PLACE_PHOTOS: process.env.PLACE_PHOTOS_BASE_URL,
        DIRECTION_GCP: process.env.DIRECTION_GCP_BASE_URL,
        GEOCODING: process.env.GEOCODING_ENDPOINT,
      },
    },

    GITHUB_FSN: {
      API_KEY: process.env.ORS_API_KEY,
    },

    CHATGPT: {
      API_KEY: process.env.CHATGPT_API_KEY,
    },

    WEARTHER: {
      ENDPOINT: process.env.OPEN_WEATHER_BASE_URL,
      API_KEY: process.env.OPEN_WEATHER_API_KEY,
    },

    OPENROUTESERVICE: {
      ENDPOINT: process.env.DIRECTION_ORS_ENDPOINT,
    },
  },
};
