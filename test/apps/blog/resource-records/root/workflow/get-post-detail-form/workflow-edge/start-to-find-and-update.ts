import { ResourceRecord } from "@ldsg/types";
import {
  RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS as WORKFLOW_EDGE_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS,
  WorkflowEdgeSpecificResourceSettings,
} from "@ldsg/workflow-edge";
import { GET_POST_DETAIL_FORM_WORKFLOW_RESOURCE_ID } from "../constants";
import { GET_POST_DETAIL_FORM_WORKFLOW_FIND_AND_UPDATE_WORKFLOW_NODE_RESOURCE_ID } from "../workflow-node/find-and-update/constants";
import { GET_POST_DETAIL_FORM_WORKFLOW_START_WORKFLOW_NODE_RESOURCE_ID } from "../workflow-node/start/constants";

export const getPostDetailFormWorkflowStartToFindAndUpdateWorkflowEdgeResourceRecord: ResourceRecord<WorkflowEdgeSpecificResourceSettings> =
  {
    id: `${GET_POST_DETAIL_FORM_WORKFLOW_RESOURCE_ID}-start-to-find-and-update-workflow-edge`,
    kind: WORKFLOW_EDGE_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS.kind,
    parentId: GET_POST_DETAIL_FORM_WORKFLOW_RESOURCE_ID,
    settings: {
      title: "Get Post Detail Workflow Start To Find And Update Workflow Edge",
      description: "",
      sourceWorkflowNodeResourceId:
        GET_POST_DETAIL_FORM_WORKFLOW_START_WORKFLOW_NODE_RESOURCE_ID,
      targetWorkflowNodeResourceId:
        GET_POST_DETAIL_FORM_WORKFLOW_FIND_AND_UPDATE_WORKFLOW_NODE_RESOURCE_ID,
    },
  };
