import Joi from "joi";

// Define base validators
const _BaseIdValidator = Joi.string().messages({
  "string.base": `"_id" should be a type of 'text'`,
  "string.empty": `"_id" cannot be empty`,
});

const _BaseTypeIdsValidator = Joi.array()
  .items(
    Joi.string().messages({
      "string.base": `"typeId" should be a type of 'text'`,
      "string.empty": `"typeId" cannot be empty`,
    })
  )
  .messages({
    "array.base": `"typeIds" should be an array of 'text'`,
  });

const _BasePlaceIdValidator = Joi.string().messages({
  "string.base": `"placeId" should be a type of 'text'`,
  "string.empty": `"placeId" cannot be empty`,
});

const _BaseAddressComponentsValidator = Joi.array()
  .items(Joi.object())
  .messages({
    "array.base": `"addressComponents" should be an array of objects`,
  });

const _BaseGeometryValidator = Joi.object().messages({
  "object.base": `"geometry" should be an object`,
});

const _BaseContentValidator = Joi.object({
  vi: Joi.string().messages({
    "string.base": `"vi" should be a type of 'text'`,
    "string.empty": `"vi" cannot be empty`,
  }),
  en: Joi.string().messages({
    "string.base": `"vi" should be a type of 'text'`,
    "string.empty": `"vi" cannot be empty`,
  })
});

const _BasePhoneNumberValidator = Joi.string().messages({
  "string.base": `"phoneNumber" should be a type of 'text'`,
});

const _BaseNameValidator = Joi.string().messages({
  "string.base": `"name" should be a type of 'text'`,
  "string.empty": `"name" cannot be empty`,
});

const _BasePlusCodeValidator = Joi.object().messages({
  "object.base": `"plusCode" should be an object`,
});

const _BaseOpenHoursValidator = Joi.array().items(Joi.object()).messages({
  "array.base": `"openHours" should be an array of objects`,
});

const _BaseUrlValidator = Joi.string().uri().messages({
  "string.base": `"url" should be a type of 'text'`,
  "string.uri": `"url" should be a valid URI`,
});

const _BasePhotosValidator = Joi.array()
  .items(
    Joi.string().uri().messages({
      "string.base": `"photo" should be a type of 'text'`,
      "string.uri": `"photo" should be a valid URI`,
    })
  )
  .messages({
    "array.base": `"photos" should be an array of valid image URLs`,
  });

const _BaseWebsiteValidator = Joi.string().uri().messages({
  "string.base": `"website" should be a type of 'text'`,
  "string.uri": `"website" should be a valid URI`,
});

const _BaseIsRecommendedValidator = Joi.boolean().messages({
  "boolean.base": `"isRecommended" should be a boolean`,
});

const _BaseCreatedAtValidator = Joi.number().messages({
  "number.base": `"createdAt" should be a timestamp (number)`,
});

const _BaseUpdatedAtValidator = Joi.number().messages({
  "number.base": `"updatedAt" should be a timestamp (number)`,
});

// Create Place Validator
export const PlaceCreateValidator = Joi.object({
  typeIds: _BaseTypeIdsValidator.required(),
  placeId: _BasePlaceIdValidator.required(),
  addressComponents: _BaseAddressComponentsValidator,
  geometry: _BaseGeometryValidator,
  content: _BaseContentValidator,
  phoneNumber: _BasePhoneNumberValidator,
  name: _BaseNameValidator.required(),
  plusCode: _BasePlusCodeValidator,
  openHours: _BaseOpenHoursValidator,
  url: _BaseUrlValidator,
  photos: _BasePhotosValidator,
  website: _BaseWebsiteValidator,
  isRecommended: _BaseIsRecommendedValidator,
  createdAt: _BaseCreatedAtValidator,
  updatedAt: _BaseUpdatedAtValidator,
});

// Update Place Validator
export const PlaceUpdateValidator = Joi.object({
  _id: _BaseIdValidator.required(),
  typeIds: _BaseTypeIdsValidator,
  placeId: _BasePlaceIdValidator,
  addressComponents: _BaseAddressComponentsValidator,
  geometry: _BaseGeometryValidator,
  content: _BaseContentValidator,
  phoneNumber: _BasePhoneNumberValidator,
  name: _BaseNameValidator,
  plusCode: _BasePlusCodeValidator,
  openHours: _BaseOpenHoursValidator,
  url: _BaseUrlValidator,
  deletedPhotos: _BasePhotosValidator,
  website: _BaseWebsiteValidator,
  isRecommended: _BaseIsRecommendedValidator,
  updatedAt: _BaseUpdatedAtValidator,
});
