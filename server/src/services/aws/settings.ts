import fs from "fs";

// Import utils
import { StringUtils } from "src/utils/string";

type AWSAccessKey = {
  KeyId: string;
  SecretKey: string;
};

const FILENAME = "key.json";
const FOLDERNAME = "aws-credentials";
const AWSSettings = {
  AccessKey: null as unknown as AWSAccessKey,
};

export function getAWSSettings() {
  // Load access key
  if (AWSSettings.AccessKey === null) {
    const accessKey = JSON.parse(
      fs
        .readFileSync(StringUtils.getRootDirTo("secrets", FOLDERNAME, FILENAME))
        .toString()
    );

    AWSSettings.AccessKey = {
      KeyId: accessKey.ACCESS_KEY_ID,
      SecretKey: accessKey.SECRET_KEY,
    };
  }

  return AWSSettings;
}
