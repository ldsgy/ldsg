import {
  RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS as HANDLER_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS,
  HandlerExtendedResourceSettings,
  HandlerResourceSettings,
  instantiateResources as instantiateHandlerResources,
} from "@ldsg/handler";
import { InstantiateResources } from "@ldsg/resource";
import {
  instantiateResources as instantiateResourceDefinitionResources,
  RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS as RESOURCE_DEFINITION_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS,
  ResourceDefinitionResource,
  ResourceDefinitionSpecificResourceSettings,
} from "@ldsg/resource-definition";
import { ResourceRecord, SpecificResourceSettings } from "@ldsg/types";

/**
 * 实例化资源定义资源组及子级程序处理资源组
 * 同时实例化资源定义资源组及资源定义的子级程序处理资源组
 */
export const instantiateResourceDefinitionResourcesWithSubHandlerResources: InstantiateResources<
  SpecificResourceSettings,
  ResourceDefinitionResource
> = (params) => {
  const { resourceRecords } = params;

  const resourceDefinitionResourceRecords = resourceRecords.filter(
    (value) =>
      value.kind ===
      RESOURCE_DEFINITION_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS.kind
  ) as ResourceRecord<
    HandlerExtendedResourceSettings<ResourceDefinitionSpecificResourceSettings>
  >[];

  const handlerResourceRecords = resourceRecords.filter(
    (value) =>
      value.kind ===
        HANDLER_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS.kind &&
      resourceDefinitionResourceRecords.find(
        (resourceDefinitionResourceRecord) =>
          resourceDefinitionResourceRecord.settings.handlerResourceId ===
          value.id
      )
  ) as ResourceRecord<HandlerResourceSettings>[];

  const { resources: resourceDefinitionResources } =
    instantiateResourceDefinitionResources({
      resourceRecords: resourceDefinitionResourceRecords,
    });

  instantiateHandlerResources({
    resourceRecords: handlerResourceRecords,
  });

  const resources = resourceDefinitionResources;

  const res = {
    resources,
  };

  return res;
};
