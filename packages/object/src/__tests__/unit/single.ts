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

    const typeInfo = (fieldTypeResource as FieldTypeResource).getFieldTypeInfo({
      ...params,
      fieldProperties: properties,
    });

    const fieldInfo: FieldInfo = {
      id,
      title,
      description,
      name,
      typeInfo,
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

  const testObject = new ObjectResource({
    id: "test-object",
    kind: "object",
    parentId: ROOT_RESOURCE_ID,
    settings: {
      title: "测试对象",
      description: "",
      name: "test",
    },
  });

  new MockObjectFieldResource({
    id: "test-object-test-1-object-field",
    kind: "object_field",
    parentId: "test-object",
    settings: {
      title: "测试对象测试1对象字段",
      description: "",
      name: "test1",
      fieldTypeResourceId: "test-field-type",
      properties: {
        max: "10",
      },
    },
  });

  new MockObjectFieldResource({
    id: "test-object-test-2-object-field",
    kind: "object_field",
    parentId: "test-object",
    settings: {
      title: "测试对象测试2对象字段",
      description: "",
      name: "test2",
      fieldTypeResourceId: "test-field-type",
      properties: {
        max: "10",
      },
    },
  });

  new MockObjectFieldResource({
    id: "test-object-test-3-object-field",
    kind: "object_field",
    parentId: "test-object",
    settings: {
      title: "测试对象测试3对象字段",
      description: "",
      name: "test3",
      fieldTypeResourceId: "test-field-type",
      properties: {
        max: "10",
      },
    },
  });

  const getObjectInfoRes = testObject.getObjectInfo();

  expect(getObjectInfoRes).toMatchSnapshot();
});
