import { ROOT_RESOURCE_ID } from "@ldsg/constants";
import {
  RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS as HANDLER_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS,
  HandlerSpecificResourceSettings,
} from "@ldsg/handler";
import { ResourceRecord } from "@ldsg/types";
import { WorkflowNodeExecuter } from "@ldsg/workflow";
import _ from "lodash";
import mongoose from "mongoose";
import { GET_POST_DETAIL_FORM_WORKFLOW_FIND_AND_UPDATE_WORKFLOW_NODE_HANDLER_RESOURCE_ID } from "./constants";

async function handler(this: WorkflowNodeExecuter): Promise<void> {
  const { nodeIdToVariablesMap, setVariables } = this;

  const { Post } = mongoose.models;

  const id = _.get(
    nodeIdToVariablesMap,
    "get-post-detail-form-workflow-start-workflow-node.args.id"
  );

  const findByIdRes = await Post.findById(id);

  let variables;

  if (findByIdRes) {
    findByIdRes.views = 1;

    variables = findByIdRes;
  }

  setVariables({
    variables: variables ?? null,
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
