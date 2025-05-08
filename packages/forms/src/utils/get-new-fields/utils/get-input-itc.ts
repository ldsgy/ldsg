import { SchemaComposerParams } from "@ldsg/graphql";
import { ObjectInfo } from "@ldsg/object";
import {
  InputTypeComposer,
  InputTypeComposerDefinition,
} from "graphql-compose";
import _ from "lodash";
import { getFieldConfigMapDefinition } from "./get-field-config-map-definition";

interface GetInputITCParams extends SchemaComposerParams {
  inputObjectInfo: ObjectInfo;
}

interface GetInputITCRes {
  inputITC: InputTypeComposer<any>;
}

type GetInputITC = (params: GetInputITCParams) => GetInputITCRes;

export const getInputITC: GetInputITC = (params) => {
  const { schemaComposer, inputObjectInfo } = params;

  const { title, description, name, fieldInfoList } = inputObjectInfo;

  const upperFirstCamelCaseName = _.upperFirst(_.camelCase(name));

  const { fieldConfigMapDefinition } = getFieldConfigMapDefinition({
    fieldInfoList,
  });

  const definition: InputTypeComposerDefinition = {
    name: upperFirstCamelCaseName,
    fields: fieldConfigMapDefinition,
  };

  const inputITC = schemaComposer.createInputTC(definition);

  inputITC.setDescription(`${title}${description ? `:${description}` : ""}`);

  const res = {
    inputITC,
  };

  return res;
};
