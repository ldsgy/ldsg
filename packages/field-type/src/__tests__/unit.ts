import { HandlerResource } from "@ldsg/handler";
import { FieldTypeResource } from "../resource";
import {
  stringFieldTypeHandlerResourceRecord,
  stringFieldTypeResourceRecord,
} from "../resource-records";

test("field type", () => {
  new HandlerResource(stringFieldTypeHandlerResourceRecord);

  const fieldTypeResource = new FieldTypeResource(
    stringFieldTypeResourceRecord
  );

  const { fieldTypeInfo } = fieldTypeResource.getFieldTypeInfo({
    fieldProperties: {
      max: "10",
    },
  });

  expect(fieldTypeInfo).toMatchSnapshot();
});
