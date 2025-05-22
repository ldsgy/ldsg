import { endWorkflowNodeTypeResourceRecord } from "./end";
import { startWorkflowNodeTypeResourceRecord } from "./start";

export * from "./end";
export * from "./start";

export const WORKFLOW_NODE_TYPE_RESOURCE_RECORD_LIST = [
  endWorkflowNodeTypeResourceRecord,
  startWorkflowNodeTypeResourceRecord,
];
