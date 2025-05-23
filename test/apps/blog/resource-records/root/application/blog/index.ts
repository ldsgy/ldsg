import { ApplicationSpecificResourceSettings } from "@ldsg/application";
import { ROOT_RESOURCE_ID } from "@ldsg/constants";
import { ResourceRecord } from "@ldsg/types";

export const blogApplicationResourceRecord: ResourceRecord<ApplicationSpecificResourceSettings> =
  {
    id: "blog-application",
    kind: "application",
    parentId: ROOT_RESOURCE_ID,
    settings: {
      title: "博客应用",
      description: "",
    },
  };
