import { ResourceDefinitionResource } from "@ldsg/resource-definition";
import { ResourceRecord } from "@ldsg/types";

export interface InstantiateResourcesResParams {
  resourceRecords: ResourceRecord[];
}

interface ResourceKindMapValue {
  resourceDefinitionResource: ResourceDefinitionResource;
}

export type ResourceKindMap = Record<string, ResourceKindMapValue>;
