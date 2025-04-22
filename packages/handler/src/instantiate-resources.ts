import { InstantiateResources } from "@ldsg/resource";
import { instantiateResource } from "./instantiate-resource";
import { HandlerResource } from "./resource";
import { HandlerSpecificResourceSettings } from "./types";

export const instantiateResources: InstantiateResources<
  HandlerSpecificResourceSettings,
  HandlerResource
> = (params) => {
  const { resourceRecords } = params;

  const resources = resourceRecords.map((manifestResource) => {
    const { resource } = instantiateResource({
      resourceConstructorParams: manifestResource,
    });

    return resource;
  });

  const res = {
    resources,
  };

  return res;
};
