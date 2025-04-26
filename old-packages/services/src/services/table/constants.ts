import { SettingsSchema } from "@ldsg/core";

export const TABLE_SERVICE_DEFAULT_SETTINGS_SCHEMA: SettingsSchema = {
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
    alias: {
      type: "string",
      title: "别名",
      description:
        "用于 GraphQL 内生成的字段名，只包含字母、数字和下划线，且以字母开头",
      pattern: "^[a-zA-Z][a-zA-Z0-9_]*$",
    },
    collectionName: {
      type: "string",
      title: "集合名称",
      description: "用于存储",
    },
  },
  required: ["alias", "collectionName"],
};
