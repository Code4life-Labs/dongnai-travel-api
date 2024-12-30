import express from "express";
import http from "http";
import cors from "cors";

// Use module-alias
import "module-alias/register";

// Import config
import AppConfig from "src/app.config.json";

// Import models
import identity from "./databases/identity";

// Import endpoints
import buildEndpoints from "src/endpoints";

const app = express();
const router = express.Router();

// Add global middleware
app.use(
  cors({
    origin: AppConfig.origins,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply router
app.use(router);

async function main() {
  // Setup server instance
  const instance = http.createServer(app);

  // Build endpoints
  await buildEndpoints(router);

  // Start listen
  instance.listen(AppConfig.port, AppConfig.hostname, () => {
    console.log(
      `You server is listening on http://${AppConfig.hostname}:${AppConfig.port}`
    );
  });
}

main();
