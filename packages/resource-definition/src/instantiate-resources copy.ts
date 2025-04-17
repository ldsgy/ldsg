import {
  HandlerResourceSettings,
  instantiateResources as instantiateHandlerResources,
} from "@ldsg/handler";
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

  const handlerManifestResources = manifestResources.filter(
    (value) =>
      value.kind === "HANDLER" &&
      resourceDefinitionManifestResources.find(
        (resourceDefinitionManifestResource) =>
          resourceDefinitionManifestResource.id === value.parentId
      )
  ) as Manifest.Resource<HandlerResourceSettings>[];

  const { resources: handlerResources } = instantiateHandlerResources({
    manifestResources: handlerManifestResources,
  });

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
