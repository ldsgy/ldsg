import { ROOT_RESOURCE_ID } from "@ldsg/constants";
import { ObjectSpecificResourceSettings } from "@ldsg/object";
import { ResourceRecord } from "@ldsg/types";

export * from "./object-fields";

export const idObjectResource: ResourceRecord<ObjectSpecificResourceSettings> =
  {
    id: "post-info-with-id-object",
    kind: "object",
    parentId: ROOT_RESOURCE_ID,
    settings: {
      title: "有ID博文信息",
      description: "",
      name: "post-info-with-id",
    },
  };
