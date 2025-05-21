import { ROOT_RESOURCE_ID } from "@ldsg/constants";
import { FieldTypeResource } from "@ldsg/field-type";
import { Handler, HandlerResource } from "@ldsg/handler";
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
    kind: "handler",
    parentId: ROOT_RESOURCE_ID,
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
    kind: "field_type",
    parentId: ROOT_RESOURCE_ID,
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
    new AResource({
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

    new AResource({
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

    new AResource({
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
    new AResource({
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

    new AResource({
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

    new AResource({
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

  const getObjectInfoRes1 = test1Object.getObjectInfo({
    platform: "mongoose",
  });

  expect(getObjectInfoRes1).toMatchSnapshot();

  const getObjectInfoRes2 = test2Object.getObjectInfo({
    platform: "mongoose",
  });

  expect(getObjectInfoRes2).toMatchSnapshot();
});
