import { ObjectInfo } from "@ldsg/object";
import {
  composeMongoose,
  ObjectTypeComposerWithMongooseResolvers,
} from "graphql-compose-mongoose";
import _ from "lodash";
import mongoose, { SchemaDefinition } from "mongoose";

interface GetObjectTypeComposerParams {
  tableName: string;
  objectInfo: ObjectInfo;
}

interface GetObjectTypeComposerRes {
  objectTypeComposer: ObjectTypeComposerWithMongooseResolvers<
    mongoose.Document<any, any, any>,
    any
  >;
}

type GetObjectTypeComposer = (
  params: GetObjectTypeComposerParams
) => GetObjectTypeComposerRes;

export const getObjectTypeComposer: GetObjectTypeComposer = (params) => {
  const { tableName, objectInfo } = params;

  const { fieldInfoList } = objectInfo;

  const mongooseSchemaDefinition: SchemaDefinition = {};

  _.each(fieldInfoList, (fieldInfo) => {
    const {
      name,
      typeInfo: { platformToTypeMap },
    } = fieldInfo;

    const { COMMON, MONGOOSE } = platformToTypeMap;

    const type = MONGOOSE ?? COMMON;

    mongooseSchemaDefinition[name] = type;
  });

  const mongooseSchema = new mongoose.Schema(mongooseSchemaDefinition);

  const modelName = _.upperFirst(_.camelCase(tableName));

  const mongooseModel = mongoose.model(modelName, mongooseSchema);

  const customizationOptions = {};

  const objectTypeComposer = composeMongoose(
    // @ts-ignore
    mongooseModel,
    customizationOptions
  );

  const res = {
    objectTypeComposer,
  };

  return res;
};
