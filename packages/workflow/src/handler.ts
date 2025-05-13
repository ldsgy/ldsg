import { Handler, HandlerExtendedResourceSettings } from "@ldsg/handler";
import {
  InstantiateResourceParams,
  InstantiateResourceRes,
} from "@ldsg/resource";
import { instantiateResource } from "./instantiate-resource";
import { WorkflowResource } from "./resource";
import { WorkflowSpecificResourceSettings } from "./types";

export const handler: Handler<
  [
    InstantiateResourceParams<
      HandlerExtendedResourceSettings<WorkflowSpecificResourceSettings>
    >
  ],
  InstantiateResourceRes<WorkflowResource>
> = instantiateResource;
