import {
  InstantiateResources,
  Manifest,
  ResourceDefinitionResourceSettings,
} from "@ldsg/resource";
import { instantiateResource } from "./instantiate-resource";
import { ResourceDefinitionResource } from "./resource";

export const instantiateResources: InstantiateResources<
  Manifest.ResourceSettings,
  ResourceDefinitionResource
> = (params) => {
  const { manifestResources } = params;

  const resourceDefinitionManifestResources = manifestResources.filter(
    (value) => value.kind === "RESOURCE_DEFINITION"
  ) as Manifest.Resource<ResourceDefinitionResourceSettings>[];

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
