import { PlatformParams } from "@ldsg/field-type";
import { ObjectInfo } from "@ldsg/object";
import { GeneralResourceSettings } from "@ldsg/types";
import { WorkflowInfo } from "@ldsg/workflow";

export interface TableInfo extends GeneralResourceSettings {
  /**
   * Table Name
   */
  name: string;

  /**
   * Input Object Info
   */
  inputObjectInfo: ObjectInfo;

  /**
   * Output Object Info
   */
  outputObjectInfo: ObjectInfo;

  /**
   * Workflow Info
   */
  workflowInfo: WorkflowInfo;
}

export type GetTableInfo = (params: PlatformParams) => TableInfo;
