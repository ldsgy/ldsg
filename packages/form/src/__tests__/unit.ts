import {
  FieldTypeResource,
  stringFieldTypeHandlerResourceRecord,
  stringFieldTypeResourceRecord,
} from "@ldsg/field-type";
import { HandlerResource } from "@ldsg/handler";
import { ObjectResource } from "@ldsg/object";
import { ObjectFieldResource } from "@ldsg/object-field";
import { WorkflowResource } from "@ldsg/workflow";
import { FormResource } from "../resource";

test("unit", () => {
  new HandlerResource(stringFieldTypeHandlerResourceRecord);

  new FieldTypeResource(stringFieldTypeResourceRecord);

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
      fieldTypeResourceId: stringFieldTypeResourceRecord.id,
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
      fieldTypeResourceId: stringFieldTypeResourceRecord.id,
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
      fieldTypeResourceId: stringFieldTypeResourceRecord.id,
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
      fieldTypeResourceId: stringFieldTypeResourceRecord.id,
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

  const getFormInfoRes = formResource.getFormInfo();

  expect(getFormInfoRes).toMatchSnapshot();
});
