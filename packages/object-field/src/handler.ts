import { Handler, HandlerExtendedResourceSettings } from "@ldsg/handler";
import {
  InstantiateResourceParams,
  InstantiateResourceRes,
} from "@ldsg/resource";
import { instantiateResource } from "./instantiate-resource";
import { ObjectFieldResource } from "./resource";
import { ObjectFieldSpecificResourceSettings } from "./types";

export const handler: Handler<
  [
    InstantiateResourceParams<
      HandlerExtendedResourceSettings<ObjectFieldSpecificResourceSettings>
    >
  ],
  InstantiateResourceRes<ObjectFieldResource>
> = instantiateResource;
