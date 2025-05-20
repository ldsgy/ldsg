import { ROOT_RESOURCE_ID } from "@ldsg/constants";
import { FieldTypeResource } from "@ldsg/field-type";
import { Handler, HandlerResource } from "@ldsg/handler";
import { Schema } from "mongoose";

export const stringFieldType = new FieldTypeResource({
  id: "string-field-type",
  kind: "field_type",
  parentId: ROOT_RESOURCE_ID,
  settings: {
    title: "文本字段类型",
    description: "",
    fieldPropertiesSchema: {
      type: "object",
      properties: {},
    },
    handlerResourceId: "string-field-type-handler",
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
        type: Schema.Types.String,
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

export const stringFieldTypeHandler = new HandlerResource({
  id: "string-field-type-handler",
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
