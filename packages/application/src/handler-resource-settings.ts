import { HandlerResourceSettings } from "@ldsg/handler";

/**
 * Current Kind Resource Handler Resource Settings
 * 此类型资源的子级处理程序资源的配置
 * 如无或为 undefined，则说明无需子级处理程序。
 */
export const handlerResourceSettings: HandlerResourceSettings = {
  title: "应用类型资源处理程序",
  description: "",
  dependencies: [
    {
      name: "@ldsg/application",
    },
  ],
};
