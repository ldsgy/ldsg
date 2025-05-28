import { ROOT_RESOURCE_ID } from "@ldsg/constants";
import {
  RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS as HANDLER_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS,
  HandlerExtendedResourceSettings,
  HandlerSpecificResourceSettings,
} from "@ldsg/handler";
import { RouteSpecificResourceSettings } from "@ldsg/route";
import { ResourceRecord } from "@ldsg/types";
import { RequestHandler } from "express";
import { BLOG_APPLICATION_RESOURCE_ID } from "../constants";

const HEALTH_ROUTE_HANDLER_RESOURCE_ID = "health-route-handler";

const handler: RequestHandler = (req, res) => {
  res.send("ok");
};

export const healthRouteHandlerResourceRecord: ResourceRecord<HandlerSpecificResourceSettings> =
  {
    id: HEALTH_ROUTE_HANDLER_RESOURCE_ID,
    kind: HANDLER_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS.kind,
    parentId: ROOT_RESOURCE_ID,
    settings: {
      title: "health 路由处理程序",
      description: "",
      code: "",
      dependencies: [],
      handler,
    },
  };

export const healthRouteResourceRecord: ResourceRecord<
  HandlerExtendedResourceSettings<RouteSpecificResourceSettings>
> = {
  id: "health-route",
  kind: "route",
  parentId: BLOG_APPLICATION_RESOURCE_ID,
  settings: {
    title: "health 路由",
    description: "",
    path: "/health",
    handlerResourceId: HEALTH_ROUTE_HANDLER_RESOURCE_ID,
  },
};
