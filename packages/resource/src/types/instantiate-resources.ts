import { ResourceRecord, SpecificResourceSettings } from "@ldsg/types";
import { Resource } from "../resource";

export interface InstantiateResourcesParams<
  T extends SpecificResourceSettings = SpecificResourceSettings
> {
  resourceRecords: ResourceRecord<T>[];
}

export interface InstantiateResourcesRes<R extends Resource = Resource> {
  resources: R[];
}

export type InstantiateResources<
  T extends SpecificResourceSettings = SpecificResourceSettings,
  R extends Resource = Resource
> = (params: InstantiateResourcesParams<T>) => InstantiateResourcesRes<R>;
