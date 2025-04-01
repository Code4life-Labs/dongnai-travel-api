export const MARKDOWN_REGEX_AS_STR = {
  BOLD: "(?:(?:\\*\\*)|(?:__))([^\\*_\\s]+[^\\*]+[^\\*\\s]+|[^\\*_\\s]+)(?:(?:\\*\\*)|(?:__))",
  ITALIC:
    "(?:(?:\\*)|(?:_))([^\\*_\\s]+[^\\*]+[^\\*\\s]+|[^\\*_\\s]+)(?:(?:\\*)|(?:_))",
  UNDERLINE: "~([^~\\s]+[^~]+[^~\\s]+|[^~\\s]+)~",
  LINETHROUGH: "~~([^~\\s]+[^~]+[^~\\s]+|[^~\\s]+)~~",
  HIGHLIGHT: "==([^=\\s]+[^=]+[^=\\s]+|[^=\\s]+)==",
  UNORDERED_LIST: "^-\\s(.+)$",
  ORDERED_LIST: "^[\\d\\w]+\\.\\s(.+)$",
  HEADING_0: "^#\\s(.*?)$",
  HEADING_1: "^##\\s(.*?)$",
  HEADING_2: "^###\\s(.*?)$",
  HEADING_3: "^####\\s(.*?)$",
  HEADING_4: "^#####\\s(.*?)$",
  HEADING_5: "^######\\s(.*?)$",
  IMAGE: "!\\[.*?\\]\\((.*?)\\)",
  LINK: "\\[.*?\\]\\((.*?)\\)",
};

const keys = Object.keys(MARKDOWN_REGEX_AS_STR);
const MD = {};

for (let key of keys) {
  (MD as any)[key] = {
    DEFAULT: new RegExp((MARKDOWN_REGEX_AS_STR as any)[key]),
    G: new RegExp((MARKDOWN_REGEX_AS_STR as any)[key], "g"),
    I: new RegExp((MARKDOWN_REGEX_AS_STR as any)[key], "i"),
    M: new RegExp((MARKDOWN_REGEX_AS_STR as any)[key], "m"),
    GM: new RegExp((MARKDOWN_REGEX_AS_STR as any)[key], "gm"),
  };
}

/**
 * Use to get plain text from markdown
 * @param md
 * @returns
 */
export function removeMDFromString(md: string) {
  if (!md) return "";
  let keys = Object.keys(MD);

  while ((MD as any)["IMAGE"].DEFAULT.test(md)) {
    if ((MD as any)["IMAGE"].DEFAULT.test(md))
      md = md.replace((MD as any)["IMAGE"].DEFAULT, "");
  }

  while ((MD as any)["LINK"].DEFAULT.test(md)) {
    if ((MD as any)["LINK"].DEFAULT.test(md))
      md = md.replace((MD as any)["LINK"].DEFAULT, "");
  }

  for (let key of keys) {
    md = md.replaceAll((MD as any)[key].GM, (match, capture) => {
      if (key !== "IMAGE" && key !== "LINK") return capture;
    });
  }
  return md.trim();
}
