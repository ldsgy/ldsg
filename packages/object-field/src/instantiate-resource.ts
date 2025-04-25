import { HandlerExtendedResourceSettings } from "@ldsg/handler";
import { InstantiateResource } from "@ldsg/resource";
import { ObjectFieldResource } from "./resource";
import { ObjectFieldSpecificResourceSettings } from "./types";

export const instantiateResource: InstantiateResource<
  HandlerExtendedResourceSettings<ObjectFieldSpecificResourceSettings>,
  ObjectFieldResource
> = (params) => {
  const { resourceConstructorParams } = params;

  const resource = new ObjectFieldResource(resourceConstructorParams);

  const res = {
    resource,
  };

  return res;
};
