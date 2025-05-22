import { FieldTypeResource } from "@ldsg/field-type";
import { GraphqlResource } from "@ldsg/graphql";
import { Handler, HandlerResource } from "@ldsg/handler";
import { ObjectResource } from "@ldsg/object";
import { ObjectFieldResource } from "@ldsg/object-field";
import { Resource } from "@ldsg/resource";
import { SpecificResourceSettings } from "@ldsg/types";
import { WorkflowResource } from "@ldsg/workflow";
import { printSchema } from "graphql";
import { ObjectTypeComposerFieldConfigAsObjectDefinition } from "graphql-compose";
import { FormsResource } from "../../resource";
import { FormInfo, GetFormInfo } from "../../types";

interface MockFormSpecificResourceSettings extends SpecificResourceSettings {
  /**
   * Form Name
   */
  name: string;

  /**
   * Input Object Resource Id
   */
  inputObjectResourceId: string;

  /**
   * Output Object Resource Id
   */
  outputObjectResourceId: string;

  /**
   * Workflow Resource Id
   */
  workflowResourceId: string;
}

class MockFormResource extends Resource<MockFormSpecificResourceSettings> {
  getFormInfo: GetFormInfo = (params) => {
    const {
      id,
      settings: { title, description, name },
      getResourcesFromSettings,
    } = this;

    const { inputObjectResource, outputObjectResource, workflowResource } =
      getResourcesFromSettings();

    const { objectInfo: inputObjectInfo } = (
      inputObjectResource as ObjectResource
    ).getObjectInfo(params);

    const { objectInfo: outputObjectInfo } = (
      outputObjectResource as ObjectResource
    ).getObjectInfo(params);

    const { workflowInfo } = (
      workflowResource as WorkflowResource
    ).getWorkflowInfo();

    const res: FormInfo = {
      id,
      title,
      description,
      name,
      inputObjectInfo,
      outputObjectInfo,
      workflowInfo,
    };

    return res;
  };
}

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
    case "graphql": {
      const type: ObjectTypeComposerFieldConfigAsObjectDefinition<
        any,
        any
      >["type"] = "String";

      res = {
        type,
      };

      break;
    }

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

test("forms", () => {
  const graphqlResource = new GraphqlResource({
    id: "test-graphql",
    kind: "graphql",
    parentId: "test-application",
    settings: {
      title: "测试GraphQL",
      description: "",
      code: "",
      dependencies: [],
    },
  });

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

  const formsResource = new FormsResource({
    id: "test-forms",
    kind: "form",
    parentId: "test-application",
    settings: {
      title: "测试表单组",
      description: "",
    },
  });

  new WorkflowResource({
    id: "test-workflow-1",
    kind: "workflow",
    parentId: "root",
    settings: {
      title: "测试工作流1",
      description: "",
    },
  });

  new WorkflowResource({
    id: "test-workflow-2",
    kind: "workflow",
    parentId: "root",
    settings: {
      title: "测试工作流2",
      description: "",
    },
  });

  new MockFormResource({
    id: "test-form-1",
    kind: "form",
    parentId: "test-forms",
    settings: {
      title: "测试表单1",
      description: "",
      name: "test-a-1",
      inputObjectResourceId: "test-object-1",
      outputObjectResourceId: "test-object-2",
      workflowResourceId: "test-workflow-1",
    },
  });

  new MockFormResource({
    id: "test-form-2",
    kind: "form",
    parentId: "test-forms",
    settings: {
      title: "测试表单2",
      description: "",
      name: "test-a-2",
      inputObjectResourceId: "test-object-2",
      outputObjectResourceId: "test-object-1",
      workflowResourceId: "test-workflow-2",
    },
  });

  const getFormInfoListRes = formsResource.getFormInfoList();

  expect(getFormInfoListRes).toMatchSnapshot();

  const { schema } = graphqlResource.getGraphQLSchema();

  const schemaDSL = printSchema(schema);

  console.log(schemaDSL);

  expect(schemaDSL).toMatchSnapshot();
});
