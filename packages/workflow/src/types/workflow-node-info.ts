import { NodeId, NodeIdToVariablesMap, NodeVariables } from "./node-variables";

export type WorkflowNodeExecuterExecute = () => void | Promise<void>;

interface WorkflowNodeExecuterConstructorParams {
  nodeId: NodeId;

  nodeIdToVariablesMap: NodeIdToVariablesMap;
}

interface SetOutputVariablesParams {
  outputVariables: NodeVariables;
}

type SetOutputVariables = (params: SetOutputVariablesParams) => void;

export class WorkflowNodeExecuter
  implements WorkflowNodeExecuterConstructorParams
{
  nodeId: NodeId;

  nodeIdToVariablesMap: NodeIdToVariablesMap;

  constructor(params: WorkflowNodeExecuterConstructorParams) {
    const { nodeId, nodeIdToVariablesMap } = params;

    this.nodeId = nodeId;
    this.nodeIdToVariablesMap = nodeIdToVariablesMap;
  }

  /**
   * Set Current Node Output Variables
   */
  setOutputVariables: SetOutputVariables = (params) => {
    const { outputVariables } = params;

    const { nodeId, nodeIdToVariablesMap } = this;

    nodeIdToVariablesMap[nodeId] = outputVariables;
  };

  execute: WorkflowNodeExecuterExecute = () => {
    const { nodeId, nodeIdToVariablesMap } = this;

    console.debug("WorkflowNodeExecuter execute nodeId", nodeId);

    console.debug(
      "WorkflowNodeExecuter execute nodeIdToVariablesMap",
      nodeIdToVariablesMap
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
