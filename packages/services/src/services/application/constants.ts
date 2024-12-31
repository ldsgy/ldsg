import { SettingsSchema } from "@ldsg/core";

export const APPLICATION_SERVICE_DEFAULT_SETTINGS_SCHEMA: SettingsSchema = {
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
    exposeServiceInfo: {
      type: "boolean",
      title: "开放服务信息",
      description: "当暴露时，会在查询接口显示服务全部信息",
      default: false,
    },
  },
  required: [],
};
