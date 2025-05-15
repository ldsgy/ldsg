import { Resource } from "@ldsg/resource";
import { GetWorkflowNodeInfo } from "@ldsg/workflow";
import { WorkflowNodeTypeResource } from "@ldsg/workflow-node-type";
import { WorkflowNodeSpecificResourceSettings } from "./types";

export class WorkflowNodeResource extends Resource<WorkflowNodeSpecificResourceSettings> {
  getWorkflowNodeInfo: GetWorkflowNodeInfo = () => {
    const { id, getResourcesFromSettings, settings } = this;

    const { workflowNodeTypeResource } = getResourcesFromSettings();

    const { workflowNodeTypeResourceId, properties } = settings;

    const { extraWorkflowNodeInfo } = (
      workflowNodeTypeResource as WorkflowNodeTypeResource
    ).getExtraWorkflowNodeInfo({
      workflowNodeProperties: properties,
    });

    const workflowNodeInfo = {
      ...extraWorkflowNodeInfo,
      id,
      workflowNodeTypeResourceId,
    };

    const res = {
      workflowNodeInfo,
    };

    return res;
  };
}
