import { PlatformsParams } from "@ldsg/field-type";
import { ObjectInfo } from "@ldsg/object";
import { GeneralResourceSettings } from "@ldsg/types";

export interface TableInfo extends GeneralResourceSettings {
  /**
   * Table Name
   */
  name: string;

  /**
   * Object Info
   */
  objectInfo: ObjectInfo;
}

export type GetTableInfo = (params?: PlatformsParams) => TableInfo;
