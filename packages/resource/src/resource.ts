import {
  ResourceRecord,
  ResourceSettings,
  SpecificResourceSettings,
} from "@ldsg/types";
import _, { ListIterateeCustom } from "lodash";

export interface ResourceConstructorParams<
  T extends SpecificResourceSettings = SpecificResourceSettings
> extends ResourceRecord<T> {}

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

type GetResourcesFromSettingsRes<T extends SpecificResourceSettings> = {
  [K in keyof T as K extends `${infer P}ResourceId`
    ? `${P}Resource`
    : never]: Resource;
};

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

  /**
   * Get Resources From Settings
   */
  getResourcesFromSettings = () => {
    const { settings } = this;

    const pickByRes = _.pickBy(settings, (value, key) =>
      _.endsWith(key, "ResourceId")
    );

    const mapValuesRes = _.mapValues(pickByRes, (resourceId) => {
      const { resource } = this.getFilteredResource({
        id: resourceId,
      });

      return resource;
    });

    const mapKeysRes = _.mapKeys(mapValuesRes, (value, key) => {
      const res = _.replace(key, "ResourceId", "Resource");

      return res;
    });

    const res = mapKeysRes as GetResourcesFromSettingsRes<T>;

    return res;
  };
}
