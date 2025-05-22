export enum FieldTypeBasePlatform {
  COMMON = "COMMON",
  GRAPHQL = "GRAPHQL",
  JSON = "JSON",
  MONGOOSE = "MONGOOSE",
}

export type FieldTypePlatform = FieldTypeBasePlatform | string;

export type FieldType = any;

export type PlatformToTypeMap = Record<FieldTypePlatform, FieldType>;

export interface FieldTypeInfo {
  platformToTypeMap: PlatformToTypeMap;
}
