export const PostMiddlewares = {
  /**
   * Use to get `lang` or `language` from options.
   * @param doc
   */
  findOneWithLanguage(doc: any, next: any) {
    if (doc && doc.options.lang) (doc as any)._lang = doc.options.lang;
    next();
  },
};
