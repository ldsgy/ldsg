import { SchemaComposerParams } from "@ldsg/graphql";
import { ObjectInfo } from "@ldsg/object";
import {
  ObjectTypeComposer,
  ObjectTypeComposerDefinition,
} from "graphql-compose";
import _ from "lodash";
import { getFieldConfigMapDefinition } from "./get-field-config-map-definition";

interface GetOutputOTCParams extends SchemaComposerParams {
  outputObjectInfo: ObjectInfo;
}

interface GetOutputOTCRes {
  outputOTC: ObjectTypeComposer<any, any>;
}

type GetOutputOTC = (params: GetOutputOTCParams) => GetOutputOTCRes;

export const getOutputOTC: GetOutputOTC = (params) => {
  const { schemaComposer, outputObjectInfo } = params;

  const { title, description, name, fieldInfoList } = outputObjectInfo;

  const upperFirstCamelCaseName = _.upperFirst(_.camelCase(name));

  const { fieldConfigMapDefinition } = getFieldConfigMapDefinition({
    fieldInfoList,
  });

  const definition: ObjectTypeComposerDefinition<any, any> = {
    name: upperFirstCamelCaseName,
    fields: fieldConfigMapDefinition,
  };

  const outputOTC = schemaComposer.createObjectTC(definition);

  outputOTC.setDescription(`${title}${description ? `:${description}` : ""}`);

  const res = {
    outputOTC,
  };

  return res;
};
