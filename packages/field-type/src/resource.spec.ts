import { HandlerResource } from "@ldsg/handler";
import { FieldTypeResource } from "./resource";

test("field type", async () => {
  const fieldTypeResource = new FieldTypeResource({
    id: "test-field-type",
    kind: "FIELD_TYPE",
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
      handlerResourceId: "field-type-string-handler",
    },
  });

  new HandlerResource({
    id: "field-type-string-handler",
    kind: "HANDLER",
    parentId: "root",
    settings: {
      title: "测试处理程序",
      description: "",
      code: "",
      dependencies: [],
    },
  });

  const fieldTypeOnMongoose = await fieldTypeResource.getFieldTypeInfo({
    fieldProperties: {
      max: "10",
    },
    platform: "mongoose",
  });

  expect(fieldTypeOnMongoose).toMatchSnapshot();
});
