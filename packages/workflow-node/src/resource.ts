import { HandlerExtendedResource } from "@ldsg/handler";
import { WorkflowNodeTypeResource } from "@ldsg/workflow-node-type";
import { WorkflowNodeSpecificResourceSettings } from "./types";

export class WorkflowNodeResource extends HandlerExtendedResource<WorkflowNodeSpecificResourceSettings> {
  getWorkflowNodeInfo = () => {
    const { getResourcesFromSettings, settings } = this;

    const { workflowNodeTypeResource } = getResourcesFromSettings();

    const { properties } = settings;

    const res = (
      workflowNodeTypeResource as WorkflowNodeTypeResource
    ).getWorkflowNodeInfo({
      workflowNodeProperties: properties,
    });

    return res;
  };
}
