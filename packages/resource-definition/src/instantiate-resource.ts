import { HandlerExtendedResourceSettings } from "@ldsg/handler";
import { InstantiateResource } from "@ldsg/resource";
import { ResourceDefinitionSpecificResourceSettings } from "@ldsg/resource-definition-part";
import { ResourceDefinitionResource } from "./resource";

export const instantiateResource: InstantiateResource<
  HandlerExtendedResourceSettings<ResourceDefinitionSpecificResourceSettings>,
  ResourceDefinitionResource
> = (params) => {
  const { resourceConstructorParams } = params;

  const resource = new ResourceDefinitionResource(resourceConstructorParams);

  const res = {
    resource,
  };

  return res;
};
