import { ObjectFieldSpecificResourceSettings } from "@ldsg/object-field";
import { ResourceRecord } from "@ldsg/types";

export const postInfoWithIdObjectIdObjectFieldResourceRecord: ResourceRecord<ObjectFieldSpecificResourceSettings> =
  {
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
  };
