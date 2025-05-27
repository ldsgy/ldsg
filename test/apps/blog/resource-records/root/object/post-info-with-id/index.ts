import { ROOT_RESOURCE_ID } from "@ldsg/constants";
import { ObjectSpecificResourceSettings } from "@ldsg/object";
import { ResourceRecord } from "@ldsg/types";
import { POST_INFO_WITH_ID_OBJECT_RESOURCE_ID } from "./constants";

export * from "./object-field";

export const postInfoWithIdObjectResourceRecord: ResourceRecord<ObjectSpecificResourceSettings> =
  {
    id: POST_INFO_WITH_ID_OBJECT_RESOURCE_ID,
    kind: "object",
    parentId: ROOT_RESOURCE_ID,
    settings: {
      title: "有ID博文信息",
      description: "",
      name: "post-info-with-id",
    },
  };
