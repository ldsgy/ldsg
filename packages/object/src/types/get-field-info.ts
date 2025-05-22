import { FieldTypeInfo, PlatformsParams } from "@ldsg/field-type";
import { GeneralResourceSettings } from "@ldsg/types";

export interface FieldInfo extends GeneralResourceSettings {
  /**
   * Field ID
   */
  id: string;

  /**
   * Field Name
   */
  name: string;

  /**
   * Field Type Info
   */
  typeInfo: FieldTypeInfo;
}

interface GetFieldInfoRes {
  fieldInfo: FieldInfo;
}

export type GetFieldInfo = (params?: PlatformsParams) => GetFieldInfoRes;
