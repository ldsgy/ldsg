export interface WorkflowEdgeInfo {
  /**
   * 起点工作流节点资源ID
   */
  sourceWorkflowNodeResourceId: string;

  /**
   * 起点工作流节点端口ID
   */
  sourceWorkflowNodePortId?: string;

  /**
   * 目标工作流节点资源ID
   */
  targetWorkflowNodeResourceId: string;

  /**
   * 目标工作流节点端口ID
   */
  targetWorkflowNodePortId?: string;
}

export interface GetWorkflowEdgeInfoRes {
  /**
   * Workflow Edge Info
   */
  workflowEdgeInfo: WorkflowEdgeInfo;
}

export type GetWorkflowEdgeInfo = () => GetWorkflowEdgeInfoRes;
