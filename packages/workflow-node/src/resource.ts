import { Resource } from "@ldsg/resource";
import { GetWorkflowNodeInfo } from "@ldsg/workflow";
import { WorkflowNodeTypeResource } from "@ldsg/workflow-node-type";
import { WorkflowNodeSpecificResourceSettings } from "./types";

export class WorkflowNodeResource extends Resource<WorkflowNodeSpecificResourceSettings> {
  getWorkflowNodeInfo: GetWorkflowNodeInfo = () => {
    const { id, getResourcesFromSettings, settings } = this;

    const { workflowNodeTypeResource } = getResourcesFromSettings();

    const { workflowNodeTypeResourceId, properties } = settings;

    const { getExtraWorkflowNodeInfo } =
      workflowNodeTypeResource as WorkflowNodeTypeResource;

    if (!getExtraWorkflowNodeInfo) {
      throw new Error(
        "invalid get extra workflow node info in workflow node type resource"
      );
    }

    const { extraWorkflowNodeInfo } = getExtraWorkflowNodeInfo({
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
