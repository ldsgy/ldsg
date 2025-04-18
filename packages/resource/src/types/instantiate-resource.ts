import { Resource, ResourceConstructorParams } from "../resource";
import { ResourceSettings } from "./manifest";

export interface InstantiateResourceParams<
  T extends ResourceSettings = ResourceSettings
> {
  resourceConstructorParams: ResourceConstructorParams<T>;
}

export interface InstantiateResourceRes<R extends Resource = Resource> {
  resource: R;
}

export type InstantiateResource<
  T extends ResourceSettings = ResourceSettings,
  R extends Resource = Resource
> = (params: InstantiateResourceParams<T>) => InstantiateResourceRes<R>;
