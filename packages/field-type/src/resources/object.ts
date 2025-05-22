import { ROOT_RESOURCE_ID } from "@ldsg/constants";
import { FieldTypeResource } from "@ldsg/field-type";
import { HandlerResource } from "@ldsg/handler";
import { FieldTypeBasePlatform, FieldTypeResourceHandler } from "../types";

export const objectFieldType = new FieldTypeResource({
  id: "object-field-type",
  kind: "field_type",
  parentId: ROOT_RESOURCE_ID,
  settings: {
    title: "对象字段类型",
    description: "",
    fieldPropertiesSchema: {
      type: "object",
      properties: {},
    },
    handlerResourceId: "object-field-type-handler",
  },
});

const handler: FieldTypeResourceHandler = (params) => {
  const { fieldProperties, platform } = params;

  let res;

  switch (platform) {
    case FieldTypeBasePlatform.COMMON: {
      res = {
        ...fieldProperties,
        type: "object",
      };

      break;
    }

    default: {
      break;
    }
  }

  return res;
};

export const objectFieldTypeHandler = new HandlerResource({
  id: "object-field-type-handler",
  kind: "handler",
  parentId: ROOT_RESOURCE_ID,
  settings: {
    title: "对象字段类型处理程序",
    description: "",
    code: "",
    dependencies: [],
  },
  handler,
});
