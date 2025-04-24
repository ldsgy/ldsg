import { createApp } from "@ldsg/create-app";

const main = async () => {
  const app = await createApp({
    resourceRecords: [],
  });

  const port = process.env.PORT || "3000";

  app.listen(port);
};

main();
