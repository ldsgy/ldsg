import { SchemaComposerParams } from "@ldsg/graphql";
import {
  ObjectTypeComposerFieldConfigMapDefinition,
  ResolverDefinition,
} from "graphql-compose";
import _ from "lodash";
import { FormInfo } from "../../types";
import { getOutputOTC } from "./utils";

interface GetNewFieldsParams extends SchemaComposerParams {
  formInfoList: FormInfo[];
}

interface GetNewFieldsRes {
  newFields: ObjectTypeComposerFieldConfigMapDefinition<any, any>;
}

type GetNewFields = (params: GetNewFieldsParams) => GetNewFieldsRes;

export const getNewFields: GetNewFields = (params) => {
  const { schemaComposer, formInfoList } = params;

  const newFields: ObjectTypeComposerFieldConfigMapDefinition<any, any> = {};

  formInfoList.forEach((formInfo) => {
    const { title, description, name, inputObjectInfo, outputObjectInfo } =
      formInfo;

    const graphqlFieldName = _.camelCase(name);

    const { outputOTC } = getOutputOTC({ schemaComposer, outputObjectInfo });

    const resolverDefinition: ResolverDefinition<any, any, any> = {
      name: graphqlFieldName,
      description: `${title}${description ? `:${description}` : ""}`,
      type: outputOTC,
      // args: inputITC.getFields(),
    };

    // outputObjectInfo.name

    const fieldResolver = schemaComposer.createResolver(resolverDefinition);

    newFields[graphqlFieldName] = fieldResolver;
  });

  const res = {
    newFields,
  };

  return res;
};
