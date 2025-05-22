import { FieldTypeResource } from "@ldsg/field-type";
import { Handler, HandlerResource } from "@ldsg/handler";
import { ObjectResource } from "@ldsg/object";
import { ObjectFieldResource } from "@ldsg/object-field";
import { WorkflowResource } from "@ldsg/workflow";
import { FormResource } from "../resource";

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

test("unit", () => {
  new HandlerResource({
    id: "test-handler",
    kind: "handler",
    parentId: "root",
    settings: {
      title: "测试处理程序",
      description: "",
      code: "",
      dependencies: [],
      handler,
    },
  });

  new FieldTypeResource({
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

  new ObjectResource({
    id: "test-object-1",
    kind: "object",
    parentId: "root",
    settings: {
      title: "测试对象1",
      description: "",
      name: "test-object-1",
    },
  });

  new ObjectFieldResource({
    id: "test-object-1-field-1",
    kind: "object_field",
    parentId: "test-object-1",
    settings: {
      title: "测试对象1测试字段1",
      description: "",
      name: "test-1",
      fieldTypeResourceId: "test-field-type",
      properties: {
        max: "10",
      },
    },
  });

  new ObjectFieldResource({
    id: "test-object-1-field-2",
    kind: "object_field",
    parentId: "test-object-1",
    settings: {
      title: "测试对象1测试字段2",
      description: "",
      name: "test-2",
      fieldTypeResourceId: "test-field-type",
      properties: {
        max: "10",
      },
    },
  });

  new ObjectFieldResource({
    id: "test-object-1-field-3",
    kind: "object_field",
    parentId: "test-object-1",
    settings: {
      title: "测试对象1测试字段3",
      description: "",
      name: "test-3",
      fieldTypeResourceId: "test-field-type",
      properties: {
        max: "10",
      },
    },
  });

  new ObjectResource({
    id: "test-object-2",
    kind: "object",
    parentId: "root",
    settings: {
      title: "测试对象2",
      description: "",
      name: "test-object-2",
    },
  });

  new ObjectFieldResource({
    id: "test-object-2-field-1",
    kind: "object_field",
    parentId: "test-object-2",
    settings: {
      title: "测试对象2测试字段1",
      description: "",
      name: "test-1",
      fieldTypeResourceId: "test-field-type",
      properties: {
        max: "10",
      },
    },
  });

  new WorkflowResource({
    id: "test-workflow",
    kind: "workflow",
    parentId: "root",
    settings: {
      title: "测试工作流",
      description: "",
    },
  });

  const formResource = new FormResource({
    id: "test-form",
    kind: "form",
    parentId: "forms",
    settings: {
      title: "测试表单",
      description: "",
      name: "test-form",
      inputObjectResourceId: "test-object-1",
      outputObjectResourceId: "test-object-2",
      workflowResourceId: "test-workflow",
    },
  });

  const getFormInfoRes = formResource.getFormInfo({
    platform: "mongoose",
  });

  expect(getFormInfoRes).toMatchSnapshot();
});
