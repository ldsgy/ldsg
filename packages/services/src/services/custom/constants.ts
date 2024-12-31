import { SettingsSchema } from "@ldsg/core";

export const CUSTOM_SERVICE_DEFAULT_SETTINGS_SCHEMA: SettingsSchema = {
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
      description: "用于调用",
      pattern: "^[a-zA-Z][a-zA-Z0-9_]*$",
    },
  },
  required: ["alias"],
};
