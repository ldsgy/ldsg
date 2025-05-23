import * as applicationModule from "@ldsg/application";
import * as databaseModule from "@ldsg/database";
import * as fieldTypeModule from "@ldsg/field-type";
import * as formModule from "@ldsg/form";
import * as formsModule from "@ldsg/forms";
import * as graphqlModule from "@ldsg/graphql";
import * as handlerModule from "@ldsg/handler";
import * as objectModule from "@ldsg/object";
import * as objectFieldModule from "@ldsg/object-field";
import * as resourceDefinitionModule from "@ldsg/resource-definition";
import * as routeModule from "@ldsg/route";
import * as tableModule from "@ldsg/table";
import * as tablesModule from "@ldsg/tables";
import { ResourceRecord } from "@ldsg/types";
import * as workflowModule from "@ldsg/workflow";
import * as workflowEdgeModule from "@ldsg/workflow-edge";
import * as workflowNodeModule from "@ldsg/workflow-node";
import * as workflowNodeTypeModule from "@ldsg/workflow-node-type";

export const ROOT_RESOURCE_ID = "root";

export const ROOT_RESOURCE_KIND = "root";

/**
 * 基座级资源模块
 */
export const BASE_RESOURCE_MODULES = [resourceDefinitionModule, handlerModule];

export const BASE_RESOURCE_KINDS = BASE_RESOURCE_MODULES.map(
  (baseResourceModule) =>
    baseResourceModule.RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS.kind
);

/**
 * 资源模块
 */
export const RESOURCE_MODULES = [
  applicationModule,
  databaseModule,
  fieldTypeModule,
  formModule,
  formsModule,
  graphqlModule,
  handlerModule,
  objectModule,
  objectFieldModule,
  resourceDefinitionModule,
  routeModule,
  tableModule,
  tablesModule,
  workflowModule,
  workflowEdgeModule,
  workflowNodeModule,
  workflowNodeTypeModule,
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
