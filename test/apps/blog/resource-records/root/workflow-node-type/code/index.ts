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
  console.debug(
    "test/apps/blog/resource-records/root/workflow-node-type/code/index.ts this",
    this
  );

  const { workflowNodeProperties } = params;

  const { handlerResourceId } = workflowNodeProperties;

  console.debug(
    "wcm test/apps/blog/resource-records/root/workflow-node-type/code/index.ts handlerResourceId",
    handlerResourceId
  );

  const { resource: handlerResource } =
    this.getFilteredResource<HandlerResource>({
      id: handlerResourceId,
    });

  console.debug(
    "wcm test/apps/blog/resource-records/root/workflow-node-type/code/index.ts handlerResource",
    handlerResource
  );

  const handlerWithoutChangedThisPointer =
    handlerResource?.getHandlerWithoutChangedThisPointer() as
      | WorkflowNodeExecuterExecute
      | undefined;

  console.debug(
    "wcm test/apps/blog/resource-records/root/workflow-node-type/code/index.ts handlerWithoutChangedThisPointer",
    handlerWithoutChangedThisPointer
  );

  class AWorkflowNodeExecuter extends WorkflowNodeExecuter {
    execute: WorkflowNodeExecuterExecute = () => {
      console.debug(
        "test/apps/blog/resource-records/root/workflow-node-type/code/index.ts execute this",
        this
      );

      handlerWithoutChangedThisPointer?.bind(this)();
    };
  }

  const res: ExtraWorkflowNodeInfo = {
    Executer: AWorkflowNodeExecuter,
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
