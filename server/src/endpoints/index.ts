import path from "path";
import type { Router } from "express";

// Import classes
import { DirReader } from "src/classes/DirReader";

// Import configs
import AppConfig from "src/app.config.json";

// Get path of endpoints folder
const rootFolder = AppConfig.folders.endpoints;
const rootPath = path.resolve(`./src/${rootFolder}`);

const reader = new DirReader(AppConfig.unListedEndpointsDir);

export default async function (appRouter: Router) {
  const endpointsFilePaths = await reader.getAllPathsToFiles(rootPath);

  for (const endpointsFilePath of endpointsFilePaths) {
    const endpointsDefault = require(endpointsFilePath);

    if (!endpointsDefault.default)
      throw new Error("Endpoint should be exported as default.");

    const endpoints = endpointsDefault.default;

    // Build
    endpoints.build(appRouter);
  }
}
