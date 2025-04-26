import { ProColumns } from "@ant-design/pro-components";
import { ISchema, Schema } from "@formily/json-schema";
import { RichJsonSchema } from "@ldsg/core";
import {
  InputTypeComposer,
  InputTypeComposerDefinition,
  InputTypeComposerFieldConfigDefinition,
  InputTypeComposerFieldConfigMapDefinition,
  ObjectTypeComposer,
  ObjectTypeComposerDefinition,
  ObjectTypeComposerFieldConfigDefinition,
  ObjectTypeComposerFieldConfigMapDefinition,
  ResolverDefinition,
} from "graphql-compose";
import { ObjectTypeComposerWithMongooseResolvers } from "graphql-compose-mongoose";
import mongoose, { SchemaDefinition, SchemaDefinitionProperty } from "mongoose";
import { FieldService } from ".";
import { IncludeSchemaComposerParams, JsonSchema } from "../../types";
import { FieldType } from "./enum";

export type GetOutputType = (
  params: IncludeSchemaComposerParams
) => ResolverDefinition<any, any, any>["type"];

export type GetMongooseSchemaDefinitionProperty =
  () => SchemaDefinitionProperty;

export interface AddPropertyToMongooseSchemaDefinitionParams {
  mongooseSchemaDefinition: SchemaDefinition;
}

export type AddPropertyToMongooseSchemaDefinition = (
  params: AddPropertyToMongooseSchemaDefinitionParams
) => void;

export interface AddPropertyToJsonSchemaParams {
  schema: JsonSchema;
}

export type AddPropertyToJsonSchema = (
  params: AddPropertyToJsonSchemaParams
) => void;

export interface AddPropertyToFormilySchemaParams {
  schema: Schema;
}

export type AddPropertyToFormilySchema = (
  params: AddPropertyToFormilySchemaParams
) => void;

export type GetInputTypeComposerFieldConfigDefinition =
  () => InputTypeComposerFieldConfigDefinition;

export interface AddInputTypeComposerFieldConfigDefinitionParams {
  fieldConfigMapDefinition: InputTypeComposerFieldConfigMapDefinition;
}

export type AddInputTypeComposerFieldConfigDefinition = (
  params: AddInputTypeComposerFieldConfigDefinitionParams
) => void;

export type GetObjecTypeComposerFieldConfigDefinition =
  () => ObjectTypeComposerFieldConfigDefinition<any, any, any>;

export interface AddObjectTypeComposerFieldConfigMapDefinitionParams {
  fieldConfigMapDefinition: ObjectTypeComposerFieldConfigMapDefinition<
    any,
    any
  >;
}

export type AddObjectTypeComposerFieldConfigMapDefinition = (
  params: AddObjectTypeComposerFieldConfigMapDefinitionParams
) => void;

export interface FieldTypeInfo {
  name: string;
  description: string;
  camelCaseFieldName: string;
  type: FieldType;
  required: boolean;
  unique: boolean;
  multiple: boolean;
}

export type GetProComponentsSchemaColumn = () => ProColumns;

export type ModifyGraphQLSchemaObjectType = (params: {
  objectTypeComposer: ObjectTypeComposerWithMongooseResolvers<
    mongoose.Document<any, any, any>,
    any
  >;
}) => void;

export type ModifyRichJsonSchema = (richJsonSchema: RichJsonSchema) => void;

export type GetInputITCFieldConfigMapDefinition =
  () => InputTypeComposerFieldConfigMapDefinition;

export type GetOutputOTCFieldConfigMapDefinition =
  () => ObjectTypeComposerFieldConfigMapDefinition<any, any>;

export type GetInputITCDefinition = () => InputTypeComposerDefinition;

export type GetOutputOTCDefinition = () => ObjectTypeComposerDefinition<
  any,
  any
>;

export type GetInputITC = (
  params: IncludeSchemaComposerParams
) => InputTypeComposer<any>;

export type GetOutputOTC = (
  params: IncludeSchemaComposerParams
) => ObjectTypeComposer<any, any>;

export interface IsInputArgumentInfo {
  isInputArgument: boolean;
}

export type GetChildFieldServices = (
  params: IsInputArgumentInfo
) => FieldService[];

export type GetRichJsonSchema = (params: IsInputArgumentInfo) => RichJsonSchema;

export type GetJsonSchema = (params: IsInputArgumentInfo) => JsonSchema;

export type GetFormilySchema = (params: IsInputArgumentInfo) => ISchema;
