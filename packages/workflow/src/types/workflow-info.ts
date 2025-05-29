import { GetEndNodeOutputVariablesRes } from "../utils";
import { NodeVariables } from "./node-variables";

export interface WorkflowExecuteParams {
  startNodeInputVariables: NodeVariables;
}

export interface WorkflowExecuteRes {
  endNodeOutputVariables: NodeVariables;
}

export type WorkflowExecute = (
  params: WorkflowExecuteParams
) => Promise<GetEndNodeOutputVariablesRes>;

export interface WorkflowInfo {
  execute: WorkflowExecute;
}
