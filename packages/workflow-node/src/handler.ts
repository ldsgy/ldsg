import { Handler, HandlerExtendedResourceSettings } from "@ldsg/handler";
import {
  InstantiateResourceParams,
  InstantiateResourceRes,
} from "@ldsg/resource";
import { instantiateResource } from "./instantiate-resource";
import { WorkflowNodeResource } from "./resource";
import { WorkflowNodeSpecificResourceSettings } from "./types";

export const handler: Handler<
  [
    InstantiateResourceParams<
      HandlerExtendedResourceSettings<WorkflowNodeSpecificResourceSettings>
    >
  ],
  InstantiateResourceRes<WorkflowNodeResource>
> = instantiateResource;
