import { ResourceRecord } from "@ldsg/resource";
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

    const { resourceDefinitionResourceSettings, handlerResourceSettings } =
      resourceModule;

    const resourceKind = _.kebabCase(resourceDefinitionResourceSettings.kind);

    const resourceDefinitionResourceId = `${resourceKind}-resource-definition`;

    const handlerResourceId = `${resourceKind}-resource-handler`;

    const resourceRecords: ResourceRecord[] = [
      {
        id: resourceDefinitionResourceId,
        kind: "RESOURCE_DEFINITION",
        parentId: ROOT_RESOURCE_ID,
        settings: resourceDefinitionResourceSettings,
      },
      {
        id: handlerResourceId,
        kind: "HANDLER",
        parentId: resourceDefinitionResourceId,
        settings: handlerResourceSettings,
      },
    ];

    const res = { resourceRecords };

    return res;
  };
