import { createApp } from "@ldsg/app";

const app = createApp({
  serviceRecords: [],
});

const port = process.env.PORT || "3000";

app.listen(port);
