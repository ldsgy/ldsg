import { ROOT_RESOURCE_ID } from "@ldsg/constants";
import {
  FieldTypeResource,
  stringFieldTypeHandlerResourceRecord,
  stringFieldTypeResourceRecord,
} from "@ldsg/field-type";
import { HandlerResource } from "@ldsg/handler";
import { Resource } from "@ldsg/resource";
import { SpecificResourceSettings } from "@ldsg/types";
import { ObjectResource } from "../../resource";
import { FieldInfo, GetFieldInfo } from "../../types";

interface ASpecificResourceSettings extends SpecificResourceSettings {
  /**
   * Field Name
   */
  name: string;

  /**
   * Field Type Resource ID
   */
  fieldTypeResourceId: string;

  /**
   * Field Properties
   */
  properties: any;
}

class MockObjectFieldResource extends Resource<ASpecificResourceSettings> {
  getFieldInfo: GetFieldInfo = (params) => {
    const {
      id,
      settings: { title, description, name, properties },
      getResourcesFromSettings,
    } = this;

    const { fieldTypeResource } = getResourcesFromSettings();

    const { fieldTypeInfo } = (
      fieldTypeResource as FieldTypeResource
    ).getFieldTypeInfo({
      ...params,
      fieldProperties: properties,
    });

    const fieldInfo: FieldInfo = {
      id,
      title,
      description,
      name,
      typeInfo: fieldTypeInfo,
    };

    const res = {
      fieldInfo,
    };

    return res;
  };
}

test("object", () => {
  new HandlerResource(stringFieldTypeHandlerResourceRecord);

  new FieldTypeResource(stringFieldTypeResourceRecord);

  const test1Object = new ObjectResource({
    id: "test-1-object",
    kind: "object",
    parentId: ROOT_RESOURCE_ID,
    settings: {
      title: "测试1对象",
      description: "",
      name: "test-1",
    },
  });

  const test2Object = new ObjectResource({
    id: "test-2-object",
    kind: "object",
    parentId: ROOT_RESOURCE_ID,
    settings: {
      title: "测试2对象",
      description: "",
      name: "test-2",
      extendedResourceIds: ["test-1-object"],
    },
  });

  /**
   * 测试 1 对象的字段
   */
  {
    new MockObjectFieldResource({
      id: "test-1-object-test-1-object-field",
      kind: "object_field",
      parentId: "test-1-object",
      settings: {
        title: "测试1对象测试1对象字段",
        description: "",
        name: "test-1",
        fieldTypeResourceId: "test-field-type",
        properties: {
          max: "10",
        },
      },
    });

    new MockObjectFieldResource({
      id: "test-1-object-test-2-object-field",
      kind: "object_field",
      parentId: "test-1-object",
      settings: {
        title: "测试1对象测试2对象字段",
        description: "",
        name: "test2",
        fieldTypeResourceId: "test-field-type",
        properties: {
          max: "10",
        },
      },
    });

    new MockObjectFieldResource({
      id: "test-1-object-test-3-object-field",
      kind: "object_field",
      parentId: "test-1-object",
      settings: {
        title: "测试1对象测试3对象字段",
        description: "",
        name: "test3",
        fieldTypeResourceId: "test-field-type",
        properties: {
          max: "10",
        },
      },
    });
  }

  /**
   * 测试 2 对象的字段
   */
  {
    new MockObjectFieldResource({
      id: "test-2-object-test-1-object-field",
      kind: "object_field",
      parentId: "test-2-object",
      settings: {
        title: "测试2对象测试1对象字段",
        description: "",
        name: "test-1",
        fieldTypeResourceId: "test-field-type",
        properties: {
          max: "10",
        },
      },
    });

    new MockObjectFieldResource({
      id: "test-2-object-test-4-object-field",
      kind: "object_field",
      parentId: "test-2-object",
      settings: {
        title: "测试2对象测试4对象字段",
        description: "",
        name: "test-4",
        fieldTypeResourceId: "test-field-type",
        properties: {
          max: "10",
        },
      },
    });

    new MockObjectFieldResource({
      id: "test-2-object-test-5-object-field",
      kind: "object_field",
      parentId: "test-2-object",
      settings: {
        title: "测试2对象测试5对象字段",
        description: "",
        name: "test-5",
        fieldTypeResourceId: "test-field-type",
        properties: {
          max: "10",
        },
      },
    });
  }

  const getObjectInfoRes1 = test1Object.getObjectInfo();

  expect(getObjectInfoRes1).toMatchSnapshot();

  const getObjectInfoRes2 = test2Object.getObjectInfo();

  expect(getObjectInfoRes2).toMatchSnapshot();
});
