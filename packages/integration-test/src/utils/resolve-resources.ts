import { resolveHandlerResources } from "./resolve-handler-resources";
import { resolveResourceDefinitionResources } from "./resolve-resource-definition-resources";
import { ResolveResourcesParams } from "./types";

export const resolveResources = (params: ResolveResourcesParams) => {
  const { resources } = params;

  resolveHandlerResources({
    resources,
  });

  resolveResourceDefinitionResources({
    resources,
  });
};
