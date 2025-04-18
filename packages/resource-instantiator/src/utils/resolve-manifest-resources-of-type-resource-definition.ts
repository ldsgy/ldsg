import {
  instantiateResources as instantiateResourceDefinitionResources,
  ResourceDefinitionResource,
} from "@ldsg/resource-definition";
import _ from "lodash";
import { ResolveManifestResourcesParams } from "./types";

type KindResourceDefinitionResourceMap = Record<
  string,
  ResourceDefinitionResource
>;

interface Res {
  kindResourceDefinitionResourceMap: KindResourceDefinitionResourceMap;
}

export const resolveManifestResourcesOfTypeResourceDefinition = (
  params: ResolveManifestResourcesParams
) => {
  const { manifestResources } = params;

  const { resources: resourceDefinitionResources } =
    instantiateResourceDefinitionResources({
      manifestResources,
    });

  const kindResourceDefinitionResourceMap = _.keyBy(
    resourceDefinitionResources,
    "settings.kind"
  );

  const res: Res = {
    kindResourceDefinitionResourceMap,
  };

  return res;
};
