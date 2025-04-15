import { Handler } from "@ldsg/handler";
import {
  InstantiateResourceParams,
  InstantiateResourceRes,
  ResourceDefinitionResourceSettings,
} from "@ldsg/resource";
import { instantiateResource } from "./instantiate-resource";
import { ResourceDefinitionResource } from "./resource";

export const handler: Handler<
  [InstantiateResourceParams<ResourceDefinitionResourceSettings>],
  InstantiateResourceRes<ResourceDefinitionResource>
> = instantiateResource;
