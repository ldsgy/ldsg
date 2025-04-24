import { Handler, HandlerExtendedResourceSettings } from "@ldsg/handler";
import {
  InstantiateResourceParams,
  InstantiateResourceRes,
} from "@ldsg/resource";
import { instantiateResource } from "./instantiate-resource";
import { RouteResource } from "./resource";
import { RouteSpecificResourceSettings } from "./types";

export const handler: Handler<
  [
    InstantiateResourceParams<
      HandlerExtendedResourceSettings<RouteSpecificResourceSettings>
    >
  ],
  InstantiateResourceRes<RouteResource>
> = instantiateResource;
