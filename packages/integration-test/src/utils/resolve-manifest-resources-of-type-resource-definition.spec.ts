import { manifest } from "../manifest.spec";
import { resolveManifestResourcesOfTypeResourceDefinition } from "./resolve-manifest-resources-of-type-resource-definition";

test("resolve-manifest-resources-of-type-resource-definition", async () => {
  const { resources } = manifest;

  const resolveManifestResourcesOfTypeHandlerRes =
    resolveManifestResourcesOfTypeResourceDefinition({
      handlerResources: [],
      manifestResources: resources,
    });

  console.debug(
    "resolveManifestResourcesOfTypeHandlerRes",
    resolveManifestResourcesOfTypeHandlerRes
  );
});
