import {
  endWorkflowNodeTypeHandlerResourceRecord,
  endWorkflowNodeTypeResourceRecord,
} from "./end";
import {
  startWorkflowNodeTypeHandlerResourceRecord,
  startWorkflowNodeTypeResourceRecord,
} from "./start";

export * from "./end";
export * from "./start";

export const WORKFLOW_NODE_TYPE_RESOURCE_RECORDS = [
  endWorkflowNodeTypeResourceRecord,
  endWorkflowNodeTypeHandlerResourceRecord,
  startWorkflowNodeTypeResourceRecord,
  startWorkflowNodeTypeHandlerResourceRecord,
];
