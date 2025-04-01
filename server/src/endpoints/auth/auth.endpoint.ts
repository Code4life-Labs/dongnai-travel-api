import bcrypt from "bcrypt";

// Import classes
import { Endpoints } from "src/classes/Endpoints";

// Import models
import db from "src/databases/dongnaitravel";

// Import helpers
import signin from "src/helpers/auth/endpoints/post-sign-in";
import signup from "src/helpers/auth/endpoints/post-sign-up";
import signinAsAdmin from "src/helpers/auth/endpoints/post-admin-sign-in";
import resetPassword from "src/helpers/auth/endpoints/post-reset-password";
import getOTP from "src/helpers/auth/endpoints/get-otp";
import postOTP from "src/helpers/auth/endpoints/post-otp";

// Import types
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";

const authEndpoints = new Endpoints("auth");
let DNTModels: DongNaiTravelModelsType;

db().then((models) => {
  DNTModels = models;
});

const salt = 12;

// Add your handlers here
/**
 * Allow guest creates his/her account
 */
authEndpoints.createHandler("sign-up").post(async (req, res, o) => {
  return signup(DNTModels, req, res, o);
});

/**
 * Allow user signs in
 */
authEndpoints.createHandler("sign-in").post(
  async (req, res, o) => {
    return signin(DNTModels, req, res, o);
  },
  function (error) {
    console.error("Sign In Error:", error);
  }
);

/**
 * Allow admin user signs in
 */
authEndpoints.createHandler("admin/sign-in").post(
  async (req, res, o) => {
    return signinAsAdmin(DNTModels, req, res, o);
  },
  function (error) {
    console.error("Sign In Error:", error);
  }
);

/**
 * Allow user reset his/her password
 */
authEndpoints.createHandler("reset-password").patch(async (req, res, o) => {
  return resetPassword(DNTModels, req, res, o);
});

/**
 * Allow user gets otp to verify his/her account
 */
authEndpoints.createHandler("otp/:email").get(async (req, res, o) => {
  return getOTP(DNTModels, req, res, o);
});

/**
 * Allow user verifies his/her otp
 */
authEndpoints.createHandler("otp/:email").post(async (req, res, o) => {
  return postOTP(DNTModels, req, res, o);
});

export default authEndpoints;
