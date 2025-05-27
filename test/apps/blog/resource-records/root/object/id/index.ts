import { ObjectSpecificResourceSettings } from "@ldsg/object";
import { ResourceRecord } from "@ldsg/types";
import { ID_OBJECT_RESOURCE_ID } from "./constants";

export * from "./object-field";

export const idObjectResourceRecord: ResourceRecord<ObjectSpecificResourceSettings> =
  {
    id: ID_OBJECT_RESOURCE_ID,
    kind: "object",
    parentId: "root",
    settings: {
      title: "ID",
      description: "",
      name: "id",
    },
  };
