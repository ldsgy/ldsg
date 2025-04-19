import {
  Resource,
  ResourceDefinitionResourceSettings,
  ResourceRecord,
  ResourceSettings,
} from "@ldsg/resource";
import { ResourceKindMap } from "./types";

const resourceKindMap: ResourceKindMap = {};

interface InstantiateAnyResourceParams<
  T extends ResourceSettings = ResourceSettings
> {
  resourceRecord: ResourceRecord<T>;
  relatedResourceRecords: ResourceRecord[];
}

interface InstantiateAnyResourceRes<R extends Resource = Resource> {
  resource: R;
}

type InstantiateAnyResource<
  T extends ResourceSettings = ResourceSettings,
  R extends Resource = Resource
> = (params: InstantiateAnyResourceParams<T>) => InstantiateAnyResourceRes<R>;

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
    const resourceRecord = relatedResourceRecords?.find(
      (relatedResourceRecord) => {
        return (
          relatedResourceRecord.kind === "RESOURCE_DEFINITION" &&
          (
            relatedResourceRecord as ResourceRecord<ResourceDefinitionResourceSettings>
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
