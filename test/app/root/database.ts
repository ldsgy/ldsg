import { DatabaseResource } from "@ldsg/database";

const { DATABASE_URI } = process.env;

if (!DATABASE_URI) {
  throw new Error("invaild env DATABASE_URI");
}

export const databaseResource = new DatabaseResource({
  id: "test-database",
  kind: "database",
  parentId: "test-application",
  settings: {
    title: "测试表格",
    description: "",
    uri: DATABASE_URI,
  },
});
