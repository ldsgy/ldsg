import { ResourceRecord } from "@ldsg/resource";
import { ResourceDefinitionResource } from "@ldsg/resource-definition";

export interface InstantiateResourcesResParams {
  resourceRecords: ResourceRecord[];
}

interface ResourceKindMapValue {
  resourceDefinitionResource: ResourceDefinitionResource;
}

export type ResourceKindMap = Record<string, ResourceKindMapValue>;
