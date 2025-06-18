import { ROOT_RESOURCE_KIND } from "@ldsg/constants";
import { HandlerSpecificResourceSettings } from "@ldsg/handler";
import { ResourceDefinitionSpecificResourceSettings } from "@ldsg/resource-definition";
import { GeneralResourceSettings } from "@ldsg/types";
import { FieldTypeBasePlatform } from "./types/field-type-info";

/**
 * Instantiate Resource Handler General Resource Settings
 * 实例化资源处理程序普通资源配置
 */
export const INSTANTIATE_RESOURCE_HANDLER_GENERAL_RESOURCE_SETTINGS: GeneralResourceSettings =
  {
    title: "字段类型类型资源处理程序",
    description: "",
  };

/**
 * Instantiate Resource Handler Resource Settings
 * 实例化资源处理程序特殊资源配置
 * 框架通过此实例化此资源
 */
export const INSTANTIATE_RESOURCE_HANDLER_SPECIFIC_RESOURCE_SETTINGS: HandlerSpecificResourceSettings =
  {
    code: `export * from "@ldsg/field-type";`,
    dependencies: [
      {
        name: "@ldsg/field-type",
      },
    ],
  };

export const RESOURCE_DEFINITION_GENERAL_RESOURCE_SETTINGS: GeneralResourceSettings =
  { title: "字段类型类型资源定义", description: "" };

export const RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS: ResourceDefinitionSpecificResourceSettings =
  {
    kind: "field_type",
    parentKind: ROOT_RESOURCE_KIND,
  };

export const FieldTypeBasePlatformList = [
  FieldTypeBasePlatform.COMMON,
  FieldTypeBasePlatform.GRAPHQL,
  FieldTypeBasePlatform.JSON,
  FieldTypeBasePlatform.MONGOOSE,
];
