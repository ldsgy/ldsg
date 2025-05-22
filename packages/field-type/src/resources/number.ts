import { ROOT_RESOURCE_ID } from "@ldsg/constants";
import { FieldTypeResource } from "@ldsg/field-type";
import { HandlerResource } from "@ldsg/handler";
import { FieldTypeBasePlatform, FieldTypeResourceHandler } from "../types";

export const numberFieldType = new FieldTypeResource({
  id: "number-field-type",
  kind: "field_type",
  parentId: ROOT_RESOURCE_ID,
  settings: {
    title: "文本字段类型",
    description: "可用来存储各种文本",
    fieldPropertiesSchema: {
      type: "object",
      properties: {
        max: {
          type: "integer",
          title: "最大值",
          description: "",
        },
        min: {
          type: "integer",
          title: "最小值",
          description: "",
        },
      },
    },
    handlerResourceId: "number-field-type-handler",
  },
});

const handler: FieldTypeResourceHandler = (params) => {
  const { fieldProperties, platform } = params;

  let res;

  switch (platform) {
    case FieldTypeBasePlatform.COMMON: {
      res = {
        ...fieldProperties,
        type: "number",
      };

      break;
    }

    default: {
      break;
    }
  }

  return res;
};

export const numberFieldTypeHandler = new HandlerResource({
  id: "number-field-type-handler",
  kind: "handler",
  parentId: ROOT_RESOURCE_ID,
  settings: {
    title: "文本字段类型处理程序",
    description: "",
    code: "",
    dependencies: [],
  },
  handler,
});
