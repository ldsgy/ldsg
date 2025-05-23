import { RouteSpecificResourceSettings } from "@ldsg/route";
import { ResourceRecord } from "@ldsg/types";
import { blogApplicationResourceRecord } from "..";

export const healthRouteResourceRecord: ResourceRecord<RouteSpecificResourceSettings> =
  {
    id: "health-route",
    kind: "route",
    parentId: blogApplicationResourceRecord.id,
    settings: {
      title: "health 路由",
      description: "用于检查应用运行正常",
      path: "/health",
    },
  };
