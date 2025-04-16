import { appManifest } from "@ldsg/constants";
import { resolveManifestResources } from "./resolve-manifest-resources";

test("resolve-manifest-resources", async () => {
  const { resources } = appManifest;

  const resolveManifestResourcesRes = resolveManifestResources({
    manifestResources: resources,
  });

  console.debug("resolveManifestResourcesRes", resolveManifestResourcesRes);
});
