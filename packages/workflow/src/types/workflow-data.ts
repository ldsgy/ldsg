import { WorkflowEdgeInfo } from "./workflow-edge-info";
import { WorkflowNodeInfo } from "./workflow-node-info";

export interface WorkflowData {
  edges: WorkflowEdgeInfo[];
  nodes: WorkflowNodeInfo[];
}
