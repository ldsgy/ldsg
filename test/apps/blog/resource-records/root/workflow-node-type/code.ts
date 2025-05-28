import { ROOT_RESOURCE_ID } from "@ldsg/constants";
import {
  RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS as HANDLER_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS,
  HandlerSpecificResourceSettings,
} from "@ldsg/handler";
import { ResourceRecord } from "@ldsg/types";
import { WorkflowNodeTypeSpecificResourceSettings } from "@ldsg/workflow-node-type";

const CODE_WORKFLOW_NODE_TYPE_HANDLER_RESOURCE_ID = "health-route-handler";

const handler = (req: any, res: any) => {
  res.send("ok");
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
      fieldPropertiesSchema: {},
      handlerResourceId: CODE_WORKFLOW_NODE_TYPE_HANDLER_RESOURCE_ID,
    },
  };
