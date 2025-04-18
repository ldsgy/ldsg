import * as applicationModule from "@ldsg/application";
import * as handlerModule from "@ldsg/handler";
import { ResourceRecord } from "@ldsg/resource";
import * as resourceDefinitionModule from "@ldsg/resource-definition";
import _ from "lodash";

export const ROOT_RESOURCE_ID = "root";

/**
 * 基座级资源模块
 */
export const BASE_RESOURCE_MODULES = [resourceDefinitionModule, handlerModule];

/**
 * 应用级资源模块
 */
export const APPLICATION_RESOURCE_MODULES = [applicationModule];

export const RESOURCE_MODULES = [
  ...BASE_RESOURCE_MODULES,
  ...APPLICATION_RESOURCE_MODULES,
];

export const RESOURCE_KINDS_RESOURCE_RECORDS: ResourceRecord[] = _.flatMap(
  RESOURCE_MODULES.map((value) => {
    const { resourceDefinitionResourceSettings, handlerResourceSettings } =
      value;

    const resourceKind = _.kebabCase(resourceDefinitionResourceSettings.kind);

    const resourceDefinitionResourceId = `${resourceKind}-resource-definition`;

    const handlerResourceId = `${resourceKind}-resource-handler`;

    const res: ResourceRecord[] = [
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

    return res;
  })
);
