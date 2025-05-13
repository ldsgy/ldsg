import { HandlerExtendedResourceSettings } from "@ldsg/handler";
import { InstantiateResource } from "@ldsg/resource";
import { WorkflowNodeTypeResource } from "./resource";
import { WorkflowNodeTypeSpecificResourceSettings } from "./types";

export const instantiateResource: InstantiateResource<
  HandlerExtendedResourceSettings<WorkflowNodeTypeSpecificResourceSettings>,
  WorkflowNodeTypeResource
> = (params) => {
  const { resourceConstructorParams } = params;

  const resource = new WorkflowNodeTypeResource(resourceConstructorParams);

  const res = {
    resource,
  };

  return res;
};
