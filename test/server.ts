import { createApp } from "@ldsg/create-app";
import { blogResourceRecords } from "./apps/blog";
import { getResourceRecordsWithHandlerFunction } from "./utils";

const { resourceRecordsWithHandlerFunction } =
  getResourceRecordsWithHandlerFunction({
    resourceRecords: blogResourceRecords,
  });

const app = createApp({
  resourceRecords: resourceRecordsWithHandlerFunction,
});

const port = process.env.PORT || "3000";

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);

  console.log(`GraphQL listening on http://localhost:${port}/graphql`);
});
