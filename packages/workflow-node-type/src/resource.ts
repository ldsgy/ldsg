import { HandlerExtendedResource } from "@ldsg/handler";
import {
  GetExtraWorkflowNodeInfo,
  WorkflowNodeTypeSpecificResourceSettings,
} from "./types";

export class WorkflowNodeTypeResource extends HandlerExtendedResource<WorkflowNodeTypeSpecificResourceSettings> {
  getExtraWorkflowNodeInfo: GetExtraWorkflowNodeInfo = (params) => {
    const { workflowNodeProperties } = params;

    const { getExtendedHandlerOrUndefined } = this;

    const extendedHandlerOrUndefined = getExtendedHandlerOrUndefined();

    const extraWorkflowNodeInfo =
      extendedHandlerOrUndefined?.({
        workflowNodeProperties,
      }) ?? {};

    const res = {
      extraWorkflowNodeInfo,
    };

    return res;
  };
}
