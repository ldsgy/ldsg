import { InstantiateResource } from "@ldsg/resource";
import { ApplicationResource } from "./resource";
import { ApplicationSpecificResourceSettings } from "./types";

export const instantiateResource: InstantiateResource<
  ApplicationSpecificResourceSettings,
  ApplicationResource
> = (params) => {
  const { resourceConstructorParams } = params;

  const resource = new ApplicationResource(resourceConstructorParams);

  const res = {
    resource,
  };

  return res;
};
