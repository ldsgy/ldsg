import { Handler, HandlerExtendedResourceSettings } from "@ldsg/handler";
import {
  InstantiateResourceParams,
  InstantiateResourceRes,
} from "@ldsg/resource";
import { instantiateResource } from "./instantiate-resource";
import { FormsResource } from "./resource";
import { FormsSpecificResourceSettings } from "./types";

export const handler: Handler<
  [
    InstantiateResourceParams<
      HandlerExtendedResourceSettings<FormsSpecificResourceSettings>
    >
  ],
  InstantiateResourceRes<FormsResource>
> = instantiateResource;
