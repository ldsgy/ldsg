import { Resource, ResourceConstructorParams } from "../resource";
import { Manifest } from "./manifest";

export interface InstantiateResourceParams<
  T extends Manifest.ResourceSettings = Manifest.ResourceSettings
> {
  resourceConstructorParams: ResourceConstructorParams<T>;
}

export interface InstantiateResourceRes<R extends Resource = Resource> {
  resource: R;
}

export type InstantiateResource<
  T extends Manifest.ResourceSettings = Manifest.ResourceSettings,
  R extends Resource = Resource
> = (params: InstantiateResourceParams<T>) => InstantiateResourceRes<R>;
