"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhotosModel = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _joi = _interopRequireDefault(require("joi"));
var _mongodb = require("mongodb");
var _mongodb2 = require("../config/mongodb");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// Define Photos collection
var photosCollectionName = 'photos';
var photosCollectionSchema = _joi["default"].object({
  place_photos_id: _joi["default"].string()["default"](null),
  photos: _joi["default"].array()["default"]([]),
  createdAt: _joi["default"].date().timestamp('javascript')["default"](Date.now),
  updatedAt: _joi["default"].date().timestamp()["default"](null)
});

// Phuong: Đây là những trường không được update (giá trị cố định không đổi)
var INVALID_UPDATE_FILEDS = ['_id', 'place_photos_id', 'createdAt'];

// Phuong: Tạo Schema để mongodb biết tạo bảng ntn
var validateSchema = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return photosCollectionSchema.validateAsync(data, {
            abortEarly: false
          });
        case 2:
          return _context.abrupt("return", _context.sent);
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function validateSchema(_x) {
    return _ref.apply(this, arguments);
  };
}();

// Phuong: Tìm dựa trên id của photos.
var findOneByPlaceId = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
    var result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return (0, _mongodb2.getDB)().collection(photosCollectionName)
          // Phuong: Bởi vì key _id trong mongodb đucợ luu ở dạng ObjectId nên phải
          // Phuong: chuyển qua ObjectId từ phía client đẩy lên mới tìm được
          .findOne({
            place_photos_id: id
          });
        case 3:
          result = _context2.sent;
          return _context2.abrupt("return", result);
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          throw new Error(_context2.t0);
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function findOneByPlaceId(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

// Phương: tạo mới photos
var createNew = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(data) {
    var validatedValue, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return validateSchema(data);
        case 3:
          validatedValue = _context3.sent;
          _context3.next = 6;
          return (0, _mongodb2.getDB)().collection(photosCollectionName).insertOne(validatedValue);
        case 6:
          result = _context3.sent;
          return _context3.abrupt("return", result);
        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          throw new Error(_context3.t0);
        case 13:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 10]]);
  }));
  return function createNew(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

// Phuong: Cập nhật photos thông qua _id
var update = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id, data) {
    var updateData, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          updateData = _objectSpread({}, data); // Phuong: CHỗ này là xóa những trường mà mình không cho phép update
          Object.keys(updateData).forEach(function (fieldName) {
            if (INVALID_UPDATE_FILEDS.includes(fieldName)) {
              delete updateData[fieldName];
            }
          });
          _context4.next = 5;
          return (0, _mongodb2.getDB)().collection(photosCollectionName).findOneAndUpdate(
          // Phuong: Phải chuyển _id ở client thành ObjectId
          {
            _id: new _mongodb.ObjectId(id)
          }, {
            $set: updateData
          }, {
            returnDocument: 'after'
          });
        case 5:
          result = _context4.sent;
          return _context4.abrupt("return", result.value);
        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          throw new Error(_context4.t0);
        case 12:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 9]]);
  }));
  return function update(_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}();
var PhotosModel = {
  photosCollectionName: photosCollectionName,
  createNew: createNew,
  update: update,
  findOneByPlaceId: findOneByPlaceId
};
exports.PhotosModel = PhotosModel;