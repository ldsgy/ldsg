import { HandlerExtendedResourceSettings } from "@ldsg/handler";
import { InstantiateResource } from "@ldsg/resource";
import { WorkflowNodeResource } from "./resource";
import { WorkflowNodeSpecificResourceSettings } from "./types";

export const instantiateResource: InstantiateResource<
  HandlerExtendedResourceSettings<WorkflowNodeSpecificResourceSettings>,
  WorkflowNodeResource
> = (params) => {
  const { resourceConstructorParams } = params;

  const resource = new WorkflowNodeResource(resourceConstructorParams);

  const res = {
    resource,
  };

  return res;
};
