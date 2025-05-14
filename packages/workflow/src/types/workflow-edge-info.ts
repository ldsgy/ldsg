export interface WorkflowEdgeInfo {
  /**
   * 开始工作流节点资源ID
   */
  sourceWorkflowNodeResourceId: string;

  /**
   * 开始工作流节点端口ID
   * 缺省则采用开始节点的默认端口
   */
  sourceWorkflowNodePortId?: string;

  /**
   * 目标工作流节点资源ID
   */
  targetWorkflowNodeResourceId: string;

  /**
   * 目标工作流节点端口ID
   * 缺省则采用目标节点的默认端口
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
