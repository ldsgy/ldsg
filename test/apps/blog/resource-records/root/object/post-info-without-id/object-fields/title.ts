import { ObjectFieldSpecificResourceSettings } from "@ldsg/object-field";
import { ResourceRecord } from "@ldsg/types";

export const postInfoWithoutIdObjectTitleObjectFieldResourceRecord: ResourceRecord<ObjectFieldSpecificResourceSettings> =
  {
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
  };
