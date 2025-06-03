import { ROOT_RESOURCE_ID } from "@ldsg/constants";
import {
  RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS as HANDLER_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS,
  HandlerResource,
  HandlerSpecificResourceSettings,
} from "@ldsg/handler";
import { ResourceRecord } from "@ldsg/types";
import {
  WorkflowNodeExecuter,
  WorkflowNodeExecuterExecute,
} from "@ldsg/workflow";
import {
  ExtraWorkflowNodeInfo,
  GetExtraWorkflowNodeInfoParams,
  WorkflowNodeTypeSpecificResourceSettings,
} from "@ldsg/workflow-node-type";
import {
  CODE_WORKFLOW_NODE_TYPE_HANDLER_RESOURCE_ID,
  CODE_WORKFLOW_NODE_TYPE_RESOURCE_ID,
} from "./constants";

function handler(
  this: HandlerResource,
  params: GetExtraWorkflowNodeInfoParams
): ExtraWorkflowNodeInfo {
  const { workflowNodeProperties } = params;

  const { handlerResourceId } = workflowNodeProperties;

  const { resource: handlerResource } =
    this.getFilteredResource<HandlerResource>({
      id: handlerResourceId,
    });

  const handlerWithoutChangedThisPointer =
    handlerResource?.getHandlerWithoutChangedThisPointer() as
      | WorkflowNodeExecuterExecute
      | undefined;

  class CodeWorkflowNodeExecuter extends WorkflowNodeExecuter {
    execute: WorkflowNodeExecuterExecute = async () => {
      await handlerWithoutChangedThisPointer?.bind(this)();
    };
  }

  const res: ExtraWorkflowNodeInfo = {
    Executer: CodeWorkflowNodeExecuter,
  };

  return res;
}

export const codeWorkflowNodeTypeHandlerResourceRecord: ResourceRecord<HandlerSpecificResourceSettings> =
  {
    id: CODE_WORKFLOW_NODE_TYPE_HANDLER_RESOURCE_ID,
    kind: HANDLER_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS.kind,
    parentId: ROOT_RESOURCE_ID,
    settings: {
      title: "代码工作流节点类型",
      description: "",
      code: "",
      dependencies: [],
      handler,
    },
  };

export const codeWorkflowNodeTypeResourceRecord: ResourceRecord<WorkflowNodeTypeSpecificResourceSettings> =
  {
    id: CODE_WORKFLOW_NODE_TYPE_RESOURCE_ID,
    kind: "workflow_node_type",
    parentId: ROOT_RESOURCE_ID,
    settings: {
      title: "代码",
      description: "",
      workflowNodePropertiesSchema: {
        type: "object",
        properties: {
          handlerResourceId: {
            type: "string",
            title: "处理程序资源ID",
            description: "",
          },
        },
      },
      handlerResourceId: CODE_WORKFLOW_NODE_TYPE_HANDLER_RESOURCE_ID,
    },
  };
