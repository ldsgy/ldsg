import { HandlerResource } from "@ldsg/handler";
import _ from "lodash";
import { ResolveManifestResourcesParams } from "./types";

interface Params extends ResolveManifestResourcesParams {
  handlerResources: HandlerResource[];
}

export const resolveManifestResourcesOfTypeResourceDefinition = (
  params: Params
) => {
  const { manifestResources, handlerResources } = params;

  const manifestResourcesOfTypeResourceDefinition = manifestResources.filter(
    (value) => value.kind === "RESOURCE_DEFINITION"
  );

  console.debug(
    "manifestResourcesOfTypeResourceDefinition",
    manifestResourcesOfTypeResourceDefinition
  );

  const kindMap = _.keyBy(
    manifestResourcesOfTypeResourceDefinition,
    "settings.kind"
  );

  console.debug("kindMap", kindMap);

  const kindHandlerResourceMap: Record<string, HandlerResource | undefined> =
    _.mapValues(kindMap, (value) => {
      console.debug("kindHandlerResourceMap mapValues value", value);
      return handlerResources.find((handlerResource) => {
        const getParentIdRes = handlerResource.getParentId();

        console.debug(
          "kindHandlerResourceMap mapValues getParentIdRes",
          getParentIdRes
        );

        const res = getParentIdRes === value.id;

        return res;
      });
    });

  console.debug("kindHandlerResourceMap", kindHandlerResourceMap);
};
