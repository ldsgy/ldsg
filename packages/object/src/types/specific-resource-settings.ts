import { SpecificResourceSettings } from "@ldsg/types";

export interface ObjectSpecificResourceSettings
  extends SpecificResourceSettings {
  /**
   * Object Name
   */
  name: string;

  /**
   * Extended Resource IDs
   */
  extendedResourceIds?: string[];
}
