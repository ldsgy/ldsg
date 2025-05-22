import { ObjectFieldSpecificResourceSettings } from "@ldsg/object-field";
import { ResourceRecord } from "@ldsg/types";

export const idObjectIdObjectFieldResourceRecord: ResourceRecord<ObjectFieldSpecificResourceSettings> =
  {
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
  };
