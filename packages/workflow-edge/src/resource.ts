import { HandlerExtendedResource } from "@ldsg/handler";
import _ from "lodash";
import {
  WorkflowEdgeInfo,
  WorkflowEdgeSpecificResourceSettings,
} from "./types";

interface GetWorkflowEdgeInfoRes {
  workflowEdgeInfo: WorkflowEdgeInfo;
}

export type GetWorkflowEdgeInfo = () => GetWorkflowEdgeInfoRes;

export class WorkflowEdgeResource extends HandlerExtendedResource<WorkflowEdgeSpecificResourceSettings> {
  getWorkflowEdgeInfo: GetWorkflowEdgeInfo = () => {
    const { settings } = this;

    const workflowEdgeInfo = _.pick(settings, [
      "sourceWorkflowNodeResourceId",
      "sourceWorkflowNodePortId",
      "targetWorkflowNodeResourceId",
      "targetWorkflowNodePortId",
    ]);

    const res = {
      workflowEdgeInfo,
    };

    return res;
  };
}
