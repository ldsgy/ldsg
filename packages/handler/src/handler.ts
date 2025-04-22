import {
  InstantiateResourceParams,
  InstantiateResourceRes,
} from "@ldsg/resource";
import { instantiateResource } from "./instantiate-resource";
import { HandlerResource } from "./resource";
import { Handler, HandlerResourceSettings } from "./types";

export const handler: Handler<
  [InstantiateResourceParams<HandlerResourceSettings>],
  InstantiateResourceRes<HandlerResource>
> = instantiateResource;
