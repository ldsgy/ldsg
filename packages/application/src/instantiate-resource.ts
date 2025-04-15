import { InstantiateResource } from "@ldsg/resource";
import { ApplicationResource } from "./resource";
import { ApplicationResourceSettings } from "./types";

export const instantiateResource: InstantiateResource<
  ApplicationResourceSettings,
  ApplicationResource
> = (params) => {
  const { resourceConstructorParams } = params;

  const resource = new ApplicationResource(resourceConstructorParams);

  const res = {
    resource,
  };

  return res;
};
