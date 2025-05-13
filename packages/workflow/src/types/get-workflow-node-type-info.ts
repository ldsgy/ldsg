export interface GetWorkflowNodeTypeInfoParams {
  /**
   * Workflow Node Properties
   */
  workflowNodeProperties: any;
}

export interface WorkflowNodeTypeInfo {
  execute: (params: any) => any | Promise<any>;
}

export interface GetWorkflowNodeTypeInfoRes {
  /**
   * Workflow Node Type Info
   */
  workflowNodeTypeInfo: WorkflowNodeTypeInfo;
}

export type GetWorkflowNodeTypeInfo = (
  params: GetWorkflowNodeTypeInfoParams
) => GetWorkflowNodeTypeInfoRes;
