import { createApp } from "@ldsg/app";
import MANIFEST_JSON from "./manifest.json";

const { resources } = MANIFEST_JSON;

const app = createApp({
  resourceRecords: resources,
});

const port = process.env.PORT || "3000";

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);

  console.log(`GraphQL listening on http://localhost:${port}/graphql`);
});
