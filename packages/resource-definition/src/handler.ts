import { Handler } from "@ldsg/handler";
import { Manifest, ResourceDefinitionResourceSettings } from "@ldsg/resource";
import { ResourceDefinitionResource } from "./resource";

export const handler: Handler<
  [Manifest.Resource<ResourceDefinitionResourceSettings>]
> = (params) => {
  return new ResourceDefinitionResource(params);
};
