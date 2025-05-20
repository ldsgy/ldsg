import { HandlerExtendedResourceSettings } from "@ldsg/handler";
import { InstantiateResources } from "@ldsg/resource";
import { ResourceDefinitionSpecificResourceSettings } from "@ldsg/resource-definition-part";
import { instantiateResource } from "./instantiate-resource";
import { ResourceDefinitionResource } from "./resource";

export const instantiateResources: InstantiateResources<
  HandlerExtendedResourceSettings<ResourceDefinitionSpecificResourceSettings>,
  ResourceDefinitionResource
> = (params) => {
  const { resourceRecords } = params;

  const resourceDefinitionManifestResources = resourceRecords.filter(
    (value) => value.kind === "resource_definition"
  );

  const resources = resourceDefinitionManifestResources.map(
    (resourceDefinitionManifestResource) => {
      const { resource } = instantiateResource({
        resourceConstructorParams: resourceDefinitionManifestResource,
      });

      return resource;
    }
  );

  const res = {
    resources,
  };

  return res;
};
