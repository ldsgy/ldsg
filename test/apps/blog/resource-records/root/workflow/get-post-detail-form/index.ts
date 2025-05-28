import { ROOT_RESOURCE_ID } from "@ldsg/constants";
import { ResourceRecord } from "@ldsg/types";
import {
  RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS as WORKFLOW_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS,
  WorkflowSpecificResourceSettings,
} from "@ldsg/workflow";
import { GET_POST_DETAIL_FORM_WORKFLOW_RESOURCE_ID } from "./constants";

export * from "./workflow-edge";
export * from "./workflow-node";

export const getPostDetailFormWorkflowResourceRecord: ResourceRecord<WorkflowSpecificResourceSettings> =
  {
    id: GET_POST_DETAIL_FORM_WORKFLOW_RESOURCE_ID,
    kind: WORKFLOW_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS.kind,
    parentId: ROOT_RESOURCE_ID,
    settings: {
      title: "Get Post Detail Workflow",
      description: "",
    },
  };
