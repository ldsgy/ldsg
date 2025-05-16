import { HandlerExtendedResourceSettings } from "@ldsg/handler";
import { InstantiateResource } from "@ldsg/resource";
import { FormsResource } from "./resource";
import { FormsSpecificResourceSettings } from "./types";

export const instantiateResource: InstantiateResource<
  HandlerExtendedResourceSettings<FormsSpecificResourceSettings>,
  FormsResource
> = (params) => {
  const { resourceConstructorParams } = params;

  const resource = new FormsResource(resourceConstructorParams);

  const res = {
    resource,
  };

  return res;
};
