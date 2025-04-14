import { manifest } from "../manifest.spec";
import { resolveManifestResourcesOfTypeHandler } from "./resolve-manifest-resources-of-type-handler";

test("manifest", async () => {
  const { resources } = manifest;

  const resolveManifestResourcesOfTypeHandlerRes =
    resolveManifestResourcesOfTypeHandler({
      manifestResources: resources,
    });

  console.debug(
    "resolveManifestResourcesOfTypeHandlerRes",
    resolveManifestResourcesOfTypeHandlerRes
  );
});
