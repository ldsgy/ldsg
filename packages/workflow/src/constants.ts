import { ROOT_RESOURCE_KIND } from "@ldsg/constants";
import { HandlerSpecificResourceSettings } from "@ldsg/handler";
import { ResourceDefinitionSpecificResourceSettings } from "@ldsg/resource-definition";
import { GeneralResourceSettings } from "@ldsg/types";

export const HANDLER_GENERAL_RESOURCE_SETTINGS: GeneralResourceSettings = {
  title: "工作流类型资源处理程序",
  description: "",
};

/**
 * Handler Resource Settings
 * 此类型资源的子级处理程序资源的配置
 * 如无或为 undefined，则说明无需子级处理程序。
 */
export const HANDLER_SPECIFIC_RESOURCE_SETTINGS: HandlerSpecificResourceSettings =
  {
    code: `export * from "@ldsg/workflow";`,
    dependencies: [
      {
        name: "@ldsg/workflow",
      },
    ],
  };

export const RESOURCE_DEFINITION_GENERAL_RESOURCE_SETTINGS: GeneralResourceSettings =
  {
    title: "工作流类型资源定义",
    description: "",
  };

export const RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS: ResourceDefinitionSpecificResourceSettings =
  {
    kind: "workflow_node_type",
    parentKind: ROOT_RESOURCE_KIND,
  };

/**
 * Specific Workflow Node Type Id Map
 */
export const SPECIFIC_WORKFLOW_NODE_TYPE_TO_WORKFLOW_NODE_TYPE_RESOURCE_ID_MAP =
  {
    start: "workflow_node_type_start",
    end: "workflow_node_type_end",
  } as const;
