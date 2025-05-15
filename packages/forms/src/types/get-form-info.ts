import { ObjectInfo } from "@ldsg/object";
import { GeneralResourceSettings } from "@ldsg/types";
import { WorkflowInfo } from "@ldsg/workflow";

export interface PlatformParams {
  /**
   * Platform
   * Such as mongoose\formily.
   */
  platform: string;
}

export interface FormInfo extends GeneralResourceSettings {
  /**
   * Form Name
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

export type GetFormInfo = (params: PlatformParams) => FormInfo;
