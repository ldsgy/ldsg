import { ISchema } from "@formily/json-schema";
import { JSONSchema7 } from "json-schema";
import URI from "uri-js";
import { Service } from ".";
import { ServiceLevel } from "./enum";

type PickStartWithXProperties<T> = Pick<
  T,
  { [K in keyof T]: K extends `x-${string}` ? K : never }[keyof T]
>;

export interface RichJsonSchemaOption {
  label: string;
  value: string;
}

export type RichJsonSchemaOptions = RichJsonSchemaOption[];

export type RichJsonSchema = Omit<JSONSchema7, "properties"> &
  PickStartWithXProperties<ISchema> & {
    properties?: Record<string, RichJsonSchema>;
    options?: RichJsonSchemaOptions;
    items?: RichJsonSchema;
  };

export type Settings = Record<string, any>;

export type SettingsSchema = RichJsonSchema;

export interface ServiceProperties {
  /**
   * id
   */
  id?: string;

  /**
   * type
   */
  type?: string;

  /**
   * parent id
   */
  parentId?: string;

  /**
   * settings
   */
  settings?: Settings;

  /**
   * settings schema
   */
  settingsSchema?: SettingsSchema;

  /**
   * services
   */
  services?: Service[];

  [key: string]: any;
}

export type GetSettings = () => Settings;

export type GetSettingsSchema = () => SettingsSchema;

interface GetServiceParams extends ServiceProperties {
  level?: ServiceLevel;
}

/**
 * get service
 */
export type GetService = (params?: GetServiceParams) => Service;

/**
 * get services
 */
export type GetServices = (params?: GetServiceParams) => Service[];

export interface GetPropertyParams {
  /**
   * 名称
   */
  name: string;

  /**
   * 参数
   * 函数类型属性参数可能需要使用
   */
  params?: Record<string, any>;
}

export type GetProperty = (params: GetPropertyParams) => any;

export type GetUriInfo = () => URI.URIComponents;
