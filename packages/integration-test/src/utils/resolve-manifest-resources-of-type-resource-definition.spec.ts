import { ApplicationResource } from "@ldsg/application";
import request from "supertest";
import { manifest } from "../manifest.spec";
import { resolveManifestResourcesOfTypeResourceDefinition } from "./resolve-manifest-resources-of-type-resource-definition";

test("resolve-manifest-resources", async () => {
  const { resources } = manifest;

  const { kindResourceMap } = resolveManifestResourcesOfTypeResourceDefinition({
    manifestResources: resources,
  });

  const { resource: applicationResource } = kindResourceMap[
    "APPLICATION"
  ].instantiateResource({
    resourceConstructorParams: {
      id: "main-app",
      kind: "APPLICATION",
      parentId: "ROOT",
      settings: {
        title: "主要应用",
        description: "",
      },
    },
  });

  console.debug("applicationResource", applicationResource);

  const app = (applicationResource as ApplicationResource).createApp();

  const response = await request(app).get("/");

  expect(response.statusCode).toBe(200);

  expect(response.text).toBe("Hello, World!");
});
