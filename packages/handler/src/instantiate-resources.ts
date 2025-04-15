import { InstantiateResources } from "@ldsg/resource";
import { instantiateResource } from "./instantiate-resource";
import { HandlerResource } from "./resource";
import { HandlerResourceSettings } from "./types";

export const instantiateResources: InstantiateResources<
  HandlerResourceSettings,
  HandlerResource
> = (params) => {
  const { manifestResources } = params;

  const resources = manifestResources.map((manifestResource) => {
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
