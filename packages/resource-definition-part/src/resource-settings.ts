import { ResourceSettings } from "@ldsg/types";
import { ResourceDefinitionSpecificResourceSettings } from "./specific-resource-settings";

export type ResourceDefinitionResourceSettings =
  ResourceSettings<ResourceDefinitionSpecificResourceSettings>;
