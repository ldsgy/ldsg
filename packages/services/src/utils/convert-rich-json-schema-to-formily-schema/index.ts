import { ISchema } from "@formily/json-schema";
import { RichJsonSchema } from "@ldsg/core";
import { completeSchema, TypeToDefaultMap } from "./utils";
import { DEFAULT_TYPE_TO_DEFAULT_MAP } from "./utils/constants";

export interface ConvertRichJsonSchemaToFormilySchemaParmas {
  richJsonSchema: RichJsonSchema;
  typeToDefaultMap?: TypeToDefaultMap;
}

export interface ConvertRichJsonSchemaToFormilySchemaRes {
  formilySchema: ISchema;
}

type ConvertRichJsonSchemaToFormilySchema = (
  params: ConvertRichJsonSchemaToFormilySchemaParmas
) => ConvertRichJsonSchemaToFormilySchemaRes;

export const convertRichJsonSchemaToFormilySchema: ConvertRichJsonSchemaToFormilySchema =
  (params) => {
    const { richJsonSchema, typeToDefaultMap = DEFAULT_TYPE_TO_DEFAULT_MAP } =
      params;

    const { formilySchema } = completeSchema({
      richJsonSchema,
      typeToDefaultMap,
    });

    const res = {
      formilySchema,
    };

    return res;
  };
