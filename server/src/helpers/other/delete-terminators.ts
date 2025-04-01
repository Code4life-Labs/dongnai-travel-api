import fs from "fs/promises";

/**
 * Use to delete all files (depend on metadat from Req.Files)
 * @param files
 * @returns
 */
export async function deleteAllFilesDependOnRequest(
  files:
    | {
        [fieldName: string]: Array<Express.Multer.File>;
      }
    | Array<Express.Multer.File>
) {
  const promises = [];

  if (Array.isArray(files)) {
    for (const file of files) {
      promises.push(fs.unlink(file.path));
    }
  } else {
    const keys = Object.keys(files);
    for (const key of keys) {
      for (const file of files[key]) {
        promises.push(fs.unlink(file.path));
      }
    }
  }

  await Promise.all(promises);
}
