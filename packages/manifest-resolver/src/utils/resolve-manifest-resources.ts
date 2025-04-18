import { Resource } from "@ldsg/resource";
import { resolveManifestResourcesOfTypeResourceDefinition } from "./resolve-manifest-resources-of-type-resource-definition";
import { ResolveManifestResourcesParams } from "./types";

interface ResolveManifestResourcesRes {
  resources: Resource[];
}

type ResolveManifestResources = (
  params: ResolveManifestResourcesParams
) => ResolveManifestResourcesRes;

/**
 * 处理清单内全部资源
 * 1. 转换清单内全部资源定义类型资源配置为资源实例
 */
export const resolveManifestResources: ResolveManifestResources = (params) => {
  const { resourceRecords } = params;

  const { kindResourceDefinitionResourceMap } =
    resolveManifestResourcesOfTypeResourceDefinition({
      resourceRecords,
    });

  const resources: Resource[] = resourceRecords.map((manifestResource) => {
    const { kind } = manifestResource;

    const resourceDefinitionResource = kindResourceDefinitionResourceMap[kind];

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
