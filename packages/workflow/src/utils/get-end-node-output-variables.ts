import {
  NodeIdToVariablesMap,
  WorkflowExecuteRes,
  WorkflowNodeInfo,
} from "../types";

export interface GetEndNodeOutputVariablesParams {
  endNode: WorkflowNodeInfo;
  nodeIdToVariablesMap: NodeIdToVariablesMap;
}

export interface GetEndNodeOutputVariablesRes extends WorkflowExecuteRes {}

export type GetEndNodeOutputVariables = (
  params: GetEndNodeOutputVariablesParams
) => GetEndNodeOutputVariablesRes;

export const getEndNodeOutputVariables: GetEndNodeOutputVariables = (
  params
) => {
  const { endNode, nodeIdToVariablesMap } = params;

  const endNodeOutputVariables = nodeIdToVariablesMap.get(endNode.id);

  const res = {
    endNodeOutputVariables,
  };

  return res;
};
