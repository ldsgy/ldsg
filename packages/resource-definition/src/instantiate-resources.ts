import { InstantiateResources } from "@ldsg/resource";
import { ResourceDefinitionSpecificResourceSettings } from "@ldsg/resource-definition-part";
import { ResourceRecord, ResourceSettings } from "@ldsg/types";
import { instantiateResource } from "./instantiate-resource";
import { ResourceDefinitionResource } from "./resource";

export const instantiateResources: InstantiateResources<
  ResourceSettings,
  ResourceDefinitionResource
> = (params) => {
  const { resourceRecords } = params;

  const resourceDefinitionManifestResources = resourceRecords.filter(
    (value) => value.kind === "RESOURCE_DEFINITION"
  ) as ResourceRecord<ResourceDefinitionSpecificResourceSettings>[];

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
