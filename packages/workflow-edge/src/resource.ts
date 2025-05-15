import { Resource } from "@ldsg/resource";
import { GetWorkflowEdgeInfo } from "@ldsg/workflow";
import _ from "lodash";
import { WorkflowEdgeSpecificResourceSettings } from "./types";

export class WorkflowEdgeResource extends Resource<WorkflowEdgeSpecificResourceSettings> {
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
