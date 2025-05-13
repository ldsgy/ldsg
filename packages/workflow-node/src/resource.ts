import { HandlerExtendedResource } from "@ldsg/handler";
import { GetWorkflowNodeInfo } from "@ldsg/workflow";
import { WorkflowNodeTypeResource } from "@ldsg/workflow-node-type";
import { WorkflowNodeSpecificResourceSettings } from "./types";

export class WorkflowNodeResource extends HandlerExtendedResource<WorkflowNodeSpecificResourceSettings> {
  getWorkflowNodeInfo: GetWorkflowNodeInfo = () => {
    const { getResourcesFromSettings, settings } = this;

    const { workflowNodeTypeResource } = getResourcesFromSettings();

    const { properties } = settings;

    const res = (
      workflowNodeTypeResource as WorkflowNodeTypeResource
    ).getWorkflowNodeInfoWithProperties({
      workflowNodeProperties: properties,
    });

    return res;
  };
}
