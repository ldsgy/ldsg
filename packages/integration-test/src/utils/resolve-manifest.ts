import { Manifest } from "@ldsg/resource";
import { resolveResources } from "./resolve-resources";

interface Params {
  manifest: Manifest;
}

export const resolveManifest = (params: Params) => {
  const { manifest } = params;

  const { resources } = manifest;

  resolveResources({
    resources,
  });
};
