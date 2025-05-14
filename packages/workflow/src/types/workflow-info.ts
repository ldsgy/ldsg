import { WorkflowEdgeInfo } from "./workflow-edge-info";
import { WorkflowNodeInfo } from "./workflow-node-info";

export interface WorkflowInfo {
  edges: WorkflowEdgeInfo[];
  nodes: WorkflowNodeInfo[];
}
