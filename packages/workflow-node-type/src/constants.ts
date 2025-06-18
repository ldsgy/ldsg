import { ROOT_RESOURCE_KIND } from "@ldsg/constants";
import { HandlerSpecificResourceSettings } from "@ldsg/handler";
import { ResourceDefinitionSpecificResourceSettings } from "@ldsg/resource-definition";
import { GeneralResourceSettings } from "@ldsg/types";

/**
 * Instantiate Resource Handler General Resource Settings
 * 实例化资源处理程序普通资源配置
 */
export const INSTANTIATE_RESOURCE_HANDLER_GENERAL_RESOURCE_SETTINGS: GeneralResourceSettings =
  {
    title: "工作流节点类型实例化资源处理程序",
    description: "",
  };

/**
 * Instantiate Resource Handler Specific Resource Settings
 * 实例化资源处理程序特殊资源配置
 * 框架通过此实例化此资源
 */
export const INSTANTIATE_RESOURCE_HANDLER_SPECIFIC_RESOURCE_SETTINGS: HandlerSpecificResourceSettings =
  {
    code: `export * from "@ldsg/workflow-node-type";`,
    dependencies: [
      {
        name: "@ldsg/workflow-node-type",
      },
    ],
  };

export const RESOURCE_DEFINITION_GENERAL_RESOURCE_SETTINGS: GeneralResourceSettings =
  {
    title: "工作流节点类型类型资源定义",
    description: "",
  };

export const RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS: ResourceDefinitionSpecificResourceSettings =
  {
    kind: "workflow_node_type",
    parentKind: ROOT_RESOURCE_KIND,
  };

/**
 * Default Extended Handler General Resource Settings
 * 默认扩展处理程序普通资源配置
 */
export const DEFAULT_EXTENDED_HANDLER_GENERAL_RESOURCE_SETTINGS: GeneralResourceSettings =
  {
    title: "工作流节点类型默认扩展处理程序",
    description: "",
  };

/**
 * Default Extended Handler Specific Resource Settings
 * 默认扩展处理程序特殊资源配置
 */
export const DEFAULT_EXTENDED_HANDLER_SPECIFIC_RESOURCE_SETTINGS: HandlerSpecificResourceSettings =
  {
    code: `import { Handler } from "@ldsg/handler";
import {
  WorkflowNodeExecuter,
  WorkflowNodeExecuterExecute,
} from "@ldsg/workflow";
import {
  ExtraWorkflowNodeInfo,
  GetExtraWorkflowNodeInfoParams,
} from "@ldsg/workflow-node-type";

export const handler: Handler<
  [GetExtraWorkflowNodeInfoParams],
  ExtraWorkflowNodeInfo
> = (params) => {
  const { workflowNodeProperties } = params;

  const { name } = workflowNodeProperties;

  class AWorkflowNodeExecuter extends WorkflowNodeExecuter {
    execute: WorkflowNodeExecuterExecute = async () => {
      const { setVariables } = this;

      setVariables({
        variables: name,
      });
    };
  }

  const res: ExtraWorkflowNodeInfo = {
    Executer: AWorkflowNodeExecuter,
  };

  return res;
};
`,
    dependencies: [
      {
        name: "@ldsg/handler",
      },
      {
        name: "@ldsg/workflow",
      },
      {
        name: "@ldsg/workflow-node-type",
      },
    ],
  };
