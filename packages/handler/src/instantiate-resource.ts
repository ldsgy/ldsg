import { InstantiateResource } from "@ldsg/resource";
import { HandlerResource } from "./resource";
import { HandlerResourceSettings } from "./types";

export const instantiateResource: InstantiateResource<
  HandlerResourceSettings,
  HandlerResource
> = (params) => {
  const { resourceConstructorParams } = params;

  const resource = new HandlerResource(resourceConstructorParams);

  const res = {
    resource,
  };

  return res;
};
