import { Service, ServiceLevel, SettingsSchema } from "@ldsg/core";
import Redis from "ioredis";
import _ from "lodash";
import mongoose, { SchemaDefinition } from "mongoose";
import { ServiceType } from "../../enum";
import { IncludeMongooseConnectionParams } from "../../types";
import { GetName } from "../table";
import {
  KEY_VALUE_STORAGE_SERVICE_DEFAULT_KEY_PATH,
  KEY_VALUE_STORAGE_SERVICE_DEFAULT_SETTINGS_SCHEMA,
  KEY_VALUE_STORAGE_SERVICE_DEFAULT_VALUE_PATH,
  KEY_VALUE_STORAGE_SERVICE_MONGOOSE_SCHEMA_DEFINITION,
} from "./constants";

export * from "./constants";

type Clear = () => Promise<void>;

type GetItem = (key: string) => Promise<string | null>;

type RemoveItem = (key: string) => Promise<void>;

type SetItem = (key: string, value: string) => Promise<void>;

export interface KeyValueStorage {
  clear: Clear;
  getItem: GetItem;
  removeItem: RemoveItem;
  setItem: SetItem;
}

export type GetKeyValueStorage = () => KeyValueStorage;

/**
 * Key-Value 存储服务
 */
export class KeyValueStorageService extends Service {
  settingsSchema: SettingsSchema =
    KEY_VALUE_STORAGE_SERVICE_DEFAULT_SETTINGS_SCHEMA;

  appendToContext = (context: any) => {
    context.keyValueStorage = this.getKeyValueStorage();
  };

  getPrefix = () => {
    const { path: prefix } = this.getUriInfo();

    if (!prefix) {
      throw new Error(
        "prefix in settings of KeyValueStorageService is required"
      );
    }

    const res = { prefix };

    return res;
  };

  getKeyValueStorage: GetKeyValueStorage = () => {
    const { scheme } = this.getUriInfo();

    let clear: Clear;

    let getItem: GetItem;

    let removeItem: RemoveItem;

    let setItem: SetItem;

    switch (scheme) {
      case "database": {
        const mongooseModel = this.getMongooseModel();

        clear = async () => {
          await mongooseModel.deleteMany();
        };

        const getFilter = (key: string): mongoose.FilterQuery<any> => ({
          [KEY_VALUE_STORAGE_SERVICE_DEFAULT_KEY_PATH]: key,
        });

        getItem = async (key) => {
          const findOneRes = await mongooseModel.findOne(getFilter(key));

          const res = _.get(
            findOneRes,
            KEY_VALUE_STORAGE_SERVICE_DEFAULT_VALUE_PATH
          );

          return res;
        };

        removeItem = async (key) => {
          await mongooseModel.deleteOne(getFilter(key));
        };

        setItem = async (key, value) => {
          await mongooseModel.updateOne(
            getFilter(key),
            {
              [KEY_VALUE_STORAGE_SERVICE_DEFAULT_KEY_PATH]: key,
              [KEY_VALUE_STORAGE_SERVICE_DEFAULT_VALUE_PATH]: value,
            },
            {
              upsert: true,
            }
          );
        };

        break;
      }

      case "redis": {
        const redis = this.getRedis();

        const { prefix } = this.getPrefix();

        clear = async () => {};

        getItem = async (key) => {
          return redis.get(`${prefix}:${key}`);
        };

        removeItem = async (key) => {
          await redis.del(`${prefix}:${key}`);
        };

        setItem = async (key, value) => {
          await redis.set(`${prefix}:${key}`, value);
        };

        break;
      }

      default: {
        throw new Error("invalid type in settings of KeyValueStorageService");
      }
    }

    const res: KeyValueStorage = {
      clear,
      getItem,
      removeItem,
      setItem,
    };

    return res;
  };

  getRedis = () => {
    const settings = this.getSettings();

    const { url } = settings;

    const redis = new Redis(url);

    return redis;
  };

  getTableName: GetName = () => {
    const { prefix } = this.getPrefix();

    const tableName = prefix;

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

  getMongooseSchemaDefinition: () => SchemaDefinition = () => {
    const mongooseSchemaDefinition: SchemaDefinition =
      KEY_VALUE_STORAGE_SERVICE_MONGOOSE_SCHEMA_DEFINITION;

    return mongooseSchemaDefinition;
  };

  getMongooseSchema = () => {
    const mongooseSchemaDefinition = this.getMongooseSchemaDefinition();

    const mongooseSchema = new mongoose.Schema(mongooseSchemaDefinition);

    return mongooseSchema;
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
}
