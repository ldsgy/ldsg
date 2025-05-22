import { PlatformsParams } from "@ldsg/field-type";
import { ObjectInfo } from "@ldsg/object";
import { GeneralResourceSettings } from "@ldsg/types";
import { WorkflowInfo } from "@ldsg/workflow";

export interface FormInfo extends GeneralResourceSettings {
  /**
   * Form ID
   */
  id: string;

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

export type GetFormInfo = (params?: PlatformsParams) => FormInfo;
