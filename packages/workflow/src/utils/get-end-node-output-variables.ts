import { NodeIdToOutputVariablesMap, NodeOutputVariables } from "../resource";
import { WorkflowNodeInfo } from "../types";

export interface GetEndNodeOutputVariablesParams {
  endNode: WorkflowNodeInfo;
  nodeIdToOutputVariablesMap: NodeIdToOutputVariablesMap;
}

export interface GetEndNodeOutputVariablesRes {
  endNodeOutputVariables: NodeOutputVariables;
}

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
