import { Handler } from "@ldsg/handler";
import {
  InstantiateResourceParams,
  InstantiateResourceRes,
} from "@ldsg/resource";
import { instantiateResource } from "./instantiate-resource";
import { ApplicationResource } from "./resource";
import { ApplicationSpecificResourceSettings } from "./types";

export const handler: Handler<
  [InstantiateResourceParams<ApplicationSpecificResourceSettings>],
  InstantiateResourceRes<ApplicationResource>
> = instantiateResource;
