import { SpecificResourceSettings } from "@ldsg/types";

export interface DatabaseSpecificResourceSettings
  extends SpecificResourceSettings {
  /**
   * Database Name
   */
  name?: string;
}
