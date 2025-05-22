import { FieldType, FieldTypePlatform } from "./field-type-info";

export interface PlatformParams {
  /**
   * Platform
   * Such as mongoose\formily.
   */
  platform: FieldTypePlatform;
}

interface GetFieldTypeParams extends PlatformParams {
  /**
   * Field Properties
   */
  fieldProperties: any;
}

export type GetFieldType = (parmas: GetFieldTypeParams) => FieldType;

export type FieldTypeResourceHandler = GetFieldType;
