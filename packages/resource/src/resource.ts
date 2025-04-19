import _, { ListIterateeCustom } from "lodash";
import { ResourceRecord, ResourceSettings } from "./types";

type GetFilteredResourcesParams = ListIterateeCustom<
  Resource<ResourceSettings>,
  boolean
>;

type GetFilteredResources = (params: GetFilteredResourcesParams) => Resource[];

type GetFilteredResource = (
  params: GetFilteredResourcesParams
) => Resource | undefined;

export interface ResourceConstructorParams<
  T extends ResourceSettings = ResourceSettings
> extends ResourceRecord<T> {}

export class Resource<T extends ResourceSettings = ResourceSettings>
  implements ResourceRecord<T>
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
  settings: T;

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
    return this.getFilteredResources(params)[0];
  };

  /**
   * Get Filtered Resources
   */
  getFilteredResources: GetFilteredResources = (params) => {
    const { resourceList } = Resource;

    return _.filter(resourceList, params);
  };
}
