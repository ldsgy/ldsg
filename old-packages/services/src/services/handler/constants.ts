import { SettingsSchema } from "@ldsg/core";

export const HANDLER_SERVICE_DEFAULT_SETTINGS_SCHEMA: SettingsSchema = {
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
    moduleId: {
      type: "string",
      title: "module id",
      description: "module name or path",
    },
    moduleData: {
      type: "object",
      title: "module data",
      description: "code and dependent modules, no need during runtime",
      properties: {
        code: {
          type: "string",
          title: "code",
        },
        modules: {
          type: "array",
          title: "dependent modules",
          items: {
            type: "object",
            title: "module",
            properties: {
              name: {
                type: "string",
                title: "名称",
              },
              version: {
                type: "string",
                title: "版本",
              },
              path: {
                type: "string",
                title: "路径",
              },
            },
            required: ["name", "version", "path"],
          },
          default: [],
        },
      },
      required: ["code", "modules"],
    },
  },
  required: ["moduleId"],
};
