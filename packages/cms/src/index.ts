import { createApp } from "@ldsg/app";

const app = createApp({
  resources: [],
});

const port = process.env.PORT || "3000";

app.listen(port);
