import * as application from "@ldsg/application";
import * as handler from "@ldsg/handler";
import { Manifest } from "@ldsg/resource";
import * as resourceDefinition from "@ldsg/resource-definition";
import _ from "lodash";

export const ROOT_RESOURCE_ID = "root";

/**
 * 基础层资源类型组
 */
export const BASE_RESOURCE_KINDS = [resourceDefinition, handler];

/**
 * 应用层资源类型组
 */
export const APPLICATION_RESOURCE_KINDS = [application];

export const RESOURCE_KINDS = [
  ...BASE_RESOURCE_KINDS,
  ...APPLICATION_RESOURCE_KINDS,
];

export const RESOURCE_KINDS_RESOURCES: Manifest.Resource[] = _.flatMap(
  RESOURCE_KINDS.map((value) => {
    const { resourceDefinitionResourceSettings, handlerResourceSettings } =
      value;

    const resourceKind = _.kebabCase(resourceDefinitionResourceSettings.kind);

    const resourceDefinitionResourceId = `${resourceKind}-resource-definition`;

    const handlerResourceId = `${resourceKind}-resource-handler`;

    const res: Manifest.Resource[] = [
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
