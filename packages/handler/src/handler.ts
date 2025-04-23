import { Handler, HandlerResourceSettings } from "@ldsg/handler-part";
import {
  InstantiateResourceParams,
  InstantiateResourceRes,
} from "@ldsg/resource";
import { instantiateResource } from "./instantiate-resource";
import { HandlerResource } from "./resource";

export const handler: Handler<
  [InstantiateResourceParams<HandlerResourceSettings>],
  InstantiateResourceRes<HandlerResource>
> = instantiateResource;
