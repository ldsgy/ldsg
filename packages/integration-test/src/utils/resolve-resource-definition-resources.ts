import { ResolveResourcesParams } from "./types";

export const resolveResourceDefinitionResources = (
  params: ResolveResourcesParams
) => {
  const { resources } = params;

  const resourceDefinitionResources = resources.filter(
    (value) => value.kind === "RESOURCE_DEFINITION"
  );
};
