import { HandlerExtendedResourceSettings } from "@ldsg/handler-part";
import { Resource } from "@ldsg/resource";
import { SpecificResourceSettings } from "@ldsg/types";
import { HandlerResource } from "./resource";

export class HandlerExtendedResource<
  T extends SpecificResourceSettings = SpecificResourceSettings
> extends Resource<HandlerExtendedResourceSettings<T>> {
  getExtendedHandler = () => {
    const { getExtendedHandlerOrUndefined } = this;

    const res = getExtendedHandlerOrUndefined();

    if (!res) {
      throw new Error("invalid handler");
    }

    return res;
  };

  getExtendedHandlerOrUndefined = () => {
    const { getResourcesFromSettings } = this;

    const { handlerResource } = getResourcesFromSettings();

    const res = (handlerResource as HandlerResource | undefined)?.getHandler();

    return res;
  };
}
