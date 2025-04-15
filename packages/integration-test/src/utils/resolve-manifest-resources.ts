import { resolveManifestResourcesOfTypeResourceDefinition } from "./resolve-manifest-resources-of-type-resource-definition";
import { ResolveManifestResourcesParams } from "./types";

/**
 * 处理清单内全部资源
 * 1. 转换清单内全部资源定义类型资源配置为资源实例
 */
export const resolveManifestResources = (
  params: ResolveManifestResourcesParams
) => {
  const { manifestResources } = params;

  const { kindResourceMap } = resolveManifestResourcesOfTypeResourceDefinition({
    manifestResources,
  });
};
