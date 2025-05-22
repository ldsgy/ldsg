import { ObjectFieldResource } from "@ldsg/object-field";

export const postInfoWithoutIdObjectViewsObjectField = new ObjectFieldResource({
  id: "post-info-without-id-object-views-object-field",
  kind: "object-field",
  parentId: "post-info-without-id-object",
  settings: {
    title: "访问量",
    description: "",
    name: "views",
    fieldTypeResourceId: "number-field-type",
    properties: {},
  },
});
