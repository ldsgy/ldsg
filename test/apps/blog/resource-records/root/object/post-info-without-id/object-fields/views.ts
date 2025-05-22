import { numberFieldTypeResourceRecord } from "@ldsg/field-type";
import { ObjectFieldSpecificResourceSettings } from "@ldsg/object-field";
import { ResourceRecord } from "@ldsg/types";
import { postInfoWithoutIdObjectResourceRecord } from "..";

export const postInfoWithoutIdObjectViewsObjectFieldResourceRecord: ResourceRecord<ObjectFieldSpecificResourceSettings> =
  {
    id: `${postInfoWithoutIdObjectResourceRecord.id}-views-object-field`,
    kind: "object-field",
    parentId: postInfoWithoutIdObjectResourceRecord.id,
    settings: {
      title: "访问量",
      description: "",
      name: "views",
      fieldTypeResourceId: numberFieldTypeResourceRecord.id,
      properties: {},
    },
  };
