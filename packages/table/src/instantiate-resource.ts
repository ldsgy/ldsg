import { HandlerExtendedResourceSettings } from "@ldsg/handler";
import { InstantiateResource } from "@ldsg/resource";
import { FormResource } from "./resource";
import { FormSpecificResourceSettings } from "./types";

export const instantiateResource: InstantiateResource<
  HandlerExtendedResourceSettings<FormSpecificResourceSettings>,
  FormResource
> = (params) => {
  const { resourceConstructorParams } = params;

  const resource = new FormResource(resourceConstructorParams);

  const res = {
    resource,
  };

  return res;
};
