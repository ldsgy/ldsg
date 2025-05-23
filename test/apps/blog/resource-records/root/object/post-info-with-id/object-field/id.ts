import { mongoIdFieldTypeResourceRecord } from "@ldsg/field-type";
import { ObjectFieldSpecificResourceSettings } from "@ldsg/object-field";
import { ResourceRecord } from "@ldsg/types";
import { postInfoWithIdObjectResourceRecord } from "..";

export const postInfoWithIdObjectIdObjectFieldResourceRecord: ResourceRecord<ObjectFieldSpecificResourceSettings> =
  {
    id: `${postInfoWithIdObjectResourceRecord.id}-id-object-field`,
    kind: "object-field",
    parentId: postInfoWithIdObjectResourceRecord.id,
    settings: {
      title: "ID",
      description: "",
      name: "id",
      fieldTypeResourceId: mongoIdFieldTypeResourceRecord.id,
      properties: {},
    },
  };
