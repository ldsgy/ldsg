import { Handler, HandlerExtendedResourceSettings } from "@ldsg/handler";
import {
  InstantiateResourceParams,
  InstantiateResourceRes,
} from "@ldsg/resource";
import { instantiateResource } from "./instantiate-resource";
import { FieldTypeResource } from "./resource";
import { FieldTypeSpecificResourceSettings } from "./types";

export const handler: Handler<
  [
    InstantiateResourceParams<
      HandlerExtendedResourceSettings<FieldTypeSpecificResourceSettings>
    >
  ],
  InstantiateResourceRes<FieldTypeResource>
> = instantiateResource;
