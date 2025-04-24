import { SpecificResourceSettings } from "@ldsg/types";

export interface RouteSpecificResourceSettings
  extends SpecificResourceSettings {
  /**
   * Route Path
   */
  path: string;
}
