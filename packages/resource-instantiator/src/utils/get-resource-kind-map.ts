import { ResourceRecord } from "@ldsg/types";
import _ from "lodash";
import { instantiateResourceDefinitionResourcesWithSubHandlerResources } from "./instantiate-resource-definition-resources-with-sub-handler-resources";
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
    instantiateResourceDefinitionResourcesWithSubHandlerResources({
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
