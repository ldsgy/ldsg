import { HandlerResource, HandlerResourceSettings } from "@ldsg/handler";
import { ResolveManifestResourcesParams } from "./types";

const HANDLER_KIND = "HANDLER";

interface Res {
  handlerResources: HandlerResource[];
}

type ResolveManifestResourcesOfTypeHandler = (
  params: ResolveManifestResourcesParams
) => Res;

export const resolveManifestResourcesOfTypeHandler: ResolveManifestResourcesOfTypeHandler =
  (params) => {
    const { manifestResources } = params;

    const handlerResourceDefinitionResource = manifestResources.find(
      (value) =>
        value.kind === "RESOURCE_DEFINITION" &&
        value.settings.kind === HANDLER_KIND
    );

    const handlerHandlerResource = manifestResources.find(
      (value) =>
        value.kind === "HANDLER" &&
        value.parentId === handlerResourceDefinitionResource?.id
    );

    const handlerHandlerResourceModuleId = (
      handlerHandlerResource?.settings as HandlerResourceSettings
    ).dependencies[0].name;

    const handlerHandlerResourceModule = require(handlerHandlerResourceModuleId);

    const { handler: handlerHandlerResourceModuleHandler } =
      handlerHandlerResourceModule;

    const manifestResourcesOfTypeHandler = manifestResources.filter(
      (value) => value.kind === "HANDLER"
    );

    const handlerResources = manifestResourcesOfTypeHandler.map(
      handlerHandlerResourceModuleHandler
    ) as HandlerResource[];

    const res = {
      handlerResources,
    };

    return res;
  };
