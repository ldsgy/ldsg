import { Handler, HandlerExtendedResourceSettings } from "@ldsg/handler";
import {
  InstantiateResourceParams,
  InstantiateResourceRes,
} from "@ldsg/resource";
import { instantiateResource } from "./instantiate-resource";
import { GraphqlResource } from "./resource";
import { GraphqlSpecificResourceSettings } from "./types";

export const handler: Handler<
  [
    InstantiateResourceParams<
      HandlerExtendedResourceSettings<GraphqlSpecificResourceSettings>
    >
  ],
  InstantiateResourceRes<GraphqlResource>
> = instantiateResource;
