import { HandlerExtendedResource } from "@ldsg/handler";
import {
  GetWorkflowNodeInfo,
  WorkflowNodeTypeSpecificResourceSettings,
} from "./types";

export class WorkflowNodeTypeResource extends HandlerExtendedResource<WorkflowNodeTypeSpecificResourceSettings> {
  getWorkflowNodeInfo: GetWorkflowNodeInfo = (params) => {
    const { workflowNodeProperties } = params;

    const { getHandler } = this;

    const handler = getHandler();

    const workflowNodeInfo = handler({
      workflowNodeProperties,
    });

    const res = {
      workflowNodeInfo,
    };

    return res;
  };
}
