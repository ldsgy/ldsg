import { HandlerExtendedResourceSettings } from "@ldsg/handler-part";
import { Resource } from "@ldsg/resource";
import { SpecificResourceSettings } from "@ldsg/types";
import { HandlerResource } from "./resource";

export class HandlerExtendedResource<
  T extends SpecificResourceSettings = SpecificResourceSettings
> extends Resource<HandlerExtendedResourceSettings<T>> {
  getHandler = () => {
    const { settings, getFilteredResource } = this;

    const { handlerResourceId } = settings;

    const handlerResource = getFilteredResource({
      id: handlerResourceId,
    }) as HandlerResource | undefined;

    if (!handlerResource) {
      throw new Error("invalid handler resource");
    }

    const res = handlerResource.getHandler();

    return res;
  };
}
