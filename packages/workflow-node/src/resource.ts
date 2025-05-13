import { HandlerExtendedResource } from "@ldsg/handler";
import {
  GetWorkflowNodeInfo,
  WorkflowNodeSpecificResourceSettings,
} from "./types";

export class WorkflowNodeResource extends HandlerExtendedResource<WorkflowNodeSpecificResourceSettings> {
  getWorkflowNodeInfo: GetWorkflowNodeInfo = (params) => {
    const { workflowNodeProperties } = params;

    const { getHandler } = this;

    const handler = getHandler();

    const res = handler({
      workflowNodeProperties,
    });

    return res;
  };
}
