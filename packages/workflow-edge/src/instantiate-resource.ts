import { HandlerExtendedResourceSettings } from "@ldsg/handler";
import { InstantiateResource } from "@ldsg/resource";
import { WorkflowEdgeResource } from "./resource";
import { WorkflowEdgeSpecificResourceSettings } from "./types";

export const instantiateResource: InstantiateResource<
  HandlerExtendedResourceSettings<WorkflowEdgeSpecificResourceSettings>,
  WorkflowEdgeResource
> = (params) => {
  const { resourceConstructorParams } = params;

  const resource = new WorkflowEdgeResource(resourceConstructorParams);

  const res = {
    resource,
  };

  return res;
};
