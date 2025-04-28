import { HandlerExtendedResourceSettings } from "@ldsg/handler-part";
import { Resource } from "@ldsg/resource";
import { SpecificResourceSettings } from "@ldsg/types";
import { HandlerResource } from "./resource";

export class HandlerExtendedResource<
  T extends SpecificResourceSettings = SpecificResourceSettings
> extends Resource<HandlerExtendedResourceSettings<T>> {
  getHandler = () => {
    const { getResourcesFromSettings } = this;

    const { handlerResource } = getResourcesFromSettings();

    if (!handlerResource) {
      throw new Error("invalid handler resource");
    }

    const res = (handlerResource as HandlerResource).getHandler();

    return res;
  };
}
