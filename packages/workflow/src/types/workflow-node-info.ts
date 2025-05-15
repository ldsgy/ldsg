import {
  NodeId,
  NodeIdToOutputVariablesMap,
  NodeOutputVariables,
} from "./output-variables";

type WorkflowNodeExecuterExecute = () => any | Promise<any>;

interface WorkflowNodeExecuterConstructorParams {
  nodeId: NodeId;

  nodeIdToOutputVariablesMap: NodeIdToOutputVariablesMap;
}

interface SetOutputVariablesParams {
  outputVariables: NodeOutputVariables;
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
   * Set Node Output Variables
   */
  setOutputVariables: SetOutputVariables = (params) => {
    const { outputVariables } = params;

    const { nodeId, nodeIdToOutputVariablesMap } = this;

    nodeIdToOutputVariablesMap[nodeId] = outputVariables;
  };

  execute: WorkflowNodeExecuterExecute = () => {
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
