import { createApp } from "@ldsg/app";

const app = createApp({
  serviceRecords: SERVICE_RECORDS_JSON,
  serviceTypeMap: {
    ...SERVICE_TYPE_MAP,
    STORAGE: {
      class: StorageService,
    },
  },
});

const port = process.env.PORT || "3000";

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);

  console.log(`GraphQL listening on http://localhost:${port}/graphql`);
});
