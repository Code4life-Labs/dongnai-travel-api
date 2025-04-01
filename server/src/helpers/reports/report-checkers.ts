// Import validators
import {
  ReportCreateValidator,
  ReportUpdateValidator,
} from "src/services/validators/report";

// Import types
import type { HTTPResponseDataType } from "src/utils/http";

export function checkReportWhenCreate(data: any, o: HTTPResponseDataType) {
  const validationResult = ReportCreateValidator.validate(data);
  if (validationResult.error) {
    o!.code = 400;
    throw new Error(validationResult.error.message);
  }

  return validationResult.value;
}

export function checkReportWhenUpdate(data: any, o: HTTPResponseDataType) {
  const validationResult = ReportUpdateValidator.validate(data);
  if (validationResult.error) {
    o!.code = 400;
    throw new Error(validationResult.error.message);
  }

  return validationResult.value;
}
