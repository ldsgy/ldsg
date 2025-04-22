import { Handler } from "@ldsg/handler";
import {
  InstantiateResourceParams,
  InstantiateResourceRes,
} from "@ldsg/resource";
import { ResourceDefinitionSpecificResourceSettings } from "@ldsg/resource-definition-part";
import { instantiateResource } from "./instantiate-resource";
import { ResourceDefinitionResource } from "./resource";

export const handler: Handler<
  [InstantiateResourceParams<ResourceDefinitionSpecificResourceSettings>],
  InstantiateResourceRes<ResourceDefinitionResource>
> = instantiateResource;
