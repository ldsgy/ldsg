import { FieldInfo } from "@ldsg/object";
import _ from "lodash";
import { getGraphqlTypeByTypeInfo } from "./get-graphql-type-by-type-info";

interface GetFieldConfigMapDefinitionParams {
  fieldInfoList: FieldInfo[];
}

interface GetFieldConfigMapDefinitionRes {
  fieldConfigMapDefinition: Record<string, any>;
}

type GetFieldConfigMapDefinition = (
  params: GetFieldConfigMapDefinitionParams
) => GetFieldConfigMapDefinitionRes;

export const getFieldConfigMapDefinition: GetFieldConfigMapDefinition = (
  params
) => {
  const { fieldInfoList } = params;

  const fieldConfigMapDefinition: Record<string, any> = {};

  _.each(fieldInfoList, (fieldInfo) => {
    const { title, description, name, typeInfo } = fieldInfo;

    const camelCaseName = _.camelCase(name);

    const { graphqlType } = getGraphqlTypeByTypeInfo({
      typeInfo,
    });

    fieldConfigMapDefinition[camelCaseName] = {
      type: graphqlType,
      description: `${title}${description ? `:${description}` : ""}`,
    };
  });

  const res = {
    fieldConfigMapDefinition,
  };

  return res;
};
