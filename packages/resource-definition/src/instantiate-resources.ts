import {
  InstantiateResources,
  ResourceDefinitionResourceSettings,
  ResourceRecord,
  ResourceSettings,
} from "@ldsg/resource";
import { instantiateResource } from "./instantiate-resource";
import { ResourceDefinitionResource } from "./resource";

export const instantiateResources: InstantiateResources<
  ResourceSettings,
  ResourceDefinitionResource
> = (params) => {
  const { resourceRecords } = params;

  const resourceDefinitionManifestResources = resourceRecords.filter(
    (value) => value.kind === "RESOURCE_DEFINITION"
  ) as ResourceRecord<ResourceDefinitionResourceSettings>[];

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
