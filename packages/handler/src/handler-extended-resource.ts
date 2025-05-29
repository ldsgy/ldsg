import { HandlerExtendedResourceSettings } from "@ldsg/handler-part";
import { Resource } from "@ldsg/resource";
import { SpecificResourceSettings } from "@ldsg/types";
import { HandlerResource } from "./resource";

export class HandlerExtendedResource<
  T extends SpecificResourceSettings = SpecificResourceSettings
> extends Resource<HandlerExtendedResourceSettings<T>> {
  getHandler = () => {
    const { getHandlerOrUndefined } = this;

    const res = getHandlerOrUndefined();

    if (!res) {
      throw new Error("invalid handler");
    }

    return res;
  };

  getHandlerOrUndefined = () => {
    const { getResourcesFromSettings } = this;

    const { handlerResource } = getResourcesFromSettings();

    const res = (handlerResource as HandlerResource | undefined)?.getHandler();

    return res;
  };
}
