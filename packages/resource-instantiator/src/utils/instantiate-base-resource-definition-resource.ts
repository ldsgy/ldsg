import { BASE_RESOURCE_KINDS } from "@ldsg/constants";
import { HandlerResourceSettings } from "@ldsg/handler";
import {
  InstantiateResources,
  ResourceDefinitionResourceSettings,
  ResourceRecord,
  ResourceSettings,
} from "@ldsg/resource";
import { ResourceDefinitionResource } from "@ldsg/resource-definition/src/resource";
import { instantiateResourceDefinitionResourcesWithSubHandlerResources } from "./instantiate-resource-definition-resources-with-sub-handler-resources";

/**
 * 实例化基座级资源定义资源组
 */
export const instantiateBaseResourceDefinitionResources: InstantiateResources<
  ResourceSettings,
  ResourceDefinitionResource
> = (params) => {
  const { resourceRecords } = params;

  const resourceDefinitionResourceRecords = resourceRecords.filter(
    (resourceRecord) =>
      resourceRecord.kind === "RESOURCE_DEFINITION" &&
      BASE_RESOURCE_KINDS.includes(
        (resourceRecord as ResourceRecord<ResourceDefinitionResourceSettings>)
          .settings.kind
      )
  ) as ResourceRecord<ResourceDefinitionResourceSettings>[];

  const handlerResourceRecords = resourceRecords.filter(
    (value) =>
      value.kind === "HANDLER" &&
      resourceDefinitionResourceRecords.find(
        (resourceDefinitionResourceRecord) =>
          resourceDefinitionResourceRecord.id === value.parentId
      )
  ) as ResourceRecord<HandlerResourceSettings>[];

  const res = instantiateResourceDefinitionResourcesWithSubHandlerResources({
    resourceRecords: [
      ...handlerResourceRecords,
      ...resourceDefinitionResourceRecords,
    ],
  });

  return res;
};
