import {
  ResourceRecord,
  ResourceSettings,
  SpecificResourceSettings,
} from "@ldsg/types";
import _, { ListIterateeCustom } from "lodash";

type GetFilteredResourcesParams = ListIterateeCustom<Resource, boolean>;

interface GetFilteredResourceRes {
  resource: Resource | undefined;
}

type GetFilteredResource = (
  params: GetFilteredResourcesParams
) => GetFilteredResourceRes;

interface GetFilteredResourcesRes {
  resources: Resource[];
}

type GetFilteredResources = (
  params: GetFilteredResourcesParams
) => GetFilteredResourcesRes;

export interface ResourceConstructorParams<
  T extends SpecificResourceSettings = SpecificResourceSettings
> extends ResourceRecord<T> {}

export class Resource<
  T extends SpecificResourceSettings = SpecificResourceSettings
> implements ResourceRecord<T>
{
  /**
   * Resource ID
   */
  id: string;

  /**
   * Resource Kind
   */
  kind: string;

  /**
   * Parent Resource ID
   */
  parentId: string;

  /**
   * Resource Settings
   */
  settings: ResourceSettings<T>;

  /**
   * Resource List
   */
  static resourceList: Resource[] = [];

  /**
   * Resource Map
   */
  static resourceMap: Record<string, Resource> = {};

  constructor(params: ResourceConstructorParams<T>) {
    const { id, kind, parentId, settings } = params;

    this.id = id;
    this.kind = kind;
    this.parentId = parentId;
    this.settings = settings;

    Resource.resourceList.push(this);

    Resource.resourceMap[id] = this;
  }

  /**
   * Get Filtered Resource
   */
  getFilteredResource: GetFilteredResource = (params) => {
    const getFilteredResourcesRes = this.getFilteredResources(params);

    const res: GetFilteredResourceRes = {
      resource: getFilteredResourcesRes.resources[0],
    };

    return res;
  };

  /**
   * Get Filtered Resources
   */
  getFilteredResources: GetFilteredResources = (params) => {
    const { resourceList } = Resource;

    const filterRes = _.filter(resourceList, params);

    const res: GetFilteredResourcesRes = {
      resources: filterRes,
    };

    return res;
  };
}
