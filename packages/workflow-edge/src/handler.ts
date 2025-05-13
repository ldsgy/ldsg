import { Handler, HandlerExtendedResourceSettings } from "@ldsg/handler";
import {
  InstantiateResourceParams,
  InstantiateResourceRes,
} from "@ldsg/resource";
import { instantiateResource } from "./instantiate-resource";
import { WorkflowEdgeResource } from "./resource";
import { WorkflowEdgeSpecificResourceSettings } from "./types";

export const handler: Handler<
  [
    InstantiateResourceParams<
      HandlerExtendedResourceSettings<WorkflowEdgeSpecificResourceSettings>
    >
  ],
  InstantiateResourceRes<WorkflowEdgeResource>
> = instantiateResource;
