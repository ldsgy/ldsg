import { SchemaComposerParams } from "@ldsg/graphql";
import { resolverFactory } from "graphql-compose-mongoose";
import _ from "lodash";
import { TableInfo } from "../../types";
import {
  MUTATION_RESOLVER_FACTORY_KEY_LIST,
  QUERY_RESOLVER_FACTORY_KEY_LIST,
  ResolverFactoryKeyList,
} from "./constants";
import { getObjectTypeComposer } from "./utils";

interface AddFieldsParams extends SchemaComposerParams {
  tableInfoList: TableInfo[];
}

type AddFields = (params: AddFieldsParams) => void;

export const addFields: AddFields = (params) => {
  const { schemaComposer, tableInfoList } = params;

  const mutationNewFields: Record<string, any> = {};
  const queryNewFields: Record<string, any> = {};

  const resolverFactoryKeys = _.keys(resolverFactory) as ResolverFactoryKeyList;

  _.each(tableInfoList, (tableInfo) => {
    const { title, description, name: tableName, objectInfo } = tableInfo;

    _.each(resolverFactoryKeys, (key) => {
      const fieldName = _.camelCase(`${tableName}-${key}`);

      const { objectTypeComposer } = getObjectTypeComposer({
        tableName,
        objectInfo,
      });

      if (MUTATION_RESOLVER_FACTORY_KEY_LIST.includes(key)) {
        mutationNewFields[fieldName] =
          objectTypeComposer.mongooseResolvers[key];
      } else if (QUERY_RESOLVER_FACTORY_KEY_LIST.includes(key)) {
        queryNewFields[fieldName] = objectTypeComposer.mongooseResolvers[key];
      } else {
      }
    });
  });

  schemaComposer.Mutation.addFields(mutationNewFields);
  schemaComposer.Query.addFields(queryNewFields);
};
