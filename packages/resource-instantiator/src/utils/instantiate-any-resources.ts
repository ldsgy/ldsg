import { Resource, ResourceRecord, ResourceSettings } from "@ldsg/resource";
import { instantiateAnyResource } from "./instantiate-any-resource";

interface InstantiateAnyResourcesParams<
  T extends ResourceSettings = ResourceSettings
> {
  resourceRecords: ResourceRecord<T>[];
  relatedResourceRecords: ResourceRecord[];
}

interface InstantiateAnyResourcesRes<R extends Resource = Resource> {
  resources: R[];
}

type InstantiateAnyResources<
  T extends ResourceSettings = ResourceSettings,
  R extends Resource = Resource
> = (params: InstantiateAnyResourcesParams<T>) => InstantiateAnyResourcesRes<R>;

export const instantiateAnyResources: InstantiateAnyResources = (params) => {
  const { resourceRecords, relatedResourceRecords } = params;

  const resources = resourceRecords.map((resourceRecord) => {
    const { resource } = instantiateAnyResource({
      resourceRecord,
      relatedResourceRecords,
    });

    return resource;
  });

  const res = {
    resources,
  };

  return res;
};
