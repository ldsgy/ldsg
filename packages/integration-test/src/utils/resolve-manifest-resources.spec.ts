import { manifest } from "../manifest.spec";
import { resolveManifestResources } from "./resolve-manifest-resources";

test("resolve-manifest-resources", async () => {
  const { resources } = manifest;

  const resolveManifestResourcesRes = resolveManifestResources({
    manifestResources: resources,
  });

  console.debug("resolveManifestResourcesRes", resolveManifestResourcesRes);
});
