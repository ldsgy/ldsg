import { Handler } from "@ldsg/handler";
import {
  InstantiateResourceParams,
  InstantiateResourceRes,
} from "@ldsg/resource";
import { instantiateResource } from "./instantiate-resource";
import { ApplicationResource } from "./resource";
import { ApplicationResourceSettings } from "./types";

export const handler: Handler<
  [InstantiateResourceParams<ApplicationResourceSettings>],
  InstantiateResourceRes<ApplicationResource>
> = instantiateResource;
