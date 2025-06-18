import { HandlerSpecificResourceSettings } from "@ldsg/handler";
import { RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS as parentResourceDefinitionSpecificResourceSettings } from "@ldsg/object";
import { ResourceDefinitionSpecificResourceSettings } from "@ldsg/resource-definition";
import { GeneralResourceSettings } from "@ldsg/types";

/**
 * Instantiate Resource Handler General Resource Settings
 * 实例化资源处理程序普通资源配置
 */
export const INSTANTIATE_RESOURCE_HANDLER_GENERAL_RESOURCE_SETTINGS: GeneralResourceSettings =
  {
    title: "对象字段实例化资源处理程序",
    description: "",
  };

/**
 * Instantiate Resource Handler Specific Resource Settings
 * 实例化资源处理程序特殊资源配置
 * 框架通过此实例化此资源
 */
export const INSTANTIATE_RESOURCE_HANDLER_SPECIFIC_RESOURCE_SETTINGS: HandlerSpecificResourceSettings =
  {
    code: `export * from "@ldsg/object-field";`,
    dependencies: [
      {
        name: "@ldsg/object-field",
      },
    ],
  };

export const RESOURCE_DEFINITION_GENERAL_RESOURCE_SETTINGS: GeneralResourceSettings =
  { title: "对象字段资源定义", description: "" };

export const RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS: ResourceDefinitionSpecificResourceSettings =
  {
    kind: "object_field",
    parentKind: parentResourceDefinitionSpecificResourceSettings.kind,
  };
