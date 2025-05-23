import { RouteSpecificResourceSettings } from "@ldsg/route";
import { ResourceRecord } from "@ldsg/types";
import { BLOG_APPLICATION_RESOURCE_ID } from "../constants";

export const healthRouteResourceRecord: ResourceRecord<RouteSpecificResourceSettings> =
  {
    id: "health-route",
    kind: "route",
    parentId: BLOG_APPLICATION_RESOURCE_ID,
    settings: {
      title: "health 路由",
      description: "用于检查应用运行正常",
      path: "/health",
    },
  };
