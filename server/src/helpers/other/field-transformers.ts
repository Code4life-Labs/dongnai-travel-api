/**
 * Use to transform array of excluded fields to string.
 */
export function transformExcludedFieldsToStr(fields: Array<string>) {
  return fields.map((fields) => `-${fields}`).join(" ");
}

/**
 * Use to transform array of excluded fields (from field to -field).
 */
export function transformExcludedFields(fields: Array<string>) {
  return fields.map((fields) => `-${fields}`).join(" ");
}
