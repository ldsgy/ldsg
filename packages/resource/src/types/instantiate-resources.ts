import { Resource } from "../resource";
import { ResourceRecord, ResourceSettings } from "./manifest";

export interface InstantiateResourcesParams<
  T extends ResourceSettings = ResourceSettings
> {
  resourceRecords: ResourceRecord<T>[];
}

export interface InstantiateResourcesRes<R extends Resource = Resource> {
  resources: R[];
}

export type InstantiateResources<
  T extends ResourceSettings = ResourceSettings,
  R extends Resource = Resource
> = (params: InstantiateResourcesParams<T>) => InstantiateResourcesRes<R>;
