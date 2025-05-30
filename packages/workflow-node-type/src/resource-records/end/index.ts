import { ROOT_RESOURCE_ID } from "@ldsg/constants";
import { ResourceRecord } from "@ldsg/types";
import { SPECIFIC_WORKFLOW_NODE_TYPE_TO_WORKFLOW_NODE_TYPE_RESOURCE_ID_MAP } from "@ldsg/workflow";
import { RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS } from "../../constants";
import { WorkflowNodeTypeSpecificResourceSettings } from "../../types";
import { END_WORKFLOW_NODE_TYPE_HANDLER_RESOURCE_ID } from "./handler/constants";

export * from "./handler";

export const endWorkflowNodeTypeResourceRecord: ResourceRecord<WorkflowNodeTypeSpecificResourceSettings> =
  {
    id: SPECIFIC_WORKFLOW_NODE_TYPE_TO_WORKFLOW_NODE_TYPE_RESOURCE_ID_MAP.end,
    kind: RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS.kind,
    parentId: ROOT_RESOURCE_ID,
    settings: {
      title: "结束工作流节点类型",
      description: "",
      workflowNodePropertiesSchema: {
        type: "object",
        properties: {
          output: {
            type: "object",
            properties: {},
            additionalItems: true,
          },
        },
      },
      handlerResourceId: END_WORKFLOW_NODE_TYPE_HANDLER_RESOURCE_ID,
    },
  };
