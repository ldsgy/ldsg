import { HandlerExtendedResourceSettings } from "@ldsg/handler";
import { InstantiateResource } from "@ldsg/resource";
import { WorkflowResource } from "./resource";
import { WorkflowSpecificResourceSettings } from "./types";

export const instantiateResource: InstantiateResource<
  HandlerExtendedResourceSettings<WorkflowSpecificResourceSettings>,
  WorkflowResource
> = (params) => {
  const { resourceConstructorParams } = params;

  const resource = new WorkflowResource(resourceConstructorParams);

  const res = {
    resource,
  };

  return res;
};
