import { Handler, HandlerResource } from "@ldsg/handler";
import { WorkflowNodeTypeResource } from "../resource";

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

  const workflowNodeTypeResource = new WorkflowNodeTypeResource({
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

  const { extraWorkflowNodeInfo } =
    workflowNodeTypeResource.getExtraWorkflowNodeInfo({
      workflowNodeProperties: {
        max: "10",
      },
    });

  expect(extraWorkflowNodeInfo).toMatchSnapshot();
});
