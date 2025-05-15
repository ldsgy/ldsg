import { GetEndNodeOutputVariablesRes } from "../utils";
import { NodeOutputVariables } from "./output-variables";

export interface WorkflowExecuteParams {
  startNodeOutputVariables: NodeOutputVariables;
}

export interface WorkflowExecuteRes {
  endNodeOutputVariables: NodeOutputVariables;
}

export type WorkflowExecute = (
  params: WorkflowExecuteParams
) => Promise<GetEndNodeOutputVariablesRes>;

export interface WorkflowInfo {
  execute: WorkflowExecute;
}
