import { Resource } from "../resource";
import { ResourceRecord, ResourceSettings } from "./manifest";

interface Params<T extends ResourceSettings = ResourceSettings> {
  resourceRecords: ResourceRecord<T>[];
}

export interface InstantiateResourcesRes<R extends Resource = Resource> {
  resources: R[];
}

export type InstantiateResources<
  T extends ResourceSettings = ResourceSettings,
  R extends Resource = Resource
> = (params: Params<T>) => InstantiateResourcesRes<R>;
