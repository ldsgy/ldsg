import { ObjectSpecificResourceSettings } from "@ldsg/object";
import { ResourceRecord } from "@ldsg/types";

export * from "./object-fields";

export const idObjectResource: ResourceRecord<ObjectSpecificResourceSettings> =
  {
    id: "id-object",
    kind: "object",
    parentId: "root",
    settings: {
      title: "ID",
      description: "",
      name: "id",
    },
  };
