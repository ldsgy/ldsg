import { ROOT_RESOURCE_ID } from "@ldsg/constants";
import {
  RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS as HANDLER_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS,
  HandlerSpecificResourceSettings,
} from "@ldsg/handler";
import { ResourceRecord } from "@ldsg/types";
import { WorkflowNodeExecuter } from "@ldsg/workflow";
import { GET_POST_DETAIL_FORM_WORKFLOW_FIND_AND_UPDATE_WORKFLOW_NODE_HANDLER_RESOURCE_ID } from "./constants";

function handler(this: WorkflowNodeExecuter): void {
  const { setVariables } = this;

  console.debug(
    "wcm test/apps/blog/resource-records/root/workflow/get-post-detail-form/workflow-node/find-and-update/handler/index.ts handler this",
    this
  );

  setVariables({
    variables: "test",
  });
}

export const getPostDetailFormWorkflowFindAndUpdateWorkflowNodeHandlerResourceRecord: ResourceRecord<HandlerSpecificResourceSettings> =
  {
    id: GET_POST_DETAIL_FORM_WORKFLOW_FIND_AND_UPDATE_WORKFLOW_NODE_HANDLER_RESOURCE_ID,
    kind: HANDLER_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS.kind,
    parentId: ROOT_RESOURCE_ID,
    settings: {
      title: "Get Post Detail Workflow Find And Update Workflow Node Handler",
      description: "",
      code: "",
      dependencies: [],
      handler,
    },
  };
