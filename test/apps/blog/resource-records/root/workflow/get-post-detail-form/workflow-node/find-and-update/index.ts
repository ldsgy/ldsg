import { ResourceRecord } from "@ldsg/types";
import {
  RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS as WORKFLOW_NODE_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS,
  WorkflowNodeSpecificResourceSettings,
} from "@ldsg/workflow-node";
import { CODE_WORKFLOW_NODE_TYPE_HANDLER_RESOURCE_ID } from "../../../../workflow-node-type/code/constants";
import { GET_POST_DETAIL_FORM_WORKFLOW_RESOURCE_ID } from "../../constants";
import { GET_POST_DETAIL_FORM_WORKFLOW_FIND_AND_UPDATE_WORKFLOW_NODE_RESOURCE_ID } from "./constants";
import { GET_POST_DETAIL_FORM_WORKFLOW_FIND_AND_UPDATE_WORKFLOW_NODE_HANDLER_RESOURCE_ID } from "./handler/constants";

export const getPostDetailFormWorkflowFindAndUpdateWorkflowNodeResourceRecord: ResourceRecord<WorkflowNodeSpecificResourceSettings> =
  {
    id: GET_POST_DETAIL_FORM_WORKFLOW_FIND_AND_UPDATE_WORKFLOW_NODE_RESOURCE_ID,
    kind: WORKFLOW_NODE_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS.kind,
    parentId: GET_POST_DETAIL_FORM_WORKFLOW_RESOURCE_ID,
    settings: {
      title: "Get Post Detail Workflow Find And Update Workflow Node",
      description: "",
      workflowNodeTypeResourceId: CODE_WORKFLOW_NODE_TYPE_HANDLER_RESOURCE_ID,
      properties: {
        handlerResourceId:
          GET_POST_DETAIL_FORM_WORKFLOW_FIND_AND_UPDATE_WORKFLOW_NODE_HANDLER_RESOURCE_ID,
      },
    },
  };
