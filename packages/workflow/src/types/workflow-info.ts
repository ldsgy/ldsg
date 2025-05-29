import { GetEndNodeOutputVariablesRes } from "../utils";
import { NodeVariables } from "./node-variables";

export interface WorkflowExecuteParams {
  startNodeOutputVariables: NodeVariables;
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
