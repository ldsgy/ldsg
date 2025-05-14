import { endWorkflowNodeTypeResource } from "./end";
import { startWorkflowNodeTypeResource } from "./start";

export * from "./end";
export * from "./start";

export const WORKFLOW_NODE_TYPE_RESOURCE_LIST = [
  startWorkflowNodeTypeResource,
  endWorkflowNodeTypeResource,
];
