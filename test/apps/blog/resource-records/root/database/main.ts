import { ROOT_RESOURCE_ID } from "@ldsg/constants";
import { DatabaseResource } from "@ldsg/database";

const { DATABASE_URI } = process.env;

if (!DATABASE_URI) {
  throw new Error("invaild env DATABASE_URI");
}

export const databaseResource = new DatabaseResource({
  id: "main-database",
  kind: "database",
  parentId: ROOT_RESOURCE_ID,
  settings: {
    title: "主要数据库",
    description: "",
    uri: DATABASE_URI,
  },
});
