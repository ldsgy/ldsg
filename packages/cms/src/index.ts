import { createApp } from "@ldsg/app";

const app = createApp({
  resourceRecords: [],
});

const port = process.env.PORT || "3000";

app.listen(port);
