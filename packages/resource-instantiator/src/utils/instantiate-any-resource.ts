import { BASE_RESOURCE_KINDS } from "@ldsg/constants";
import { HandlerExtendedResourceSettings } from "@ldsg/handler";
import { Resource } from "@ldsg/resource";
import { ResourceRecord, SpecificResourceSettings } from "@ldsg/types";
import { instantiateBaseResourceDefinitionResources } from "./instantiate-base-resource-definition-resource";
import { resourceKindMap } from "./resource-kind-map";

interface InstantiateAnyResourceParams<
  T extends SpecificResourceSettings = SpecificResourceSettings
> {
  resourceRecord: ResourceRecord<T>;
  relatedResourceRecords: ResourceRecord[];
}

interface InstantiateAnyResourceRes<R extends Resource = Resource> {
  resource: R;
}

type InstantiateAnyResource<
  T extends SpecificResourceSettings = SpecificResourceSettings,
  R extends Resource = Resource
> = (params: InstantiateAnyResourceParams<T>) => InstantiateAnyResourceRes<R>;

/**
 * 初始化任意资源
 * 可以实例化任意资源（包含资源定义）
 * 如果基建层资源未实例化，则自动实例化。
 */
export const instantiateAnyResource: InstantiateAnyResource = (params) => {
  const { resourceRecord, relatedResourceRecords } = params;

  const { id, kind } = resourceRecord;

  if (id in Resource.resourceMap) {
    const resource = Resource.resourceMap[id];

    const res = {
      resource,
    };

    return res;
  }

  if (!(kind in resourceKindMap)) {
    if (!BASE_RESOURCE_KINDS.includes(kind)) {
      instantiateBaseResourceDefinitionResources({
        resourceRecords: relatedResourceRecords,
      });
    }

    const resourceRecord = relatedResourceRecords?.find(
      (relatedResourceRecord) => {
        return (
          relatedResourceRecord.kind === "RESOURCE_DEFINITION" &&
          (
            relatedResourceRecord as ResourceRecord<
              HandlerExtendedResourceSettings<SpecificResourceSettings>
            >
          ).kind === kind
        );
      }
    );

    if (!resourceRecord) {
      throw new Error(
        "resource definition resource record not in related resource records"
      );
    }

    instantiateAnyResource({
      resourceRecord,
      relatedResourceRecords,
    });
  }

  const { resourceDefinitionResource } = resourceKindMap[kind];

  const { resource } = resourceDefinitionResource.instantiateResource({
    resourceConstructorParams: resourceRecord,
  });

  const res = {
    resource,
  };

  return res;
};
