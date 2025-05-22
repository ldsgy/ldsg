import { FieldTypeInfo, FieldTypePlatform } from "./field-type-info";

export interface PlatformsParams {
  /**
   * Platforms
   */
  platforms?: FieldTypePlatform[];

  /**
   * Extra Platforms
   */
  extraPlatforms?: FieldTypePlatform[];
}

export interface GetFieldTypeInfoParams extends PlatformsParams {
  /**
   * Field Properties
   */
  fieldProperties: any;
}

export interface GetFieldTypeInfoRes {
  fieldTypeInfo: FieldTypeInfo;
}

export type GetFieldTypeInfo = (
  params: GetFieldTypeInfoParams
) => GetFieldTypeInfoRes;
