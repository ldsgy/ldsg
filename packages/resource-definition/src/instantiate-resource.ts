import {
  InstantiateResource,
  ResourceDefinitionResourceSettings,
} from "@ldsg/resource";
import { ResourceDefinitionResource } from "./resource";

export const instantiateResource: InstantiateResource<
  ResourceDefinitionResourceSettings,
  ResourceDefinitionResource
> = (params) => {
  const { resourceConstructorParams } = params;

  const resource = new ResourceDefinitionResource(resourceConstructorParams);

  const res = {
    resource,
  };

  return res;
};
