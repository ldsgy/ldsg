import { FieldType } from "./field-type-info";

export interface PlatformParams {
  /**
   * Platform
   * Such as mongoose\formily.
   */
  platform: string;
}

interface GetFieldTypeParams extends PlatformParams {
  /**
   * Field Properties
   */
  fieldProperties: any;
}

export type GetFieldType = (parmas: GetFieldTypeParams) => FieldType;

export type FieldTypeResourceHandler = GetFieldType;
