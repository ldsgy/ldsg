import { RouteSpecificResourceSettings } from "@ldsg/route";
import { ResourceRecord } from "@ldsg/types";

export const healthRouteResourceRecord: ResourceRecord<RouteSpecificResourceSettings> =
  {
    path: "/health",
  };
