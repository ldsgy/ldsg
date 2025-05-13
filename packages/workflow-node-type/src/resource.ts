import { HandlerExtendedResource } from "@ldsg/handler";
import {
  GetWorkflowNodeInfoWithProperties,
  WorkflowNodeTypeSpecificResourceSettings,
} from "./types";

export class WorkflowNodeTypeResource extends HandlerExtendedResource<WorkflowNodeTypeSpecificResourceSettings> {
  getWorkflowNodeInfoWithProperties: GetWorkflowNodeInfoWithProperties = (
    params
  ) => {
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
