import { Handler } from "@ldsg/handler";
import { Manifest } from "@ldsg/resource";
import { ResourceDefinitionResource } from "./resource";
import { ResourceDefinitionResourceSettings } from "./types";

export const handler: Handler<
  [Manifest.Resource<ResourceDefinitionResourceSettings>]
> = (params) => {
  return new ResourceDefinitionResource(params);
};
