import { mongoIdFieldTypeResourceRecord } from "@ldsg/field-type";
import { ObjectFieldSpecificResourceSettings } from "@ldsg/object-field";
import { ResourceRecord } from "@ldsg/types";
import { idObjectResourceRecord } from "..";

export const idObjectIdObjectFieldResourceRecord: ResourceRecord<ObjectFieldSpecificResourceSettings> =
  {
    id: `${idObjectResourceRecord.id}-id-object-field`,
    kind: "object-field",
    parentId: idObjectResourceRecord.id,
    settings: {
      title: "ID",
      description: "",
      name: "id",
      fieldTypeResourceId: mongoIdFieldTypeResourceRecord.id,
      properties: {},
    },
  };
