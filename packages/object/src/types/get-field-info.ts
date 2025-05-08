import { PlatformParams } from "@ldsg/field-type";
import { GeneralResourceSettings } from "@ldsg/types";

export interface FieldInfo extends GeneralResourceSettings {
  /**
   * Field Name
   */
  name: string;

  /**
   * Type Info
   */
  typeInfo: any;
}

interface GetFieldInfoRes {
  fieldInfo: FieldInfo;
}

export type GetFieldInfo = (params: PlatformParams) => GetFieldInfoRes;
