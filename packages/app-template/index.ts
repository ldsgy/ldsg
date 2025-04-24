import { createApp } from "@ldsg/create-app";
import MANIFEST_JSON from "./manifest.json";

const { resourceRecords } = MANIFEST_JSON;

const app = createApp({
  resourceRecords,
});

const port = process.env.PORT || "3000";

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);

  console.log(`GraphQL listening on http://localhost:${port}/graphql`);
});
