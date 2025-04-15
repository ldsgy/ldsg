import {
  instantiateResources as instantiateResourceDefinitionResources,
  ResourceDefinitionResource,
} from "@ldsg/resource-definition";
import _ from "lodash";
import { ResolveManifestResourcesParams } from "./types";

type KindResourceMap = Record<string, ResourceDefinitionResource>;

interface Res {
  kindResourceMap: KindResourceMap;
}

export const resolveManifestResourcesOfTypeResourceDefinition = (
  params: ResolveManifestResourcesParams
) => {
  const { manifestResources } = params;

  const { resources: resourceDefinitionResources } =
    instantiateResourceDefinitionResources({
      manifestResources,
    });

  const kindResourceMap = _.keyBy(resourceDefinitionResources, "settings.kind");

  const res: Res = {
    kindResourceMap,
  };

  return res;
};
