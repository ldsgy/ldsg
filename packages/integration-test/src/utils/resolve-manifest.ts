import { Manifest } from "@ldsg/resource";
import { resolveManifestResources } from "./resolve-manifest-resources";

interface Params {
  manifest: Manifest;
}

export const resolveManifest = (params: Params) => {
  const { manifest } = params;

  const { resources: manifestResources } = manifest;

  resolveManifestResources({
    manifestResources,
  });
};
