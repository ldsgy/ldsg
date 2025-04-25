import { HandlerExtendedResourceSettings } from "@ldsg/handler";
import { InstantiateResource } from "@ldsg/resource";
import { FieldTypeResource } from "./resource";
import { FieldTypeSpecificResourceSettings } from "./types";

export const instantiateResource: InstantiateResource<
  HandlerExtendedResourceSettings<FieldTypeSpecificResourceSettings>,
  FieldTypeResource
> = (params) => {
  const { resourceConstructorParams } = params;

  const resource = new FieldTypeResource(resourceConstructorParams);

  const res = {
    resource,
  };

  return res;
};
