import { SettingsSchema } from "@ldsg/core";

export const MIDDLEWARE_SERVICE_DEFAULT_SETTINGS_SCHEMA: SettingsSchema = {
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
    sort: {
      type: "number",
      title: "排序",
      description: "用于排序",
    },
  },
  required: ["sort"],
};
