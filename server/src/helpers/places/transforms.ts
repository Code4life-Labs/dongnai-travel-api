/**
 * Use to transform place's content with language.
 * @param jsonDoc
 * @param lang
 */
export function transformPlaceContentWithLanguage(jsonDoc: any, lang: string) {
  if (lang !== "all") jsonDoc.content = jsonDoc.content[lang];
  return jsonDoc;
}
