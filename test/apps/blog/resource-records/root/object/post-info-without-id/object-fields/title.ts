import { stringFieldTypeResourceRecord } from "@ldsg/field-type";
import { ObjectFieldSpecificResourceSettings } from "@ldsg/object-field";
import { ResourceRecord } from "@ldsg/types";
import { postInfoWithoutIdObjectResourceRecord } from "..";

export const postInfoWithoutIdObjectTitleObjectFieldResourceRecord: ResourceRecord<ObjectFieldSpecificResourceSettings> =
  {
    id: `${postInfoWithoutIdObjectResourceRecord.id}-title-object-field`,
    kind: "object-field",
    parentId: postInfoWithoutIdObjectResourceRecord.id,
    settings: {
      title: "标题",
      description: "",
      name: "title",
      fieldTypeResourceId: stringFieldTypeResourceRecord.id,
      properties: {},
    },
  };
