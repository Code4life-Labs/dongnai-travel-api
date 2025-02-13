export const PreMiddlewares = {
  /**
   * Use to get `lang` or `language` from options.
   * @param doc
   */
  findOneWithLanguage(doc: any, next: any) {
    console.log("Doc:", doc);
    if (doc && doc.options.lang) (doc as any)._lang = doc.options.lang;
    next();
  },
};
