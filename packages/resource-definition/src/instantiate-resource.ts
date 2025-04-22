import { InstantiateResource } from "@ldsg/resource";
import { ResourceDefinitionSpecificResourceSettings } from "@ldsg/resource-definition-part";
import { ResourceDefinitionResource } from "./resource";

export const instantiateResource: InstantiateResource<
  ResourceDefinitionSpecificResourceSettings,
  ResourceDefinitionResource
> = (params) => {
  const { resourceConstructorParams } = params;

  const resource = new ResourceDefinitionResource(resourceConstructorParams);

  const res = {
    resource,
  };

  return res;
};
