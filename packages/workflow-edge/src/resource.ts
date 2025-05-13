import { HandlerExtendedResource } from "@ldsg/handler";
import _ from "lodash";
import {
  WorkflowEdgeInfo,
  WorkflowEdgeSpecificResourceSettings,
} from "./types";

export class WorkflowEdgeResource extends HandlerExtendedResource<WorkflowEdgeSpecificResourceSettings> {
  getEdgeInfo = () => {
    const { settings } = this;

    const res: WorkflowEdgeInfo = _.pick(settings, [
      "sourceWorkflowNodeResourceId",
      "sourceWorkflowNodePortId",
      "targetWorkflowNodeResourceId",
      "targetWorkflowNodePortId",
    ]);

    return res;
  };
}
