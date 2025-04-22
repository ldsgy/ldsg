import { HandlerResourceSettings } from "./types";

/**
 * Handler Resource Settings
 * 此类型资源的子级处理程序资源的配置
 * 如无或为 undefined，则说明无需子级处理程序。
 */
export const handlerResourceSettings: HandlerResourceSettings = {
  title: "处理程序类型资源处理程序",
  description: "包含处理程序相应的模块，此模块主要通过",
  code: `export * from "@ldsg/handler";`,
  dependencies: [
    {
      name: "@ldsg/handler",
    },
  ],
};
