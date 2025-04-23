import { HandlerSpecificResourceSettings } from "@ldsg/handler";
import { GeneralResourceSettings } from "@ldsg/types";

export const HANDLER_GENERAL_RESOURCE_SETTINGS: GeneralResourceSettings = {
  title: "资源定义类型资源处理程序",
  description: "",
};

/**
 * Handler Resource Settings
 * 此类型资源的子级处理程序资源的配置
 * 如无或为 undefined，则说明无需子级处理程序。
 */
export const HANDLER_SPECIFIC_RESOURCE_SETTINGS: HandlerSpecificResourceSettings =
  {
    code: `export * from "@ldsg/resource-definition";`,
    dependencies: [
      {
        name: "@ldsg/resource-definition",
      },
    ],
  };

import { ResourceDefinitionSpecificResourceSettings } from "@ldsg/resource-definition-part";

export const RESOURCE_DEFINITION_GENERAL_RESOURCE_SETTINGS: GeneralResourceSettings =
  {
    title: "资源定义类型资源定义",
    description: "",
  };

export const RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS: ResourceDefinitionSpecificResourceSettings =
  {
    kind: "RESOURCE_DEFINITION",
    subKinds: [],
  };
