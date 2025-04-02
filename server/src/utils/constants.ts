export const DEFAULT_LANGUAGE = "vi";
export const REVIEW_COMMENT_CHARACTER_LIMITS = [15, 500];
export const MIN_MAX_RATING = [0, 5];
export const PASSWORD_SALT = 12;

// User Data
export const FIRSTNAME_CHARACTER_LIMITS = [3, 15];
export const LASTNAME_CHARACTER_LIMITS = [4, 30];
export const USERNAME_CHARACTER_LIMITS = [6, 30];
export const PASSWORD_CHARACTER_LIMITS = [6, 30];

// Report data
export const REPORT_DESCRIPTION_LIMITS = [0, 500];

// Blog Data
export const BLOG_NAME_LIMITS = [3, 64];

// Banner Data
export const MAX_BANNER_COUNT = 12;
export const BANNER_BRANDNAME_LIMITS = [3, 64];
export const BANNER_TITLE_LIMITS = [3, 120];

// Upload file
export const MEDIA_FILE_SIZE_LIMIT = 5242880; // byte = 5 Mb
export const ALLOW_MEDIA_FILE_TYPES = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/gif",
];
