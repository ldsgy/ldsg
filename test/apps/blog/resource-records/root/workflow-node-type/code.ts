import { ROOT_RESOURCE_ID } from "@ldsg/constants";
import {
  Handler,
  RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS as HANDLER_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS,
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

const CODE_WORKFLOW_NODE_TYPE_HANDLER_RESOURCE_ID = "health-route-handler";

const handler: Handler<
  [GetExtraWorkflowNodeInfoParams],
  ExtraWorkflowNodeInfo
> = (params) => {
  const { workflowNodeProperties } = params;

  const { handlerResourceId } = workflowNodeProperties;

  const a = () => {
    this;
  };

  class AWorkflowNodeExecuter extends WorkflowNodeExecuter {
    execute: WorkflowNodeExecuterExecute = () => {
      const { setOutputVariables } = this;

      a.bind(this)();
    };
  }

  const res: ExtraWorkflowNodeInfo = {
    Executer: AWorkflowNodeExecuter,
  };

  return res;
};

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
    id: "workflow-node-type-code",
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
