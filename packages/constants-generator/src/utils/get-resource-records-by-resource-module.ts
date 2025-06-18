import { HandlerExtendedResourceSettings } from "@ldsg/handler";
import { ResourceDefinitionSpecificResourceSettings } from "@ldsg/resource-definition";
import { ResourceRecord } from "@ldsg/types";
import _ from "lodash";
import { ROOT_RESOURCE_ID } from "../constants";

interface Params {
  resourceModule: any;
}

interface Res {
  resourceRecords: ResourceRecord[];
}

type GetResourceRecordsByResourceModule = (params: Params) => Res;

export const getResourceRecordsByResourceModule: GetResourceRecordsByResourceModule =
  (params) => {
    const { resourceModule } = params;

    const { RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS } = resourceModule;

    const resourceKind = _.kebabCase(
      RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS.kind
    );

    const resourceDefinitionResourceId = `${resourceKind}-resource-definition`;

    const resourceDefinitionHandlerResourceId = `${resourceDefinitionResourceId}-handler`;

    const resourceDefinitionResourceRecord: ResourceRecord<
      HandlerExtendedResourceSettings<ResourceDefinitionSpecificResourceSettings>
    > = {
      id: resourceDefinitionResourceId,
      kind: "resource_definition",
      parentId: ROOT_RESOURCE_ID,
      settings: {
        handlerResourceId: resourceDefinitionHandlerResourceId,
        ...resourceModule.RESOURCE_DEFINITION_GENERAL_RESOURCE_SETTINGS,
        ...resourceModule.RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS,
      },
    };

    const handlerResourceRecord: ResourceRecord<
      HandlerExtendedResourceSettings<ResourceDefinitionSpecificResourceSettings>
    > = {
      id: resourceDefinitionHandlerResourceId,
      kind: "handler",
      parentId: ROOT_RESOURCE_ID,
      settings: {
        ...resourceModule.INSTANTIATE_RESOURCE_HANDLER_GENERAL_RESOURCE_SETTINGS,
        ...resourceModule.INSTANTIATE_RESOURCE_HANDLER_SPECIFIC_RESOURCE_SETTINGS,
      },
    };

    const resourceRecords: ResourceRecord[] = [
      resourceDefinitionResourceRecord,
      handlerResourceRecord,
    ];

    const res = { resourceRecords };

    return res;
  };
