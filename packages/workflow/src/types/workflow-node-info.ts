type WorkflowNodeExecuterExecute = () => any | Promise<any>;

type NodeId = string;

type WorkflowVariables = Record<NodeId, any>;

interface WorkflowNodeExecuterConstructorParams {
  nodeId: NodeId;

  workflowVariables: WorkflowVariables;
}

export class WorkflowNodeExecuter
  implements WorkflowNodeExecuterConstructorParams
{
  nodeId: NodeId;

  workflowVariables: WorkflowVariables;

  constructor(params: WorkflowNodeExecuterConstructorParams) {
    const { nodeId, workflowVariables } = params;

    this.nodeId = nodeId;
    this.workflowVariables = workflowVariables;
  }

  execute: WorkflowNodeExecuterExecute = () => {
    const { nodeId, workflowVariables } = this;

    console.debug("WorkflowNodeExecuter execute nodeId", nodeId);

    console.debug(
      "WorkflowNodeExecuter execute workflowVariables",
      workflowVariables
    );
  };
}

export interface WorkflowNodeInfo {
  /**
   * ID
   */
  id: string;

  /**
   * Workflow Node Type Resource ID
   */
  workflowNodeTypeResourceId: string;

  /**
   * Executer
   */
  Executer: typeof WorkflowNodeExecuter;
}

export interface GetWorkflowNodeInfoRes {
  /**
   * Workflow Node Info
   */
  workflowNodeInfo: WorkflowNodeInfo;
}

export type GetWorkflowNodeInfo = () => GetWorkflowNodeInfoRes;
