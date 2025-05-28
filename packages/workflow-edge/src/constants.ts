import { HandlerSpecificResourceSettings } from "@ldsg/handler";
import { ResourceDefinitionSpecificResourceSettings } from "@ldsg/resource-definition";
import { GeneralResourceSettings } from "@ldsg/types";
import { RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS as parentResourceDefinitionSpecificResourceSettings } from "@ldsg/workflow";

export const HANDLER_GENERAL_RESOURCE_SETTINGS: GeneralResourceSettings = {
  title: "工作流节点类型类型资源处理程序",
  description: "",
};

/**
 * Handler Resource Settings
 * 此类型资源的子级处理程序资源的配置
 * 如无或为 undefined，则说明无需子级处理程序。
 */
export const HANDLER_SPECIFIC_RESOURCE_SETTINGS: HandlerSpecificResourceSettings =
  {
    code: `export * from "@ldsg/workflow-edge";`,
    dependencies: [
      {
        name: "@ldsg/workflow-edge",
      },
    ],
  };

export const RESOURCE_DEFINITION_GENERAL_RESOURCE_SETTINGS: GeneralResourceSettings =
  {
    title: "工作流连线类型资源定义",
    description: "",
  };

export const RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS: ResourceDefinitionSpecificResourceSettings =
  {
    kind: "workflow_edge",
    parentKind: parentResourceDefinitionSpecificResourceSettings.kind,
  };
