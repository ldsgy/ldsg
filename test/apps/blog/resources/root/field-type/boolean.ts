import { ROOT_RESOURCE_ID } from "@ldsg/constants";
import { FieldTypeResource } from "@ldsg/field-type";
import { Handler, HandlerResource } from "@ldsg/handler";
import { Schema } from "mongoose";

export const booleanFieldType = new FieldTypeResource({
  id: "boolean-field-type",
  kind: "field_type",
  parentId: ROOT_RESOURCE_ID,
  settings: {
    title: "布尔字段类型",
    description: "",
    fieldPropertiesSchema: {
      type: "object",
      properties: {},
    },
    handlerResourceId: "boolean-field-type-handler",
  },
});

const handler: Handler<
  [
    {
      /**
       * Field Properties
       */
      fieldProperties?: any;
      /**
       * Platform
       * Such as mongoose\formily.
       */
      platform: string;
    }
  ],
  {}
> = (params) => {
  const { fieldProperties, platform } = params;

  let res;

  switch (platform) {
    case "mongoose": {
      res = {
        ...fieldProperties,
        type: Schema.Types.Boolean,
      };

      break;
    }

    default: {
      res = {};

      break;
    }
  }

  return res;
};

export const booleanFieldTypeHandler = new HandlerResource({
  id: "boolean-field-type-handler",
  kind: "handler",
  parentId: ROOT_RESOURCE_ID,
  settings: {
    title: "测试处理程序",
    description: "",
    code: "",
    dependencies: [],
    handler,
  },
});
