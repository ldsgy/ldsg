import { ResourceRecord } from "@ldsg/resource";
import _ from "lodash";
import { instantiateResourceDefinitionResourceSubtrees } from "./instantiate-resource-definition-resource-subtrees";
import { ResourceKindMap } from "./types";

interface Params {
  resourceRecords: ResourceRecord[];
}

interface Res {
  resourceKindMap: ResourceKindMap;
}

export const getResourceKindMap = (params: Params) => {
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
