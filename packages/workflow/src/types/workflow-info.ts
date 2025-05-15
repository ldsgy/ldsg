import { GetEndNodeOutputVariablesRes } from "../utils";

export type WorkflowExecute = () => Promise<GetEndNodeOutputVariablesRes>;

export interface WorkflowInfo {
  execute: WorkflowExecute;
}
