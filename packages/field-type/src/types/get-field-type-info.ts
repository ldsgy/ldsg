export interface PlatformParams {
  /**
   * Platform
   * Such as mongoose\formily.
   */
  platform?: string;
}

export interface GetFieldTypeInfoParams extends PlatformParams {
  /**
   * Field Properties
   */
  fieldProperties: any;
}

export type GetFieldTypeInfo = (params: GetFieldTypeInfoParams) => any;
