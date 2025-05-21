import { ObjectFieldResource } from "@ldsg/object-field";

export const postInfoWithoutIdObjectTitleObjectField = new ObjectFieldResource({
  id: "post-info-without-id-object-title-object-field",
  kind: "object-field",
  parentId: "post-info-without-id-object",
  settings: {
    title: "标题",
    description: "",
    name: "title",
    fieldTypeResourceId: "string-field-type",
    properties: {},
  },
});
