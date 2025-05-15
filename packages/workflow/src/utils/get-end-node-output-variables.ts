import {
  NodeIdToOutputVariablesMap,
  WorkflowExecuteRes,
  WorkflowNodeInfo,
} from "../types";

export interface GetEndNodeOutputVariablesParams {
  endNode: WorkflowNodeInfo;
  nodeIdToOutputVariablesMap: NodeIdToOutputVariablesMap;
}

export interface GetEndNodeOutputVariablesRes extends WorkflowExecuteRes {}

export type GetEndNodeOutputVariables = (
  params: GetEndNodeOutputVariablesParams
) => GetEndNodeOutputVariablesRes;

export const getEndNodeOutputVariables: GetEndNodeOutputVariables = (
  params
) => {
  const { endNode, nodeIdToOutputVariablesMap } = params;

  const endNodeOutputVariables = nodeIdToOutputVariablesMap[endNode.id];

  const res = {
    endNodeOutputVariables,
  };

  return res;
};
