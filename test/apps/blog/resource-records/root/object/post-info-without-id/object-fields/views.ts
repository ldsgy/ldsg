import { ObjectFieldSpecificResourceSettings } from "@ldsg/object-field";
import { ResourceRecord } from "@ldsg/types";

export const postInfoWithoutIdObjectViewsObjectFieldResourceRecord: ResourceRecord<ObjectFieldSpecificResourceSettings> =
  {
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
  };
