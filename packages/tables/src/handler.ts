import { Handler, HandlerExtendedResourceSettings } from "@ldsg/handler";
import {
  InstantiateResourceParams,
  InstantiateResourceRes,
} from "@ldsg/resource";
import { instantiateResource } from "./instantiate-resource";
import { TablesResource } from "./resource";
import { TablesSpecificResourceSettings } from "./types";

export const handler: Handler<
  [
    InstantiateResourceParams<
      HandlerExtendedResourceSettings<TablesSpecificResourceSettings>
    >
  ],
  InstantiateResourceRes<TablesResource>
> = instantiateResource;
