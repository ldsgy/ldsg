import { ROOT_RESOURCE_ID } from "@ldsg/constants";
import { FieldTypeResource } from "@ldsg/field-type";
import { Handler, HandlerResource } from "@ldsg/handler";
import { Schema } from "mongoose";

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
        type: Schema.Types.Int32,
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

export const numberFieldTypeHandler = new HandlerResource({
  id: "number-field-type-handler",
  kind: "handler",
  parentId: ROOT_RESOURCE_ID,
  settings: {
    title: "文本字段类型处理程序",
    description: "",
    code: "",
    dependencies: [],
    handler,
  },
});
