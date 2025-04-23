import { BASE_RESOURCE_KINDS } from "@ldsg/constants";
import {
  HandlerExtendedResourceSettings,
  HandlerResourceSettings,
} from "@ldsg/handler";
import { InstantiateResources } from "@ldsg/resource";
import {
  ResourceDefinitionResource,
  ResourceDefinitionSpecificResourceSettings,
} from "@ldsg/resource-definition";
import { ResourceRecord, SpecificResourceSettings } from "@ldsg/types";
import { instantiateResourceDefinitionResourcesWithSubHandlerResources } from "./instantiate-resource-definition-resources-with-sub-handler-resources";
import { resourceKindMap } from "./resource-kind-map";

/**
 * 实例化基座级资源定义资源组
 */
export const instantiateBaseResourceDefinitionResources: InstantiateResources<
  SpecificResourceSettings,
  ResourceDefinitionResource
> = (params) => {
  const { resourceRecords } = params;

  const resourceDefinitionResourceRecords = resourceRecords.filter(
    (resourceRecord) =>
      resourceRecord.kind === "RESOURCE_DEFINITION" &&
      BASE_RESOURCE_KINDS.includes(
        (
          resourceRecord as ResourceRecord<
            HandlerExtendedResourceSettings<ResourceDefinitionSpecificResourceSettings>
          >
        ).settings.kind
      )
  ) as ResourceRecord<
    HandlerExtendedResourceSettings<ResourceDefinitionSpecificResourceSettings>
  >[];

  const handlerResourceRecords = resourceRecords.filter(
    (value) =>
      value.kind === "HANDLER" &&
      resourceDefinitionResourceRecords.find(
        (resourceDefinitionResourceRecord) =>
          resourceDefinitionResourceRecord.id === value.parentId
      )
  ) as ResourceRecord<HandlerResourceSettings>[];

  const instantiateResourceDefinitionResourcesWithSubHandlerResourcesRes =
    instantiateResourceDefinitionResourcesWithSubHandlerResources({
      resourceRecords: [
        ...handlerResourceRecords,
        ...resourceDefinitionResourceRecords,
      ],
    });

  const { resources: resourceDefinitionResources } =
    instantiateResourceDefinitionResourcesWithSubHandlerResourcesRes;

  for (const resourceDefinitionResource of resourceDefinitionResources) {
    resourceKindMap[resourceDefinitionResource.settings.kind] = {
      resourceDefinitionResource,
    };
  }

  return instantiateResourceDefinitionResourcesWithSubHandlerResourcesRes;
};
