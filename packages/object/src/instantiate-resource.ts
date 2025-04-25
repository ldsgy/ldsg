import { HandlerExtendedResourceSettings } from "@ldsg/handler";
import { InstantiateResource } from "@ldsg/resource";
import { ObjectResource } from "./resource";
import { ObjectSpecificResourceSettings } from "./types";

export const instantiateResource: InstantiateResource<
  HandlerExtendedResourceSettings<ObjectSpecificResourceSettings>,
  ObjectResource
> = (params) => {
  const { resourceConstructorParams } = params;

  const resource = new ObjectResource(resourceConstructorParams);

  const res = {
    resource,
  };

  return res;
};
