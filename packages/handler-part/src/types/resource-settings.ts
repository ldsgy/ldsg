import { ResourceSettings } from "@ldsg/types";
import { HandlerSpecificResourceSettings } from "./specific-resource-settings";

export type HandlerResourceSettings =
  ResourceSettings<HandlerSpecificResourceSettings>;
