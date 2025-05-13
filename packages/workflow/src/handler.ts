import { Handler, HandlerExtendedResourceSettings } from "@ldsg/handler";
import {
  InstantiateResourceParams,
  InstantiateResourceRes,
} from "@ldsg/resource";
import { instantiateResource } from "./instantiate-resource";
import { WorkflowNodeTypeResource } from "./resource";
import { WorkflowNodeTypeSpecificResourceSettings } from "./types";

export const handler: Handler<
  [
    InstantiateResourceParams<
      HandlerExtendedResourceSettings<WorkflowNodeTypeSpecificResourceSettings>
    >
  ],
  InstantiateResourceRes<WorkflowNodeTypeResource>
> = instantiateResource;
