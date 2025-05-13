import { HandlerExtendedResource } from "@ldsg/handler";
import {
  GetWorkflowNodeTypeInfo,
  WorkflowNodeTypeSpecificResourceSettings,
} from "./types";

export class WorkflowNodeTypeResource extends HandlerExtendedResource<WorkflowNodeTypeSpecificResourceSettings> {
  getWorkflowNodeTypeInfo: GetWorkflowNodeTypeInfo = (params) => {
    const { workflowNodeProperties } = params;

    const { getHandler } = this;

    const handler = getHandler();

    const res = handler({
      workflowNodeProperties,
    });

    return res;
  };
}
