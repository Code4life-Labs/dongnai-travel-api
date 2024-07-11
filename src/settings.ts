import dotenv from "dotenv";

// Load all .env.*
dotenv.config({ path: [".env", `.env.${process.env.NODE_ENV}`] });

export const AppSettings = {
  PORT: process.env.PORT || "3000",
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
    }
  },
  /**
   * Each database has many differences in implementation, so the configuarations of each
   * database are different too.
   */
  /**
   * Settings for MongoDBs, including cluster settings, each cluster has many database...
   */
  MONGO: {
    SIMPLE_API: {
      DOMAIN: process.env.MONGO_MAIN_DOMAIN,
      USERNAME: process.env.MONGO_MAIN_USERNAME,
      PASSWORD: process.env.MONGO_MAIN_PASSWORD,
      /**
       * THIS PROPERTY MUST BE THE SAME IN VARIOUS TYPE OF DATABASE FOR CONSISTANCE
       */
      DBS: {
        BOOK: {
          NAME: "book",
          OBJECTS: {
            BOOK: "book",
            TYPE: "type",
            AUTHOR: "author"
          }
        },
        USER: {
          NAME: "user",
          OBJECTS: {
            USER: "user",
            ROLE: "role",
            TOKEN: "token"
          }
        }
      }
    }
  },

  /**
   * Settings for MySQL, including many cluster settings, clusters in mysql are configurated manually
   */
  MYSQL: {
    SIMPLE_API: {
      DOMAIN: process.env.MYSQL_MAIN_DOMAIN,
      USERNAME: process.env.MYSQL_MAIN_USERNAME,
      PASSWORD: process.env.MYSQL_MAIN_PASSWORD,
      /**
       * THIS PROPERTY MUST BE THE SAME IN VARIOUS TYPE OF DATABASE FOR CONSISTANCE
       */
      DB: {
        NAME: "TUNA_TEST",
        OBJECTS: {
          COURSES: "COURSES",
          TEACHERS: "TEACHERS"
        }
      }
    }
  }
}