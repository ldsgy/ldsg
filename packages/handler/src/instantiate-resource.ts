import { HandlerSpecificResourceSettings } from "@ldsg/handler-part";
import { InstantiateResource } from "@ldsg/resource";
import { HandlerResource } from "./resource";

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
