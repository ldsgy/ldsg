import { Handler } from "@ldsg/handler";
import {
  InstantiateResourceParams,
  InstantiateResourceRes,
} from "@ldsg/resource";
import { instantiateResource } from "./instantiate-resource";
import { DatabaseResource } from "./resource";
import { DatabaseSpecificResourceSettings } from "./types";

export const handler: Handler<
  [InstantiateResourceParams<DatabaseSpecificResourceSettings>],
  InstantiateResourceRes<DatabaseResource>
> = instantiateResource;
