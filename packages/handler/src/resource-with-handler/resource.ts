import { Resource } from "@ldsg/resource";
import { SpecificResourceSettings } from "@ldsg/types";
import { HandlerResource } from "../resource";
import { ResourceWithHandlerSpecificResourceSettings } from "./resource-settings";

export class ResourceWithHandler<
  T extends SpecificResourceSettings = SpecificResourceSettings
> extends Resource<ResourceWithHandlerSpecificResourceSettings<T>> {
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
