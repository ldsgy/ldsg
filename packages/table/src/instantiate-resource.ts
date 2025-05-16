import { HandlerExtendedResourceSettings } from "@ldsg/handler";
import { InstantiateResource } from "@ldsg/resource";
import { TableResource } from "./resource";
import { TableSpecificResourceSettings } from "./types";

export const instantiateResource: InstantiateResource<
  HandlerExtendedResourceSettings<TableSpecificResourceSettings>,
  TableResource
> = (params) => {
  const { resourceConstructorParams } = params;

  const resource = new TableResource(resourceConstructorParams);

  const res = {
    resource,
  };

  return res;
};
