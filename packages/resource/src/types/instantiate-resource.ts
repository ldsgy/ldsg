import { SpecificResourceSettings } from "@ldsg/types";
import { Resource, ResourceConstructorParams } from "../resource";

export interface InstantiateResourceParams<
  T extends SpecificResourceSettings = SpecificResourceSettings
> {
  resourceConstructorParams: ResourceConstructorParams<T>;
}

export interface InstantiateResourceRes<R extends Resource = Resource> {
  resource: R;
}

export type InstantiateResource<
  T extends SpecificResourceSettings = SpecificResourceSettings,
  R extends Resource = Resource
> = (params: InstantiateResourceParams<T>) => InstantiateResourceRes<R>;
