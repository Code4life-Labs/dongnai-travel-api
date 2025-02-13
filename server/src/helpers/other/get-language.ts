// Import utils
import { DEFAULT_LANGUAGE } from "src/utils/constants";

/**
 * Use to get language code from Request Query
 * @param req
 */
export function getLanguageFromQuery(req: any) {
  return req.query.lang || req.query.language || DEFAULT_LANGUAGE;
}
