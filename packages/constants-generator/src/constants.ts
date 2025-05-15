import * as applicationModule from "@ldsg/application";
import * as handlerModule from "@ldsg/handler";
import * as resourceDefinitionModule from "@ldsg/resource-definition";
import { ResourceRecord } from "@ldsg/types";

export const ROOT_RESOURCE_ID = "root";

/**
 * 基座级资源模块
 */
export const BASE_RESOURCE_MODULES = [resourceDefinitionModule, handlerModule];

export const BASE_RESOURCE_KINDS = BASE_RESOURCE_MODULES.map(
  (baseResourceModule) =>
    baseResourceModule.RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS.kind
);

/**
 * 应用级资源模块
 */
export const APPLICATION_RESOURCE_MODULES = [applicationModule];

/**
 * 资源模块
 */
export const RESOURCE_MODULES = [
  ...BASE_RESOURCE_MODULES,
  ...APPLICATION_RESOURCE_MODULES,
];

export const MANIFEST_LIST: {
  name: string;
  resourceRecords: ResourceRecord[];
}[] = [
  {
    name: "app",
    resourceRecords: [
      {
        id: "main-app",
        kind: "application",
        parentId: ROOT_RESOURCE_ID,
        settings: {
          title: "主要应用",
          description: "",
        },
      },
    ],
  },
];
