import { appManifest } from "@ldsg/constants";
import { resolveManifestResourcesOfTypeResourceDefinition } from "./resolve-manifest-resources-of-type-resource-definition";

test("resolve-manifest-resources", () => {
  const { resources } = appManifest;

  const { kindResourceDefinitionResourceMap } =
    resolveManifestResourcesOfTypeResourceDefinition({
      manifestResources: resources,
    });

  expect(kindResourceDefinitionResourceMap).toMatchSnapshot();
});
