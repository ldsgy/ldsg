import { FieldTypeResource } from "@ldsg/field-type";
import { Handler, HandlerResource } from "@ldsg/handler";
import { Schema } from "mongoose";

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

test("field type", () => {
  new HandlerResource({
    id: "test-handler",
    kind: "handler",
    parentId: "root",
    settings: {
      title: "测试处理程序",
      description: "",
      code: "",
      dependencies: [],
    },
    handler,
  });

  const fieldTypeResource = new FieldTypeResource({
    id: "test-field-type",
    kind: "field_type",
    parentId: "root",
    settings: {
      title: "文本",
      description: "可用来存储各种文本",
      fieldPropertiesSchema: {
        type: "object",
        properties: {
          max: {
            type: "integer",
            title: "配置最长字符",
            description: "长度不可以超过此值",
          },
        },
      },
      handlerResourceId: "test-handler",
    },
  });

  const fieldTypeOnMongoose = fieldTypeResource.getFieldTypeInfo({
    fieldProperties: {
      max: "10",
    },
    platform: "mongoose",
  });

  expect(fieldTypeOnMongoose).toMatchSnapshot();
});
