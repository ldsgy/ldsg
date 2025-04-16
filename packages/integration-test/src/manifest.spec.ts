import * as application from "@ldsg/application";
import * as handler from "@ldsg/handler";
import { Manifest } from "@ldsg/resource";
import * as resourceDefinition from "@ldsg/resource-definition";
import _ from "lodash";

/**
 * 基础层资源类型组
 */
const baseResourceKinds = [resourceDefinition, handler];

/**
 * 应用层资源类型组
 */
const applicationResourceKinds = [application];

const resourceKinds = [...baseResourceKinds, ...applicationResourceKinds];

const resourceKindsResources: Manifest.Resource[] = _.flatMap(
  resourceKinds.map((value) => {
    const { resourceDefinitionResourceSettings, handlerResourceSettings } =
      value;

    const resourceKind = resourceDefinitionResourceSettings.kind;

    const resourceDefinitionResourceId = `${resourceKind}_RESOURCE_DEFINITION`;

    const handlerResourceId = `${resourceKind}_RESOURCE_HANDLER`;

    const res: Manifest.Resource[] = [
      {
        id: resourceDefinitionResourceId,
        kind: "RESOURCE_DEFINITION",
        parentId: "ROOT",
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

const applicationResources: Manifest.Resource<Manifest.ResourceSettings>[] = [
  {
    id: "main-app",
    kind: "APPLICATION",
    parentId: "ROOT",
    settings: {
      title: "主要应用",
      description: "",
    },
  },
];

export const manifest: Manifest = {
  resources: [...resourceKindsResources, ...applicationResources],
};

test("manifest", async () => {
  expect(manifest).toMatchSnapshot();
});
