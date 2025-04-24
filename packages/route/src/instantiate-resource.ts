import { HandlerExtendedResourceSettings } from "@ldsg/handler";
import { InstantiateResource } from "@ldsg/resource";
import { RouteResource } from "./resource";
import { RouteSpecificResourceSettings } from "./types";

export const instantiateResource: InstantiateResource<
  HandlerExtendedResourceSettings<RouteSpecificResourceSettings>,
  RouteResource
> = (params) => {
  const { resourceConstructorParams } = params;

  const resource = new RouteResource(resourceConstructorParams);

  const res = {
    resource,
  };

  return res;
};
