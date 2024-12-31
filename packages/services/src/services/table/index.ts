import { ProTableProps } from "@ant-design/pro-components";
import { ISchema } from "@formily/json-schema";
import {
  RichJsonSchema,
  Service,
  ServiceLevel,
  SettingsSchema,
} from "@ldsg/core";
import { ObjectTypeComposerFieldConfigMapDefinition } from "graphql-compose";
import { composeMongoose, resolverFactory } from "graphql-compose-mongoose";
import _ from "lodash";
import mongoose, { SchemaDefinition } from "mongoose";
import { ServiceType } from "../../enum";
import {
  IncludeMongooseConnectionParams,
  IncludeSchemaComposerParams,
  JsonSchema,
  ModifyGraphQLSchema,
} from "../../types";
import {
  convertRichJsonSchemaToFormilySchema,
  convertRichJsonSchemaToJsonSchema,
} from "../../utils";
import { TABLE_SERVICE_DEFAULT_SETTINGS_SCHEMA } from "./constants";

export * from "./constants";

export type GetName = () => string;

type GetProComponentsSchema = () => ProTableProps<any, any>;

type GetRichJsonSchema = () => RichJsonSchema;

type GetJsonSchema = () => JsonSchema;

type GetFormilySchema = () => ISchema;

export class TableService extends Service {
  settingsSchema: SettingsSchema = TABLE_SERVICE_DEFAULT_SETTINGS_SCHEMA;

  getMongooseSchemaDefinition: () => SchemaDefinition = () => {
    const mongooseSchemaDefinition: SchemaDefinition = {};

    const fieldServices = this.getServices({
      level: ServiceLevel.CHILD,
      type: ServiceType.FIELD,
    });

    fieldServices.forEach((value) =>
      value.addPropertyToMongooseSchemaDefinition({
        mongooseSchemaDefinition,
      })
    );

    return mongooseSchemaDefinition;
  };

  getMongooseSchema = () => {
    const mongooseSchemaDefinition = this.getMongooseSchemaDefinition();

    const mongooseSchema = new mongoose.Schema(mongooseSchemaDefinition);

    return mongooseSchema;
  };

  getTableName: GetName = () => {
    const settings = this.getSettings();

    const tableName = settings.alias;

    return tableName;
  };

  getCamelCaseTableName: GetName = () => {
    const tableName = this.getTableName();

    const camelCaseTableName = _.camelCase(tableName);

    return camelCaseTableName;
  };

  getModelName: GetName = () => {
    const camelCaseTableName = this.getCamelCaseTableName();

    return _.upperFirst(camelCaseTableName);
  };

  addMongooseModel = (params: IncludeMongooseConnectionParams) => {
    const { connection } = params;

    const modelName = this.getModelName();

    const mongooseSchema = this.getMongooseSchema();

    const settings = this.getSettings();

    const collectionName = settings.collectionName;

    connection.model(modelName, mongooseSchema, collectionName, {
      overwriteModels: true,
    });
  };

  getMongooseConnectionModels = () => {
    const databaseService = this.getService({
      level: ServiceLevel.PEER,
      type: ServiceType.DATABASE,
    });

    const result = databaseService.getMongooseConnectionModels();

    return result;
  };

  getMongooseModel = () => {
    const models = this.getMongooseConnectionModels();

    const modelName = this.getModelName();

    return models[modelName];
  };

  syncIndexes = async () => {
    const mongooseModel = this.getMongooseModel();

    await mongooseModel.syncIndexes();
  };

  getObjectTypeComposer = (params: IncludeSchemaComposerParams) => {
    const { schemaComposer } = params;

    const mongooseModel = this.getMongooseModel();

    const customizationOptions = {
      schemaComposer,
    };

    const objectTypeComposer = composeMongoose(
      mongooseModel as any,
      customizationOptions
    );

    return objectTypeComposer;
  };

  modifyGraphQLSchema: ModifyGraphQLSchema = (params) => {
    const { schemaComposer } = params;

    const objectTypeComposer = this.getObjectTypeComposer(params);

    const fieldServices = this.getServices({
      level: ServiceLevel.CHILD,
      type: ServiceType.FIELD,
    });

    fieldServices.forEach((fieldService) =>
      fieldService.modifyGraphQLSchemaObjectType({ objectTypeComposer })
    );

    const resolverFactoryKeys = _.keys(resolverFactory);

    const allMutationResolverFactoryKeys: string[] = [
      "createOne",
      "createMany",
      "updateById",
      "updateOne",
      "updateMany",
      "removeById",
      "removeOne",
      "removeMany",
    ];

    const allQueryResolverFactoryKeys: string[] = [
      "findById",
      "findByIds",
      "findOne",
      "findMany",
      "dataLoader",
      "dataLoaderMany",
      "count",
      "connection",
      "pagination",
    ];

    const mutationNewFields: ObjectTypeComposerFieldConfigMapDefinition<
      any,
      any
    > = {};

    const queryNewFields: ObjectTypeComposerFieldConfigMapDefinition<any, any> =
      {};

    const tableName = this.getTableName();

    _.each(resolverFactoryKeys, (key) => {
      const fieldName = _.camelCase(`${tableName}-${key}`);

      if (allMutationResolverFactoryKeys.includes(key)) {
        mutationNewFields[fieldName] =
          // @ts-ignore
          objectTypeComposer.mongooseResolvers[key];
      } else if (allQueryResolverFactoryKeys.includes(key)) {
        // @ts-ignore
        queryNewFields[fieldName] = objectTypeComposer.mongooseResolvers[key];
      } else {
      }
    });

    schemaComposer.Mutation.addFields(mutationNewFields);

    schemaComposer.Query.addFields(queryNewFields);
  };

  /**
   * 获取 ProComponents 结构
   * @returns
   */
  getProComponentsSchema: GetProComponentsSchema = () => {
    const fieldServices = this.getServices({
      level: ServiceLevel.CHILD,
      type: ServiceType.FIELD,
    });

    const columns = fieldServices.map((value) =>
      value.getProComponentsSchemaColumn()
    );

    const result: ProTableProps<any, any> = {
      columns,
    };

    return result;
  };

  /**
   * 获取富 JSON 结构
   * @returns
   */
  getRichJsonSchema: GetRichJsonSchema = () => {
    const richJsonSchema: RichJsonSchema = {
      type: "object",
      properties: {},
    };

    const fieldServices = this.getServices({
      level: ServiceLevel.CHILD,
      type: ServiceType.FIELD,
    });

    _.each(fieldServices, (service) =>
      service.modifyRichJsonSchema(richJsonSchema)
    );

    return richJsonSchema;
  };

  /**
   * 获取 JSON 结构
   * @returns
   */
  getJsonSchema: GetJsonSchema = () => {
    const richJsonSchema = this.getRichJsonSchema();

    const convertRichJsonSchemaToJsonSchemaRes =
      convertRichJsonSchemaToJsonSchema({
        richJsonSchema,
      });

    const result = convertRichJsonSchemaToJsonSchemaRes.jsonSchema;

    return result;
  };

  /**
   * 获取 Formily 结构
   * @returns
   */
  getFormilySchema: GetFormilySchema = () => {
    const richJsonSchema = this.getRichJsonSchema();

    const convertRichJsonSchemaToFormilySchemaRes =
      convertRichJsonSchemaToFormilySchema({
        richJsonSchema,
      });

    const result = convertRichJsonSchemaToFormilySchemaRes.formilySchema;

    return result;
  };
}
