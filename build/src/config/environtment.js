"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.env = void 0;
require('dotenv').config();
var env = {
  MONGODB_URI: process.env.MONGODB_URI,
  DATABASE_NAME: process.env.DATABASE_NAME,
  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT,
  BUILD_MODE: process.env.BUILD_MODE,
  SENDINBLUE_API_KEY: process.env.SENDINBLUE_API_KEY,
  ACCESS_TOKEN_SECRET_SIGNATURE: process.env.ACCESS_TOKEN_SECRET_SIGNATURE,
  ACCESS_TOKEN_SECRET_LIFE: process.env.ACCESS_TOKEN_SECRET_LIFE,
  REFRESH_TOKEN_SECRET_SIGNATURE: process.env.REFRESH_TOKEN_SECRET_SIGNATURE,
  REFRESH_TOKEN_SECRET_LIFE: process.env.REFRESH_TOKEN_SECRET_LIFE,
  OTP_TOKEN_SECRET_SIGNATURE: process.env.OTP_TOKEN_SECRET_SIGNATURE,
  OTP_TOKEN_SECRET_LIFE: process.env.OTP_TOKEN_SECRET_LIFE,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_USERNAME: process.env.REDIS_USERNAME,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  SLACK_HOST: process.env.SLACK_HOST,
  MAP_API_KEY: process.env.MAP_API_KEY,
  ORS_API_KEY1: process.env.ORS_API_KEY1,
  CHATGPT_API_KEY: process.env.CHATGPT_API_KEY,
  OPEN_WEATHER_BASE_URL: process.env.OPEN_WEATHER_BASE_URL,
  OPEN_WEATHER_API_KEY: process.env.OPEN_WEATHER_API_KEY,
  PLACE_TEXT_SEARCH_BASE_URL: process.env.PLACE_TEXT_SEARCH_BASE_URL,
  PLACE_DETAILS_BASE_URL: process.env.PLACE_DETAILS_BASE_URL,
  PLACE_PHOTOS_BASE_URL: process.env.PLACE_PHOTOS_BASE_URL,
  DIRECTION_GCP_BASE_URL: process.env.DIRECTION_GCP_BASE_URL,
  DIRECTION_ORS_BASE_URL: process.env.DIRECTION_ORS_BASE_URL,
  COMPUTE_ROUTES_BASE_URL: process.env.COMPUTE_ROUTES_BASE_URL,
  COMPUTE_ROUTES_MATRIX_BASE_URL: process.env.COMPUTE_ROUTES_MATRIX_BASE_URL,
  GEOCODING_BASE_URL: process.env.GEOCODING_BASE_URL,
  LANGUAGE_CODE_DEFAULT: process.env.LANGUAGE_CODE_DEFAULT,
  RADIUS_DEFAULT: process.env.RADIUS_DEFAULT,
  WIDTH_PHOTO_DEFAULT: process.env.WIDTH_PHOTO_DEFAULT,
  RANKBY_DISTANCE: process.env.RANKBY_DISTANCE,
  RANKBY_PROMINENCE: process.env.RANKBY_PROMINENCE,
  PLACE_PHOTOS_API: process.env.PLACE_PHOTOS_API,
  PLACE_TYPES_API: process.env.PLACE_TYPES_API,
  PLACE_REVIEWS_API: process.env.PLACE_REVIEWS_API
};
exports.env = env;