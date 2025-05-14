import { HandlerExtendedResource } from "@ldsg/handler";
import {
  GetExtraWorkflowNodeInfo,
  WorkflowNodeTypeSpecificResourceSettings,
} from "./types";

export class WorkflowNodeTypeResource extends HandlerExtendedResource<WorkflowNodeTypeSpecificResourceSettings> {
  getExtraWorkflowNodeInfo: GetExtraWorkflowNodeInfo = (params) => {
    const { workflowNodeProperties } = params;

    const { getHandler } = this;

    const handler = getHandler();

    const extraWorkflowNodeInfo = handler({
      workflowNodeProperties,
    });

    const res = {
      extraWorkflowNodeInfo,
    };

    return res;
  };
}
