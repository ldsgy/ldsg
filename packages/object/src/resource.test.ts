import { FieldTypeResource } from "@ldsg/field-type";
import { Handler, HandlerResource } from "@ldsg/handler";
import { ObjectFieldResource } from "@ldsg/object-field";
import { ObjectResource } from "./resource";

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

  const { max } = fieldProperties;

  let res;

  switch (platform) {
    case "mongoose": {
      res = {
        type: "String",
        ...(max
          ? {
              maxLength: max,
            }
          : {}),
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

test("object", () => {
  new HandlerResource({
    id: "test-handler",
    kind: "HANDLER",
    parentId: "root",
    settings: {
      title: "测试处理程序",
      description: "",
      code: "",
      dependencies: [],
    },
    handler,
  });

  new FieldTypeResource({
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
      handlerResourceId: "test-handler",
    },
  });

  new ObjectFieldResource({
    id: "test-object-field-1",
    kind: "OBJECT_FIELD",
    parentId: "test-object",
    settings: {
      title: "测试字段1",
      description: "",
      name: "test1",
      fieldTypeResourceId: "test-field-type",
      properties: {
        max: "10",
      },
    },
  });

  new ObjectFieldResource({
    id: "test-object-field-2",
    kind: "OBJECT_FIELD",
    parentId: "test-object",
    settings: {
      title: "测试字段2",
      description: "",
      name: "test2",
      fieldTypeResourceId: "test-field-type",
      properties: {
        max: "10",
      },
    },
  });

  new ObjectFieldResource({
    id: "test-object-field-3",
    kind: "OBJECT_FIELD",
    parentId: "test-object",
    settings: {
      title: "测试字段3",
      description: "",
      name: "test",
      fieldTypeResourceId: "test-field-type",
      properties: {
        max: "10",
      },
    },
  });

  const objectResource = new ObjectResource({
    id: "test-object",
    kind: "OBJECT",
    parentId: "root",
    settings: {
      title: "测试对象",
      description: "",
      name: "test-object",
    },
  });

  const getObjectInfoRes = objectResource.getObjectInfo({
    platform: "mongoose",
  });

  expect(getObjectInfoRes).toMatchSnapshot();
});
