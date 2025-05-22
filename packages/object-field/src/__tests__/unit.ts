import {
  FieldTypeResource,
  stringFieldTypeHandlerResourceRecord,
  stringFieldTypeResourceRecord,
} from "@ldsg/field-type";
import { Handler, HandlerResource } from "@ldsg/handler";
import { ObjectFieldResource } from "../resource";

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

test("object field", () => {
  new HandlerResource(stringFieldTypeHandlerResourceRecord);

  new FieldTypeResource(stringFieldTypeResourceRecord);

  const objectFieldResource = new ObjectFieldResource({
    id: "object-field",
    kind: "object_field",
    parentId: "application",
    settings: {
      title: "测试字段",
      description: "",
      name: "test",
      fieldTypeResourceId: stringFieldTypeResourceRecord.id,
      properties: {
        max: "10",
      },
    },
  });

  const getFieldInfoRes = objectFieldResource.getFieldInfo();

  expect(getFieldInfoRes).toMatchSnapshot();
});
