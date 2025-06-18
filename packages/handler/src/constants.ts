import { ROOT_RESOURCE_KIND } from "@ldsg/constants";
import { HandlerSpecificResourceSettings } from "@ldsg/handler-part";
import { GeneralResourceSettings } from "@ldsg/types";

/**
 * Instantiate Resource Handler General Resource Settings
 * 实例化资源处理程序普通资源配置
 */
export const INSTANTIATE_RESOURCE_HANDLER_GENERAL_RESOURCE_SETTINGS: GeneralResourceSettings =
  {
    title: "处理程序类型资源处理程序",
    description: "包含处理程序相应的模块，此模块主要通过",
  };

/**
 * Instantiate Resource Handler Specific Resource Settings
 * 实例化资源处理程序特殊资源配置
 * 框架通过此实例化此资源
 */
export const INSTANTIATE_RESOURCE_HANDLER_SPECIFIC_RESOURCE_SETTINGS: HandlerSpecificResourceSettings =
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
