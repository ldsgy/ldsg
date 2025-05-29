import {
  NodeId,
  NodeIdToOutputVariablesMap,
  NodeVariables,
} from "./node-variables";

export type WorkflowNodeExecuterExecute = () => Promise<void>;

interface WorkflowNodeExecuterConstructorParams {
  nodeId: NodeId;

  nodeIdToOutputVariablesMap: NodeIdToOutputVariablesMap;
}

interface SetOutputVariablesParams {
  outputVariables: NodeVariables;
}

type SetOutputVariables = (params: SetOutputVariablesParams) => void;

export class WorkflowNodeExecuter
  implements WorkflowNodeExecuterConstructorParams
{
  nodeId: NodeId;

  nodeIdToOutputVariablesMap: NodeIdToOutputVariablesMap;

  constructor(params: WorkflowNodeExecuterConstructorParams) {
    const { nodeId, nodeIdToOutputVariablesMap } = params;

    this.nodeId = nodeId;
    this.nodeIdToOutputVariablesMap = nodeIdToOutputVariablesMap;
  }

  /**
   * Set Current Node Output Variables
   */
  setOutputVariables: SetOutputVariables = (params) => {
    const { outputVariables } = params;

    const { nodeId, nodeIdToOutputVariablesMap } = this;

    nodeIdToOutputVariablesMap[nodeId] = outputVariables;
  };

  execute: WorkflowNodeExecuterExecute = async () => {
    const { nodeId, nodeIdToOutputVariablesMap } = this;

    console.debug("WorkflowNodeExecuter execute nodeId", nodeId);

    console.debug(
      "WorkflowNodeExecuter execute nodeIdToOutputVariablesMap",
      nodeIdToOutputVariablesMap
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
