import { resolveManifestResourcesOfTypeHandler } from "./resolve-manifest-resources-of-type-handler";
import { resolveManifestResourcesOfTypeResourceDefinition } from "./resolve-manifest-resources-of-type-resource-definition";
import { ResolveManifestResourcesParams } from "./types";

export const resolveManifestResources = (
  params: ResolveManifestResourcesParams
) => {
  const { manifestResources } = params;

  const { handlerResources } = resolveManifestResourcesOfTypeHandler({
    manifestResources,
  });

  resolveManifestResourcesOfTypeResourceDefinition({
    handlerResources,
    manifestResources,
  });
};
