import { RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS as parentResourceDefinitionSpecificResourceSettings } from "@ldsg/application";
import { HandlerSpecificResourceSettings } from "@ldsg/handler";
import { ResourceDefinitionSpecificResourceSettings } from "@ldsg/resource-definition";
import { GeneralResourceSettings } from "@ldsg/types";

/**
 * Instantiate Resource Handler General Resource Settings
 * 实例化资源处理程序普通资源配置
 */
export const INSTANTIATE_RESOURCE_HANDLER_GENERAL_RESOURCE_SETTINGS: GeneralResourceSettings =
  {
    title: "路由实例化资源处理程序",
    description: "",
  };

/**
 * Instantiate Resource Handler Specific Resource Settings
 * 实例化资源处理程序特殊资源配置
 * 框架通过此实例化此资源
 */
export const INSTANTIATE_RESOURCE_HANDLER_SPECIFIC_RESOURCE_SETTINGS: HandlerSpecificResourceSettings =
  {
    code: `export * from "@ldsg/route";`,
    dependencies: [
      {
        name: "@ldsg/route",
      },
    ],
  };

export const RESOURCE_DEFINITION_GENERAL_RESOURCE_SETTINGS: GeneralResourceSettings =
  { title: "路由资源定义", description: "" };

export const RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS: ResourceDefinitionSpecificResourceSettings =
  {
    kind: "route",
    parentKind: parentResourceDefinitionSpecificResourceSettings.kind,
  };

/**
 * Default Extended Handler General Resource Settings
 * 默认扩展处理程序普通资源配置
 */
export const DEFAULT_EXTENDED_HANDLER_GENERAL_RESOURCE_SETTINGS: GeneralResourceSettings =
  {
    title: "路由默认扩展处理程序",
    description: "",
  };

/**
 * Default Extended Handler Specific Resource Settings
 * 默认扩展处理程序特殊资源配置
 */
export const DEFAULT_EXTENDED_HANDLER_SPECIFIC_RESOURCE_SETTINGS: HandlerSpecificResourceSettings =
  {
    code: `import { RequestHandler } from "express";

const handler: RequestHandler = (req, res) => {
  res.send("Hello, World!");
};`,
    dependencies: [
      {
        name: "express",
      },
    ],
  };
