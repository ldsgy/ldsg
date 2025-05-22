import { ROOT_RESOURCE_ID } from "@ldsg/constants";
import { FieldTypeResource } from "@ldsg/field-type";
import { Handler, HandlerResource } from "@ldsg/handler";
import { Schema } from "mongoose";

export const mongoIdFieldType = new FieldTypeResource({
  id: "mongo-id-field-type",
  kind: "field_type",
  parentId: ROOT_RESOURCE_ID,
  settings: {
    title: "MongoID字段类型",
    description: "",
    fieldPropertiesSchema: {
      type: "object",
      properties: {},
    },
    handlerResourceId: "mongo-id-field-type-handler",
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
        type: Schema.Types.ObjectId,
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

export const mongoIdFieldTypeHandler = new HandlerResource({
  id: "mongo-id-field-type-handler",
  kind: "handler",
  parentId: ROOT_RESOURCE_ID,
  settings: {
    title: "MongoID字段类型处理程序",
    description: "",
    code: "",
    dependencies: [],
    handler,
  },
});
