import { WorkflowNodeInfo } from "@ldsg/workflow";

export interface GetWorkflowNodeInfoWithPropertiesParams {
  /**
   * Workflow Node Properties
   */
  workflowNodeProperties: any;
}

export interface GetWorkflowNodeInfoWithPropertiesRes {
  /**
   * Workflow Node Type Info
   */
  workflowNodeInfo: WorkflowNodeInfo;
}

export type GetWorkflowNodeInfoWithProperties = (
  params: GetWorkflowNodeInfoWithPropertiesParams
) => GetWorkflowNodeInfoWithPropertiesRes;
