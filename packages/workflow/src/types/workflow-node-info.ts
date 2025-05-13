export interface WorkflowNodeInfo {
  execute: (params: any) => any | Promise<any>;
}

export interface GetWorkflowNodeInfoRes {
  /**
   * Workflow Node Info
   */
  workflowNodeInfo: WorkflowNodeInfo;
}

export type GetWorkflowNodeInfo = () => GetWorkflowNodeInfoRes;
