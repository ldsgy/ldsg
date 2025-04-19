import { Resource } from "@ldsg/resource";
import { getResourceKindMap } from "./get-resource-kind-map";
import { ResolveManifestResourcesParams } from "./types";

interface ResolveManifestResourcesRes {
  resources: Resource[];
}

type ResolveManifestResources = (
  params: ResolveManifestResourcesParams
) => ResolveManifestResourcesRes;

/**
 * 实例化应用资源
 * 1. 实例化资源定义资源记录为资源实例
 * 2. 实例化非资源定义资源记录为资源实例
 */
export const instantiateAppResources: ResolveManifestResources = (params) => {
  const { resourceRecords } = params;

  const { resourceKindMap } = getResourceKindMap({
    resourceRecords,
  });

  const resources: Resource[] = resourceRecords.map((manifestResource) => {
    const { kind } = manifestResource;

    const { resourceDefinitionResource } = resourceKindMap[kind];

    const { resource } = resourceDefinitionResource.instantiateResource({
      resourceConstructorParams: {
        ...manifestResource,
      },
    });

    return resource;
  });

  const res = {
    resources,
  };

  return res;
};
