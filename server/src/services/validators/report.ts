import Joi from "joi";
import mongoose from "mongoose";
import { REPORT_DESCRIPTION_LIMITS } from "src/utils/constants";

const _BaseStringdValidator = (fieldName = "id") =>
  Joi.string().messages({
    "any.invalid": `"${fieldName}" must be a string`,
    "string.base": `"${fieldName}" should be a type of 'text'`,
    "string.empty": `"${fieldName}" cannot be empty`,
  });

const _BaseItemTypeValidator = Joi.string()
  .valid("Places", "Blogs", "Users")
  .messages({
    "any.only": `"itemType" must be one of ['Places', 'Blogs', 'Users']`,
    "string.empty": `"itemType" cannot be empty`,
    "string.base": `"itemType" should be a type of 'text'`,
  });

const _BaseReportDescriptionValidator = Joi.string()
  .max(REPORT_DESCRIPTION_LIMITS[1])
  .messages({
    "string.base": `"description" should be a type of 'text'`,
    "string.max": `"description" should have a maximum length of {#limit}`,
  });

export const ReportCreateValidator = Joi.object({
  reporterId: _BaseStringdValidator("reporterId"),
  reportedItem: Joi.object({
    item: _BaseStringdValidator("itemId").required(),
    itemType: _BaseItemTypeValidator.required(),
  }).required(),
  reasonId: _BaseStringdValidator("reasonId").required(),
  description: _BaseReportDescriptionValidator,
});

export const ReportUpdateValidator = Joi.object({
  reasonId: _BaseStringdValidator("reasonId"),
  description: _BaseReportDescriptionValidator,
  statusId: _BaseStringdValidator("statusId"),
});
