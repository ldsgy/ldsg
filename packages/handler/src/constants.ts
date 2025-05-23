import { ROOT_RESOURCE_KIND } from "@ldsg/constants";
import { HandlerSpecificResourceSettings } from "@ldsg/handler-part";
import { GeneralResourceSettings } from "@ldsg/types";

export const HANDLER_GENERAL_RESOURCE_SETTINGS: GeneralResourceSettings = {
  title: "处理程序类型资源处理程序",
  description: "包含处理程序相应的模块，此模块主要通过",
};

/**
 * Handler Resource Settings
 * 此类型资源的子级处理程序资源的配置
 * 如无或为 undefined，则说明无需子级处理程序。
 */
export const HANDLER_SPECIFIC_RESOURCE_SETTINGS: HandlerSpecificResourceSettings =
  {
    code: `export * from "@ldsg/handler";`,
    dependencies: [
      {
        name: "@ldsg/handler",
      },
    ],
  };

import { ResourceDefinitionSpecificResourceSettings } from "@ldsg/resource-definition-part";

export const RESOURCE_DEFINITION_GENERAL_RESOURCE_SETTINGS: GeneralResourceSettings =
  {
    title: "处理程序类型资源定义",
    description:
      "主要包含引入模块列表与相应的处理程序代码，处理程序类型资源无子级资源。",
  };

export const RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS: ResourceDefinitionSpecificResourceSettings =
  {
    kind: "handler",
    parentKind: ROOT_RESOURCE_KIND,
  };
