import { SettingsSchema } from "@ldsg/core";

export const HTTP_SERVICE_DEFAULT_SETTINGS_SCHEMA: SettingsSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      title: "名称",
      description: "具有辨识度的字段名称",
    },
    description: {
      type: "string",
      title: "描述",
      description: "用于注释",
    },
    path: {
      type: "string",
      title: "路径",
      description: "用于 HTTP 路径",
    },
  },
  required: ["path"],
};
