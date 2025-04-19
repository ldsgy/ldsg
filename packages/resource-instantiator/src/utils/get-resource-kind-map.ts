import { ResourceDefinitionResource } from "@ldsg/resource-definition";
import _ from "lodash";
import { instantiateResourceDefinitionResourceSubtrees } from "./instantiate-resource-definition-resource-subtrees";
import { ResolveManifestResourcesParams } from "./types";

interface ResourceKindMapValue {
  resourceDefinitionResource: ResourceDefinitionResource;
}

type ResourceKindMap = Record<string, ResourceKindMapValue>;

interface Res {
  resourceKindMap: ResourceKindMap;
}

export const getResourceKindMap = (params: ResolveManifestResourcesParams) => {
  const { resourceRecords } = params;

  const { resources: resourceDefinitionResources } =
    instantiateResourceDefinitionResourceSubtrees({
      resourceRecords,
    });

  const resourceKindMap = _.mapValues(
    _.keyBy(resourceDefinitionResources, "settings.kind"),
    (resourceDefinitionResource) => {
      const res = { resourceDefinitionResource };

      return res;
    }
  );

  const res: Res = {
    resourceKindMap,
  };

  return res;
};
