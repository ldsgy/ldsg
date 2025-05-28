import { ApplicationSpecificResourceSettings } from "@ldsg/application";
import { ROOT_RESOURCE_ID } from "@ldsg/constants";
import { ResourceRecord } from "@ldsg/types";
import { BLOG_APPLICATION_RESOURCE_ID } from "./constants";

export * from "./forms";
export * from "./graphql";
export * from "./route";
export * from "./tables";

export const blogApplicationResourceRecord: ResourceRecord<ApplicationSpecificResourceSettings> =
  {
    id: BLOG_APPLICATION_RESOURCE_ID,
    kind: "application",
    parentId: ROOT_RESOURCE_ID,
    settings: {
      title: "Blog",
      description: "",
    },
  };
