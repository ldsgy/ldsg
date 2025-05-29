import { ExtendExpressApp } from "@ldsg/application";
import { HandlerExtendedResource } from "@ldsg/handler";
import { RouteSpecificResourceSettings } from "./types";

export class RouteResource extends HandlerExtendedResource<RouteSpecificResourceSettings> {
  extendExpressApp: ExtendExpressApp = async (params) => {
    const { app } = params;

    const {
      settings: { path },
      getExtendedHandler,
    } = this;

    const extendedHandler = getExtendedHandler();

    app.all(path, extendedHandler);
  };
}
