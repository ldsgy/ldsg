import { NodeId, NodeIdToVariablesMap, NodeVariables } from "./node-variables";

export type WorkflowNodeExecuterExecute = () => void | Promise<void>;

interface WorkflowNodeExecuterConstructorParams {
  nodeId: NodeId;

  nodeIdToVariablesMap: NodeIdToVariablesMap;

  /**
   * input variables
   * only in start node
   */
  inputVariables?: any;
}

interface SetVariablesParams {
  variables: NodeVariables;
}

type SetVariables = (params: SetVariablesParams) => void;

export class WorkflowNodeExecuter
  implements WorkflowNodeExecuterConstructorParams
{
  nodeId: NodeId;

  nodeIdToVariablesMap: NodeIdToVariablesMap;

  /**
   * input variables
   * only in start node
   */
  inputVariables?: any;

  constructor(params: WorkflowNodeExecuterConstructorParams) {
    const { nodeId, nodeIdToVariablesMap, inputVariables } = params;

    this.nodeId = nodeId;
    this.nodeIdToVariablesMap = nodeIdToVariablesMap;
    this.inputVariables = inputVariables;
  }

  /**
   * Set Current Node Output Variables
   */
  setVariables: SetVariables = (params) => {
    const { variables } = params;

    const { nodeId, nodeIdToVariablesMap } = this;

    nodeIdToVariablesMap[nodeId] = variables;
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
