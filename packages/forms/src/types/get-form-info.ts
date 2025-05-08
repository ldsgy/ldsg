import { ObjectInfo } from "@ldsg/object";
import { GeneralResourceSettings } from "@ldsg/types";

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
}

export type GetFormInfo = (params: PlatformParams) => FormInfo;
