import { Handler, HandlerExtendedResourceSettings } from "@ldsg/handler";
import {
  InstantiateResourceParams,
  InstantiateResourceRes,
} from "@ldsg/resource";
import { instantiateResource } from "./instantiate-resource";
import { ObjectResource } from "./resource";
import { ObjectSpecificResourceSettings } from "./types";

export const handler: Handler<
  [
    InstantiateResourceParams<
      HandlerExtendedResourceSettings<ObjectSpecificResourceSettings>
    >
  ],
  InstantiateResourceRes<ObjectResource>
> = instantiateResource;
