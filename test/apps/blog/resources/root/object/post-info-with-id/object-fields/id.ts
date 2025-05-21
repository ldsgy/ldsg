import { ObjectFieldResource } from "@ldsg/object-field";

export const postInfoWithIdObjectIdObjectField = new ObjectFieldResource({
  id: "post-info-with-id-object-id-object-field",
  kind: "object-field",
  parentId: "post-info-with-id-object",
  settings: {
    title: "ID",
    description: "",
    name: "id",
    fieldTypeResourceId: "mongo-id-field-type",
    properties: {},
  },
});
