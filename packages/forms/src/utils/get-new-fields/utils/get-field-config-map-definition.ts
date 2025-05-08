import { FieldInfo } from "@ldsg/object";
import {
  ObjectTypeComposerFieldConfigAsObjectDefinition,
  ObjectTypeComposerFieldConfigDefinition,
  ObjectTypeComposerFieldConfigMapDefinition,
} from "graphql-compose";
import _ from "lodash";

interface GetFieldConfigMapDefinitionParams {
  fieldInfoList: FieldInfo[];
}

interface GetFieldConfigMapDefinitionRes {
  fieldConfigMapDefinition: ObjectTypeComposerFieldConfigMapDefinition<
    any,
    any
  >;
}

type GetFieldConfigMapDefinition = (
  params: GetFieldConfigMapDefinitionParams
) => GetFieldConfigMapDefinitionRes;

export const getFieldConfigMapDefinition: GetFieldConfigMapDefinition = (
  params
) => {
  const { fieldInfoList } = params;

  const fieldConfigMapDefinition: ObjectTypeComposerFieldConfigMapDefinition<
    any,
    any
  > = {};

  _.each(fieldInfoList, (fieldInfo) => {
    const { title, description, name, typeInfo } = fieldInfo;

    const camelCaseName = _.camelCase(name);

    const type =
      typeInfo.type as ObjectTypeComposerFieldConfigAsObjectDefinition<
        any,
        any
      >["type"];

    const objectTypeComposerFieldConfigDefinition: ObjectTypeComposerFieldConfigDefinition<
      any,
      any,
      any
    > = {
      type,
      description: `${title}${description ? `:${description}` : ""}`,
    };

    fieldConfigMapDefinition[camelCaseName] =
      objectTypeComposerFieldConfigDefinition;
  });

  const res = {
    fieldConfigMapDefinition,
  };

  return res;
};
