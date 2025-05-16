import { HandlerExtendedResourceSettings } from "@ldsg/handler";
import { InstantiateResource } from "@ldsg/resource";
import { TablesResource } from "./resource";
import { TablesSpecificResourceSettings } from "./types";

export const instantiateResource: InstantiateResource<
  HandlerExtendedResourceSettings<TablesSpecificResourceSettings>,
  TablesResource
> = (params) => {
  const { resourceConstructorParams } = params;

  const resource = new TablesResource(resourceConstructorParams);

  const res = {
    resource,
  };

  return res;
};
