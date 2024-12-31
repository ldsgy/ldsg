import { SettingsSchema } from "@ldsg/core";

export const DATABASE_SERVICE_DEFAULT_SETTINGS_SCHEMA: SettingsSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      title: "名称",
      description: "具有辨识度的名称",
    },
    description: {
      type: "string",
      title: "描述",
      description: "用于注释",
    },
    uri: {
      type: "string",
      title: "URI",
      description: "MongoDB 数据库连接 URI",
    },
    dbName: {
      type: "string",
      title: "数据库名称",
      description: "MongoDB 数据库名称",
    },
  },
  required: ["uri", "dbName"],
};
