import { Resource } from "../resource";
import { Manifest } from "./manifest";

interface Params<
  T extends Manifest.ResourceSettings = Manifest.ResourceSettings
> {
  manifestResources: Manifest.Resource<T>[];
}

export interface InstantiateResourcesRes<R extends Resource = Resource> {
  resources: R[];
}

export type InstantiateResources<
  T extends Manifest.ResourceSettings = Manifest.ResourceSettings,
  R extends Resource = Resource
> = (params: Params<T>) => InstantiateResourcesRes<R>;
