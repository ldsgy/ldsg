import { HandlerSpecificResourceSettings } from "@ldsg/handler-part";
import { InstantiateResources } from "@ldsg/resource";
import { instantiateResource } from "./instantiate-resource";
import { HandlerResource } from "./resource";

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
