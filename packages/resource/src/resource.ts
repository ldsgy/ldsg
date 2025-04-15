import _, { ListIterateeCustom } from "lodash";
import { Manifest } from "./types/manifest";

type GetFilteredResourcesParams = ListIterateeCustom<
  Resource<Manifest.ResourceSettings>,
  boolean
>;

type GetFilteredResources = (params: GetFilteredResourcesParams) => Resource[];

type GetFilteredResource = (
  params: GetFilteredResourcesParams
) => Resource | undefined;

export interface ResourceConstructorParams<
  T extends Manifest.ResourceSettings = Manifest.ResourceSettings
> extends Manifest.Resource<T> {
  relatedResources?: Resource[];
}

export class Resource<
  T extends Manifest.ResourceSettings = Manifest.ResourceSettings
> implements Manifest.Resource<T>
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
   * Related Resources
   */
  relatedResources: Resource[];

  constructor(params: ResourceConstructorParams<T>) {
    const { id, kind, parentId, settings, relatedResources = [] } = params;

    this.id = id;
    this.kind = kind;
    this.parentId = parentId;
    this.settings = settings;
    this.relatedResources = relatedResources;
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
    const { relatedResources } = this;

    console.debug("getFilteredResources relatedResources", relatedResources);

    console.debug("getFilteredResources params", params);

    return _.filter(relatedResources, params);
  };
}
