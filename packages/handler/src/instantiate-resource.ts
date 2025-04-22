import { InstantiateResource } from "@ldsg/resource";
import { HandlerResource } from "./resource";
import { HandlerSpecificResourceSettings } from "./types";

export const instantiateResource: InstantiateResource<
  HandlerSpecificResourceSettings,
  HandlerResource
> = (params) => {
  const { resourceConstructorParams } = params;

  const resource = new HandlerResource(resourceConstructorParams);

  const res = {
    resource,
  };

  return res;
};
