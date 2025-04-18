import {
  HandlerResourceSettings,
  instantiateResources as instantiateHandlerResources,
} from "@ldsg/handler";
import {
  InstantiateResources,
  ResourceDefinitionResourceSettings,
  ResourceRecord,
  ResourceSettings,
} from "@ldsg/resource";
import { instantiateResource as instantiateResourceDefinitionResource } from "@ldsg/resource-definition";
import { ResourceDefinitionResource } from "@ldsg/resource-definition/src/resource";

export const instantiateResources: InstantiateResources<
  ResourceSettings,
  ResourceDefinitionResource
> = (params) => {
  const { resourceRecords } = params;

  const resourceDefinitionManifestResources = resourceRecords.filter(
    (value) => value.kind === "RESOURCE_DEFINITION"
  ) as ResourceRecord<ResourceDefinitionResourceSettings>[];

  const handlerManifestResources = resourceRecords.filter(
    (value) =>
      value.kind === "HANDLER" &&
      resourceDefinitionManifestResources.find(
        (resourceDefinitionManifestResource) =>
          resourceDefinitionManifestResource.id === value.parentId
      )
  ) as ResourceRecord<HandlerResourceSettings>[];

  instantiateHandlerResources({
    resourceRecords: handlerManifestResources,
  });

  const resources = resourceDefinitionManifestResources.map(
    (resourceDefinitionManifestResource) => {
      const { resource } = instantiateResourceDefinitionResource({
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
