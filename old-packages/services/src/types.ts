import { Service } from "@ldsg/core";
import { SchemaComposer } from "graphql-compose";
import mongoose from "mongoose";
import { ServiceType } from "./enum";
import {
  CustomService,
  DatabaseService,
  FieldService,
  HandlerService,
  HttpService,
  KeyValueStorageService,
  MiddlewareService,
  TableService,
} from "./services";

export { JSONSchema7 as JsonSchema } from "json-schema";

export interface IncludeMongooseConnectionParams {
  connection: mongoose.Connection;
}

export interface IncludeSchemaComposerParams {
  schemaComposer: SchemaComposer;
}

export type ModifyGraphQLSchema = (params: IncludeSchemaComposerParams) => void;

export interface ServiceMap {
  [ServiceType.CUSTOM]: CustomService;
  [ServiceType.DATABASE]: DatabaseService;
  [ServiceType.FIELD]: FieldService;
  [ServiceType.HTTP]: HttpService;
  [ServiceType.HANDLER]: HandlerService;
  [ServiceType.KEY_VALUE_STORAGE]: KeyValueStorageService;
  [ServiceType.MIDDLEWARE]: MiddlewareService;
  [ServiceType.TABLE]: TableService;
  [ServiceType.SERVICE]: Service;
}

export type KeyOfServiceMap = keyof ServiceMap;

export type ServiceMapValue<T extends KeyOfServiceMap> = ServiceMap[T];
