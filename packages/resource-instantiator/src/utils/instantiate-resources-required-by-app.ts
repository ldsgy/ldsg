import { InstantiateResources, Resource } from "@ldsg/resource";
import { getResourceKindMap } from "./get-resource-kind-map";

/**
 * 实例化应用所需资源
 * 1. 实例化资源定义资源记录为资源实例
 * 2. 实例化非资源定义资源记录为资源实例
 */
export const instantiateResourcesRequiredByApp: InstantiateResources = (
  params
) => {
  const { resourceRecords } = params;

  const { resourceKindMap } = getResourceKindMap({
    resourceRecords,
  });

  const resources: Resource[] = resourceRecords.map((resourceRecord) => {
    const { kind } = resourceRecord;

    if (!(kind in resourceKindMap)) {
      throw new Error(`invalid kind '${kind}' in resource record`);
    }

    const { resourceDefinitionResource } = resourceKindMap[kind];

    const { resource } = resourceDefinitionResource.instantiateResource({
      resourceConstructorParams: resourceRecord,
    });

    return resource;
  });

  const res = {
    resources,
  };

  return res;
};
