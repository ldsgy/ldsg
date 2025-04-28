import { SpecificResourceSettings } from "@ldsg/types";

export interface ObjectFieldSpecificResourceSettings
  extends SpecificResourceSettings {
  /**
   * Field Name
   */
  name: string;

  /**
   * Field Type Resource ID
   */
  fieldTypeResourceId: string;

  /**
   * Field Properties
   */
  properties: any;
}
