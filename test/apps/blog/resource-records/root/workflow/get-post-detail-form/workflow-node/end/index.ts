import { ResourceRecord } from "@ldsg/types";
import { SPECIFIC_WORKFLOW_NODE_TYPE_TO_WORKFLOW_NODE_TYPE_RESOURCE_ID_MAP } from "@ldsg/workflow";
import {
  RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS as WORKFLOW_NODE_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS,
  WorkflowNodeSpecificResourceSettings,
} from "@ldsg/workflow-node";
import { GET_POST_DETAIL_FORM_WORKFLOW_RESOURCE_ID } from "../../constants";
import { GET_POST_DETAIL_FORM_WORKFLOW_END_WORKFLOW_NODE_RESOURCE_ID } from "./constants";

export const getPostDetailFormWorkflowEndWorkflowNodeResourceRecord: ResourceRecord<WorkflowNodeSpecificResourceSettings> =
  {
    id: GET_POST_DETAIL_FORM_WORKFLOW_END_WORKFLOW_NODE_RESOURCE_ID,
    kind: WORKFLOW_NODE_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS.kind,
    parentId: GET_POST_DETAIL_FORM_WORKFLOW_RESOURCE_ID,
    settings: {
      title: "Get Post Detail Workflow End Workflow Node",
      description: "",
      workflowNodeTypeResourceId:
        SPECIFIC_WORKFLOW_NODE_TYPE_TO_WORKFLOW_NODE_TYPE_RESOURCE_ID_MAP.end,
      properties: {
        output: {
          jsonataStr: `nodeIdToVariablesMap."get-post-detail-form-workflow-find-and-update-workflow-node"`,
        },
      },
    },
  };
