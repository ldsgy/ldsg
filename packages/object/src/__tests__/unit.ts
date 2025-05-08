import { FieldTypeResource } from "@ldsg/field-type";
import { Handler, HandlerResource } from "@ldsg/handler";
import { Resource } from "@ldsg/resource";
import { SpecificResourceSettings } from "@ldsg/types";
import { ObjectResource } from "../resource";
import { FieldInfo, GetFieldInfo } from "../types";

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

class AResource extends Resource<ASpecificResourceSettings> {
  getFieldInfo: GetFieldInfo = (params) => {
    const { platform } = params;

    const {
      settings: { title, description, name, properties },
      getResourcesFromSettings,
    } = this;

    const { fieldTypeResource } = getResourcesFromSettings();

    const typeInfo = (fieldTypeResource as FieldTypeResource).getFieldTypeInfo({
      platform,
      fieldProperties: properties,
    });

    const fieldInfo: FieldInfo = {
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

  new AResource({
    id: "test-a-1",
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

  new AResource({
    id: "test-a-2",
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

  new AResource({
    id: "test-a-3",
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

  const getObjectInfoRes = objectResource.getObjectInfo({
    platform: "mongoose",
  });

  expect(getObjectInfoRes).toMatchSnapshot();
});
