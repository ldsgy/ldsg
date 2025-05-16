import { InstantiateResource } from "@ldsg/resource";
import { DatabaseResource } from "./resource";
import { DatabaseSpecificResourceSettings } from "./types";

export const instantiateResource: InstantiateResource<
  DatabaseSpecificResourceSettings,
  DatabaseResource
> = (params) => {
  const { resourceConstructorParams } = params;

  const resource = new DatabaseResource(resourceConstructorParams);

  const res = {
    resource,
  };

  return res;
};
