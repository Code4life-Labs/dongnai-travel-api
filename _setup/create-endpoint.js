// Use to create Restful or HTTP Endpoint
// Note: This script is suitable for first initialization.

const fs = require("fs");
const path = require("path");

// Import utils
const { getSrcPath, parseArgs } = require("./utils");

const endpointTemplateName = "endpoint.template";

const placeHolders = {
  rootEndpoint: "[ROOT_ENDPOINT_NAME]",
  endpoints: "[ENDPOINTS]",
  endpoint: "[ENDPOINT]",
  method: "[METHOD]",
};
const [n, f, ...args] = process.argv;

const supportedArgs = [
  {
    value: "--app",
    description: "Define the application",
    example: "--app=task-service",
  },
  {
    value: "-a",
    description: "Define the application",
    example: "-a task-service",
  },
  {
    value: "--root",
    description:
      "Define the root of endpoint and name of folder, you can just create 1 root endpoint!",
    example: "--root=user",
  },
  {
    value: "-r",
    description:
      "Define the root of endpoint and name of folder, you can just create 1 root endpoint!",
    example: "-r user",
  },
  {
    value: "--endpoint",
    description:
      "Define the name of endpoint, separated by ;. It's defined by [method]<name-of-endpoint>.",
    example: "--endpoint=[post]:id;:id",
  },
  {
    value: "-e",
    description:
      "Define the name of endpoint, separated by ;. It's defined by [method]<name-of-endpoint>.",
    example: "-e [post]:id -e :id",
  },
];

const parsedArgs = parseArgs(args, supportedArgs);
if (parsedArgs.length === 0) process.exit(0);

const applicationArg = parsedArgs.find(
  (parsedArg) => parsedArg.name === "--app" || parsedArg.name === "-a"
);
const srcPath = getSrcPath(applicationArg.value);
const templatePath = path.resolve(".", "_templates");
const targetPath = path.resolve(applicationArg.value, srcPath, "endpoints");

console.log("Generating your requested endpoints...");

let isEndpointProcessed = false;
let rootEndpointIndex = -1;
let rootEndpointTemplate = fs
  .readFileSync(path.resolve(templatePath, endpointTemplateName))
  .toString();
let endpointTargetTempate = `[ROOT_ENDPOINT_NAME]Endpoints.createHandler("[ENDPOINT]").[METHOD]((req, res) => {
  return {
    users: [],
    text: "Hello world"
  };
});
`;
let endpointsTemplate = "";
let endpointRegex = /^\[(get|post|put|patch|delete)\]([a-zA-Z\-:\/]+)$/;

parsedArgs.forEach((parsedArg, index) => {
  // Store the index of root endpoint value and arg
  if (
    parsedArg.name === "-r" ||
    (parsedArg.name === "--root" && !isEndpointProcessed)
  ) {
    rootEndpointIndex = index;
  }

  // Check the --endpoint or -e
  if (parsedArg.name === "--endpoint" || parsedArg.name === "-e") {
    const match = parsedArg.value.match(endpointRegex);
    if (!match) throw new Error(`The arg value ${parsedArg.value} is invalid`);
    const method = match[1];
    const endpoint = match[2];

    // Replace
    let clone = endpointTargetTempate;
    clone = clone.replaceAll(placeHolders.method, method);
    clone = clone.replaceAll(placeHolders.endpoint, endpoint);

    endpointsTemplate += clone + "\n";
  }
});

if (rootEndpointIndex === -1) throw new Error("Root endpoint is required");

// Replace enppoints
rootEndpointTemplate = rootEndpointTemplate.replaceAll(
  placeHolders.endpoints,
  endpointsTemplate
);

// Replace root endpoint
rootEndpointTemplate = rootEndpointTemplate.replaceAll(
  placeHolders.rootEndpoint,
  parsedArgs[rootEndpointIndex].value
);

const rootEndpointDirPath = path.resolve(
  targetPath,
  parsedArgs[rootEndpointIndex].value
);
const rootEndpointFilePath = path.resolve(
  rootEndpointDirPath,
  `${parsedArgs[rootEndpointIndex].value}.endpoint.ts`
);

// Make a folder
fs.mkdirSync(rootEndpointDirPath);

// Write to file
fs.writeFileSync(rootEndpointFilePath, rootEndpointTemplate);

console.log("Done!");
