// import { createApp } from "@ldsg/create-app";
// import { SERVICE_TYPE_MAP } from "@ldsg/services";
// import { getServiceRecords } from "./utils";
import { manifest } from "./manifests/ip/manifest";

const { resources } = manifest;

console.debug("resources", resources);

const handlerResources = resources.filter((value) => value.kind === "HANDLER");

console.debug("handlerResources", handlerResources);

// const { APP_NAME } = process.env;

// if (!APP_NAME) {
//   throw new Error("env APP_NAME is required");
// }

// const { serviceRecords } = getServiceRecords({
//   appName: APP_NAME,
// });

// const app = createApp({
//   serviceRecords,
//   serviceTypeMap: SERVICE_TYPE_MAP,
// });

// const port = process.env.PORT || "3000";

// app.listen(port, () => {
//   console.info(`listen on http://localhost:${port}`);

//   console.info(`listen GraphQL on http://localhost:${port}/graphql`);
// });
