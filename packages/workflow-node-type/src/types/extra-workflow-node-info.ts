import { WorkflowNodeInfo } from "@ldsg/workflow";

export interface GetExtraWorkflowNodeInfoParams {
  /**
   * Workflow Node Properties
   */
  workflowNodeProperties: any;
}

export type ExtraWorkflowNodeInfo = Pick<WorkflowNodeInfo, "Executer">;

export interface GetExtraWorkflowNodeInfoRes {
  /**
   * Extra Workflow Node Info
   */
  extraWorkflowNodeInfo: ExtraWorkflowNodeInfo;
}

export type GetExtraWorkflowNodeInfo = (
  params: GetExtraWorkflowNodeInfoParams
) => GetExtraWorkflowNodeInfoRes;
