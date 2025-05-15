import { RichJsonSchema } from "@ldsg/core";
import _ from "lodash";
import { TypeToDefaultMap } from "../types";

interface CompleteSchemaParams {
  richJsonSchema: RichJsonSchema;
  typeToDefaultMap: TypeToDefaultMap;
}

interface CompleteSchemaRes {
  formilySchema: any;
}

type CompleteSchema = (params: CompleteSchemaParams) => CompleteSchemaRes;

export const completeSchema: CompleteSchema = (params) => {
  const { richJsonSchema, typeToDefaultMap } = params;

  const formilySchema: any = _.cloneDeep(richJsonSchema);

  completeSchemaProperty({
    richJsonSchema,
    typeToDefaultMap,
    formilySchema,
  });

  const res: CompleteSchemaRes = {
    formilySchema,
  };

  return res;
};

interface CompleteSchemaPropertyParams {
  formilySchema: any;
  richJsonSchema: RichJsonSchema;
  typeToDefaultMap: TypeToDefaultMap;
}

type CompleteSchemaProperty = (params: CompleteSchemaPropertyParams) => void;

export const completeSchemaProperty: CompleteSchemaProperty = (params) => {
  const { formilySchema, richJsonSchema, typeToDefaultMap } = params;

  const { type } = richJsonSchema;

  if (typeof type !== "string") {
    throw new Error("invalid type");
  }

  const richJsonSchemaKeys = _.keys(richJsonSchema);

  const formilyTypeDefault = typeToDefaultMap[type];

  const isHaveSomeXProperties = richJsonSchemaKeys.some((value) =>
    _.startsWith(value, "x-")
  );

  if (!isHaveSomeXProperties) {
    _.merge(formilySchema, formilyTypeDefault);
  }

  switch (type) {
    case "array": {
      completeSchemaArray(params);

      break;
    }

    case "object": {
      completeSchemaObject(params);

      break;
    }

    default: {
      completeSchemaEnum(params);

      break;
    }
  }

  const res = {
    formilySchema,
  };

  return res;
};

export const completeSchemaObject: CompleteSchemaProperty = (params) => {
  const { formilySchema, richJsonSchema, typeToDefaultMap } = params;

  let objectRequiredPropertyKeys: string[] = [];

  const { required } = richJsonSchema;

  if (_.isArray(required)) {
    objectRequiredPropertyKeys = required;
  }

  formilySchema.properties = _.mapValues(
    formilySchema.properties,
    (value, key) => {
      let res = value;

      completeSchemaProperty({
        formilySchema: value,
        richJsonSchema: value,
        typeToDefaultMap,
      });

      if (objectRequiredPropertyKeys.includes(key)) {
        res.required = true;
      }

      return res;
    }
  );
};

export const completeSchemaEnum: CompleteSchemaProperty = (params) => {
  const { formilySchema, richJsonSchema, typeToDefaultMap } = params;

  const { options } = richJsonSchema;

  if (_.isArray(options)) {
    _.merge(formilySchema, {
      "x-decorator": "FormItem",
      "x-component": "Select",
      enum: options,
    });
  }
};

export const completeSchemaArray: CompleteSchemaProperty = (params) => {
  const { formilySchema } = params;

  const { extraInfo } = getSchemaArrayExtraInfo(params);

  _.merge(formilySchema, extraInfo);

  formilySchema.items = extraInfo.items;
};

interface GetSchemaArrayExtraInfoRes {
  extraInfo: any;
}

type GetSchemaArrayExtraInfo = (
  params: CompleteSchemaPropertyParams
) => GetSchemaArrayExtraInfoRes;

export const getSchemaArrayExtraInfo: GetSchemaArrayExtraInfo = (params) => {
  const { richJsonSchema, typeToDefaultMap } = params;

  const { items } = richJsonSchema;

  if (!items) {
    throw new Error("invalid items");
  }

  const itemsFormilySchema = _.cloneDeep(items);

  completeSchemaProperty({
    formilySchema: itemsFormilySchema,
    richJsonSchema: items,
    typeToDefaultMap,
  });

  const extraInfo = {
    "x-component": "ArrayItems",
    "x-decorator": "FormItem",
    properties: {
      add: {
        type: "void",
        title: "添加",
        "x-component": "ArrayItems.Addition",
      },
    },
    items: {
      type: "object",
      properties: {
        space: {
          type: "void",
          "x-component": "Space",
          properties: {
            sort: {
              type: "void",
              "x-decorator": "FormItem",
              "x-component": "ArrayItems.SortHandle",
            },
            ...itemsFormilySchema.properties,
            remove: {
              type: "void",
              "x-decorator": "FormItem",
              "x-component": "ArrayItems.Remove",
            },
          },
        },
      },
    },
  };

  const res: GetSchemaArrayExtraInfoRes = {
    extraInfo,
  };

  return res;
};
