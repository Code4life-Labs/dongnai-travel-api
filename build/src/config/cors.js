"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.corsOptions = void 0;
var _constants = require("../utilities/constants");
var _environtment = require("./environtment");
var corsOptions = {
  origin: function origin(_origin, callback) {
    // Surport call API by software Postman on dev environtment
    // When using postman the origin return undefined value

    if (!_origin && _environtment.env.BUILD_MODE === 'dev') {
      return callback(null, true);
    }
    if (_constants.WHITELIST_DOMAINS.indexOf(_origin) !== -1) {
      return callback(null, true);
    }
    return callback(new Error("".concat(_origin, " not allowed by CORS.")));
  },
  optionsSuccessStatus: 200,
  credentials: true // CORS sẽ cho phép nhận cookies
};
exports.corsOptions = corsOptions;