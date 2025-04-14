import * as application from "@ldsg/application";
import * as handler from "@ldsg/handler";
import { Manifest } from "@ldsg/resource";
import * as resourceDefinition from "@ldsg/resource-definition";
import _ from "lodash";
// import request from "supertest";

const resourceKinds = [resourceDefinition, application, handler];

const resourceKindsMapRes = resourceKinds.map((value) => {
  const { resourceDefinitionResourceSettings, handlerResourceSettings } = value;

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
});

const resourceKindsResources: Manifest.Resource[] =
  _.flatMap(resourceKindsMapRes);

export const manifest: Manifest = {
  resources: [...resourceKindsResources],
};

test("manifest", async () => {
  expect(manifest).toMatchSnapshot();

  // const application = new ApplicationResource({
  //   id: "APPLICATION",
  //   kind: "APPLICATION",
  //   parentId: "ROOT",
  //   settings: {
  //     title: "应用",
  //     description: "应用根资源",
  //   },
  // });
  // const app = application.createExpressApplication();
  // const response = await request(app).get("/");
  // expect(response.statusCode).toBe(200);
});
