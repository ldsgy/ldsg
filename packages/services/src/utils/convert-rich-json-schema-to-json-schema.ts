import { RichJsonSchema } from "@ldsg/core";
import { JSONSchema7 } from "json-schema";
import _ from "lodash";
import { JsonSchema } from "../types";

export interface ConvertRichJsonSchemaToJsonSchemaParmas {
  richJsonSchema: RichJsonSchema;
}

export interface ConvertRichJsonSchemaToJsonSchemaRes {
  jsonSchema: JsonSchema;
}

type ConvertRichJsonSchemaToJsonSchema = (
  params: ConvertRichJsonSchemaToJsonSchemaParmas
) => ConvertRichJsonSchemaToJsonSchemaRes;

export const convertRichJsonSchemaToJsonSchema: ConvertRichJsonSchemaToJsonSchema =
  (params) => {
    const { richJsonSchema } = params;

    let jsonSchema = _.cloneDeep(richJsonSchema);

    resolveSchema({
      jsonSchema,
      richJsonSchema,
    });

    return {
      jsonSchema,
    };
  };

interface ResolveSchemaParams {
  jsonSchema: JSONSchema7;
  richJsonSchema: RichJsonSchema;
}

type ResolveSchema = (params: ResolveSchemaParams) => void;

const resolveSchema: ResolveSchema = (params) => {
  const { jsonSchema, richJsonSchema } = params;

  const { type } = richJsonSchema;

  resolveSchemaEnum({
    jsonSchema,
    richJsonSchema,
  });

  for (let prop in jsonSchema) {
    if (prop.startsWith("x-")) {
      // @ts-ignore
      delete jsonSchema[prop];
    }
  }

  switch (type) {
    case "object": {
      resolveSchemaObject({
        jsonSchema,
        richJsonSchema,
      });

      break;
    }

    default: {
      break;
    }
  }

  const res = {
    jsonSchema,
  };

  return res;
};

const resolveSchemaObject: ResolveSchema = (params) => {
  const { jsonSchema: paramsJsonSchema, richJsonSchema } = params;

  paramsJsonSchema.properties = _.mapValues(
    richJsonSchema.properties,
    (value) => {
      let res = value;

      resolveSchema({
        jsonSchema: res,
        richJsonSchema: res,
      });

      return res;
    }
  );
};

const resolveSchemaEnum: ResolveSchema = (params) => {
  const { jsonSchema: paramsJsonSchema, richJsonSchema } = params;

  const { options } = richJsonSchema;

  if (_.isArray(options)) {
    const newEnum = options.map((value) => value.value);

    paramsJsonSchema.enum = newEnum;
  }
};
