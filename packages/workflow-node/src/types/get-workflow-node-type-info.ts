export interface GetWorkflowNodeInfoParams {
  /**
   * Workflow Node Properties
   */
  workflowNodeProperties: any;
}

export interface WorkflowNodeInfo {
  execute: (params: any) => any | Promise<any>;
}

export interface GetWorkflowNodeInfoRes {
  /**
   * Workflow Node Type Info
   */
  workflowNodeInfo: WorkflowNodeInfo;
}

export type GetWorkflowNodeInfo = (
  params: GetWorkflowNodeInfoParams
) => GetWorkflowNodeInfoRes;
