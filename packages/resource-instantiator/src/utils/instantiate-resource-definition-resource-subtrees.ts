import {
  HandlerResourceSettings,
  instantiateResources as instantiateHandlerResources,
} from "@ldsg/handler";
import {
  InstantiateResources,
  ResourceDefinitionResourceSettings,
  ResourceRecord,
  ResourceSettings,
} from "@ldsg/resource";
import { instantiateResources as instantiateResourceDefinitionResources } from "@ldsg/resource-definition";
import { ResourceDefinitionResource } from "@ldsg/resource-definition/src/resource";

/**
 * 实例化资源定义资源子树
 */
export const instantiateResourceDefinitionResourceSubtrees: InstantiateResources<
  ResourceSettings,
  ResourceDefinitionResource
> = (params) => {
  const { resourceRecords } = params;

  const resourceDefinitionResourceRecords = resourceRecords.filter(
    (value) => value.kind === "RESOURCE_DEFINITION"
  ) as ResourceRecord<ResourceDefinitionResourceSettings>[];

  const handlerResourceRecords = resourceRecords.filter(
    (value) =>
      value.kind === "HANDLER" &&
      resourceDefinitionResourceRecords.find(
        (resourceDefinitionResourceRecord) =>
          resourceDefinitionResourceRecord.id === value.parentId
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
