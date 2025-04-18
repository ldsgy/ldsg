import { APP_MANIFEST } from "@ldsg/constants";
import { resolveManifestResourcesOfTypeResourceDefinition } from "./resolve-manifest-resources-of-type-resource-definition";

test("resolve-manifest-resources", () => {
  const { resourceRecords } = APP_MANIFEST;

  const { kindResourceDefinitionResourceMap } =
    resolveManifestResourcesOfTypeResourceDefinition({
      resourceRecords,
    });

  expect(kindResourceDefinitionResourceMap).toMatchSnapshot();
});
