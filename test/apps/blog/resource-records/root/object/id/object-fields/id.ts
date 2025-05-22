import { ObjectFieldResource } from "@ldsg/object-field";

export const idObjectIdObjectField = new ObjectFieldResource({
  id: "id-object-id-object-field",
  kind: "object-field",
  parentId: "id-object",
  settings: {
    title: "ID",
    description: "",
    name: "id",
    fieldTypeResourceId: "mongo-id-field-type",
    properties: {},
  },
});
