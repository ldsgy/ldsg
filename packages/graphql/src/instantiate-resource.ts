import { HandlerExtendedResourceSettings } from "@ldsg/handler";
import { InstantiateResource } from "@ldsg/resource";
import { GraphqlResource } from "./resource";
import { GraphqlSpecificResourceSettings } from "./types";

export const instantiateResource: InstantiateResource<
  HandlerExtendedResourceSettings<GraphqlSpecificResourceSettings>,
  GraphqlResource
> = (params) => {
  const { resourceConstructorParams } = params;

  const resource = new GraphqlResource(resourceConstructorParams);

  const res = {
    resource,
  };

  return res;
};
