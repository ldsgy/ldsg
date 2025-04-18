import {
  HandlerResourceSettings,
  instantiateResources as instantiateHandlerResources,
} from "@ldsg/handler";
import {
  InstantiateResources,
  Manifest,
  ResourceDefinitionResourceSettings,
} from "@ldsg/resource";
import { instantiateResource as instantiateResourceDefinitionResource } from "@ldsg/resource-definition";
import { ResourceDefinitionResource } from "@ldsg/resource-definition/src/resource";

export const instantiateResources: InstantiateResources<
  Manifest.ResourceSettings,
  ResourceDefinitionResource
> = (params) => {
  const { manifestResources } = params;

  const resourceDefinitionManifestResources = manifestResources.filter(
    (value) => value.kind === "RESOURCE_DEFINITION"
  ) as Manifest.Resource<ResourceDefinitionResourceSettings>[];

  const handlerManifestResources = manifestResources.filter(
    (value) =>
      value.kind === "HANDLER" &&
      resourceDefinitionManifestResources.find(
        (resourceDefinitionManifestResource) =>
          resourceDefinitionManifestResource.id === value.parentId
      )
  ) as Manifest.Resource<HandlerResourceSettings>[];

  instantiateHandlerResources({
    manifestResources: handlerManifestResources,
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
